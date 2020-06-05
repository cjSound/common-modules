<!--
 * @Author: 曹捷
 * @Date: 2019-08-19 19:49:53
 * @LastEditors: 徐生延
 * @LastEditTime: 2020-06-05 15:58:13
 * @Description: 地区 多级联动
 -->
<template>
  <el-cascader
    :options="dictList"
    :placeholder="placeholder"
    :props="cityProps"
    :show-all-levels="false"
    @change="handleChange"
    clearable
    v-model="cValue"
  ></el-cascader>
</template>

<script>
import { Cascader } from 'element-ui'
import ajax from './../../api'
// console.log('ajax', ajax)
export default {
  components: {
    ElCascader: Cascader
  },
  name: 'cascader',
  props: {
    value: {
      type: [Number, String, Array],
      default: '0'
    },
    type: {
      type: String,
      default: 'value'
    },
    levelValue: {
      type: Number,
      default: 3
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  watch: {
    value(newValue) {
      if (newValue && !this.plugChange) {
        // this.initSetValue(newValue)
      }
      if (!newValue) {
        this.cValue = []
      }
      this.plugChange = false
    }
  },
  data() {
    let vm = this
    return {
      dictList: [],
      plugChange: false,
      cValue: [],
      cityProps: {
        // expandTrigger: 'hover',
        value: 'id',
        label: 'name',
        lazy: true,
        async lazyLoad(node, resolve) {
          const { level } = node
          let id = level === 0 ? 0 : node.data.id
          // 规避不能正常回显的bug

          if (!vm.cValue.length && vm.value && vm.value.length) {
            await vm.initSetValue(vm.value)
          }
          if(level > vm.levelValue) return;
          ajax.methods.getCommonDictByParentId({ dictId: id }).then(res => {
            if (level === vm.levelValue) {
              res.forEach(element => {
                element.leaf = true
              })
            }
            resolve(res)
          })
        }
      }
    }
  },
  methods: {
    handleChange(values) {
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
      console.log(value);
      this.$emit('input', value)
      this.$emit('change', value)
    },
    initSetValue(newValue) {
      return new Promise(resolve => {
        ajax.methods.getCommonDictParents({ dictId: newValue }).then(res => {
          //   this.$set(this, 'dictList', res.list)
          this.$set(this, 'cValue', res.ids)
          resolve()
        })
      })
    }
  }
}
</script>

<style>
</style>
