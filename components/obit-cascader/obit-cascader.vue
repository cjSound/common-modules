<!--
 * @Author: 曹捷
 * @Date: 2020-04-14 16:28:00
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-04-23 13:00:09
 * @Description: 改造cascader modal  是数组，实际使用是最后一级
 -->
<template>
  <el-cascader
    :disabled="disabled"
    :options="options"
    :placeholder="placeholder"
    :props="pData"
    :show-all-levels="false"
    @change="cascChange"
    v-if="loading"
    v-model="cascValue"
  ></el-cascader>
</template>

<script>
import { Cascader } from 'element-ui'
import util from '@/common-modules/utils/utils'

export default {
  components: {
    ElCascader: Cascader
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 数据tree
    options: {
      type: Array,
      default: []
    },
    // 子集字段名
    children: {
      type: String,
      default: 'children'
    },
    // value 值字段名
    valueName: {
      type: String,
      default: 'value'
    },
    // 展示字段名
    label: {
      type: String,
      default: 'label'
    },
    // 上级id 字段名
    parentId: {
      type: String,
      default: 'parentId'
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (!oldValue && newValue) {
        this.getParentIdList(newValue)
      }
    },
    options() {
      this.initCasList()
    }
  },
  data() {
    return {
      cascValue: [],
      casList: [],
      loading: false,
      pData: { expandTrigger: 'hover', checkStrictly: true }
    }
  },
  mounted() {
    this.pData.value = this.valueName
    this.pData.label = this.label
    this.pData.children = this.children
    this.loading = true
    this.initCasList()
    this.$set(this, 'cascValue', this.getParentIdList(this.value))
  },
  methods: {
    cascChange(param) {
      let value = param.slice(-1)[0]
      this.$emit('input', value)
    },
    // 将tree数据转为1维数组
    initCasList() {
      let arr = util.util.cloneObj(this.options)

      let list = [].concat(arr)
      let childrenName = this.children
      function getCasList(arr) {
        arr.forEach(element => {
          if (element[childrenName] && element[childrenName].length > 0) {
            list = list.concat(element[childrenName])
            getCasList(element[childrenName])
          }
        })
      }
      getCasList(arr)
      list.forEach(element => {
        element[this.children] = []
      })
      this.casList = list
    },
    // 在1维数组里面 遍历找上级id
    getParentIdList(value) {
      let list = [`${value}`]
      let _this = this
      function getParentId(value) {
        for (let i = 0; i < _this.casList.length; i++) {
          let item = _this.casList[i]

          if (item[_this.valueName] == value) {
            list.unshift(`${item[_this.parentId]}`)
            getParentId(item[_this.parentId])
          }
        }
      }
      getParentId(value)
      if (list[0] === '0' || list[0] === null || list[0] === 'null') {
        list.shift()
      }

      return list
    }
  }
}
</script>

<style>
</style>