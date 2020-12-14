<!--
 * @Author: 曹捷
 * @Date: 2019-08-19 19:49:53
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-14 16:31:24
 * @Description: 地区 多级联动
 -->
<template>
  <el-cascader :options="dictList" :placeholder="placeholder" :props="cityProps" :show-all-levels="false"
    @change="handleChange" clearable v-model="cValue" v-if="opened"></el-cascader>
</template>

<script>
import { Cascader } from 'element-ui'
import ajax from './../../api'
// console.log('ajax', ajax)
export default {
  components: {
    ElCascader: Cascader,
  },
  name: 'cascader',
  props: {
    value: {
      type: [Number, String, Array],
      default: '0',
    },
    type: {
      type: String,
      default: 'value',
    },
    levelValue: {
      type: Number,
      default: 3,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    // 是否可以选择任意一级
    checkAll: {
      type: Boolean,
      default: false,
    },
  },
  mounted () {
    this.cityProps.checkStrictly = this.checkAll
  },
  watch: {
    value (newValue, oldValue) {
      // console.log('value -> newValue', oldValue, newValue, this.plugChange)
      if (!oldValue && newValue && !this.plugChange) {
        this.opened = false
        this.$nextTick(() => {
          this.opened = true
        })
      }
      if (!newValue) {
        this.cValue = []
      }
      this.plugChange = false
    },
  },
  data () {
    let vm = this
    return {
      dictList: [],
      plugChange: false,
      // 组件只有在初始化的时候才加载  lazyLoad，在初始化给value赋值，重新渲染  Cascader组件 调用lazyLoad
      opened: true,
      cValue: [],
      cityProps: {
        // expandTrigger: 'hover',
        value: 'id',
        label: 'name',
        lazy: true,
        checkStrictly: false,
        async lazyLoad (node, resolve) {
          const { level } = node
          let id = level === 0 ? 0 : node.data.id
          // 规避不能正常回显的bug
          // console.log('🚀lazyLoad999', vm.cValue, vm.value)

          if (!vm.cValue.length && vm.value && vm.value.length) {
            await vm.initSetValue(vm.value)
          }
          if (level >= vm.levelValue) {
            resolve([])
            return
          }
          ajax.methods.getCommonDictByParentId({ dictId: id }).then((res) => {
            if (level === vm.levelValue - 1) {
              res.forEach((element) => {
                element.leaf = true
              })
            }
            resolve(res)
          })
        },
      },
    }
  },
  methods: {
    handleChange (values) {
      this.plugChange = true
      let value
      if (this.type === 'value') {
        if (values.length > 0) {
          value = values.slice(-1)[0]
        } else {
          value = ''
        }
      } else {
        value = values
      }
      this.$emit('input', value)
      this.$emit('change', value)
    },
    initSetValue (newValue) {
      // console.log('🚀 ~ file: obit-city.vue ~ line 118 ~ initSetValue ~ newValue', newValue)
      return new Promise((resolve) => {
        ajax.methods.getCommonDictParents({ dictId: newValue }).then((res) => {
          //   this.$set(this, 'dictList', res.list)
          this.$set(this, 'cValue', res.ids)
          resolve()
        })
      })
    },
  },
}
</script>

<style>
</style>
