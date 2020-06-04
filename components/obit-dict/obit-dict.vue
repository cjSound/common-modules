<!--
 * @Author: 曹捷
 * @Date: 2019-08-22 15:24:21
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-04 11:05:43
 * @Description: 字典组件
 -->
<template>
  <el-select
    :clearable="clearable"
    :disabled="disabled"
    :multiple="multiple"
    :placeholder="placeholder"
    @change="changeDict"
    class="input-md"
    v-if="dictValueList.length>0"
    v-model="dictValue"
  >
    <el-option :key="item.codeValue" :label="item[labelName]" :value="item[valueName]" v-for="item in dictValueList"></el-option>
  </el-select>
</template>

<script>
import ajax from './../../api'
import { Select, Option } from 'element-ui'

export default {
  components: {
    ElSelect: Select,
    ElOption: Option
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String]
    },
    dictCode: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    labelName: {
      type: String,
      default: 'valueDesc'
    },
    valueName: {
      type: String,
      default: 'codeValue'
    }
  },
  data() {
    return {
      dictValue:
        this.value === null || this.value === undefined ? '' : this.value + '',
      dictValueList: []
    }
  },
  watch: {
    value() {
      this.dictValue =
        this.value === null || this.value === undefined ? '' : this.value + ''
    },
    dictCode() {
      this.initData()
    }
  },
  methods: {
    initData() {
      let param = { codeField: this.dictCode }
      ajax.methods.getCommonDictValueList(param).then(res => {
        this.dictValueList = res
      })
    },
    changeDict(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style>
</style>