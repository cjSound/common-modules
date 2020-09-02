<!--
 * @Author: 曹捷
 * @Date: 2020-04-27 18:44:59
 * @LastEditors: 刘硕
 * @LastEditTime: 2020-08-17 20:21:03
 * @Description: 封装select组件  支持同时获取value和name
 -->
<template>
  <el-select :clearable="clearable" :disabled="disabled" :multiple="multiple" :placeholder="placeholder" @change="changeValue" class="input-md" filterable v-model="dictValue">
    <el-option :key="item.valueName" :label="item[labelName]" :value="item[valueName]" v-for="item in selectList"></el-option>
  </el-select>
</template>

<script>
import { Select, Option } from 'element-ui'

export default {
  components: {
    ElSelect: Select,
    ElOption: Option,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Number, String, Array],
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    labelName: {
      type: String,
      default: 'label',
    },
    valueName: {
      type: String,
      default: 'id',
    },
    selectList: {
      type: Array,
    },
    selectName: {
      type: String,
    },
  },
  data() {
    return {
      dictValue: this.value === null || this.value === undefined ? '' : this.value,
      dictValueList: [],
    }
  },
  watch: {
    value() {
      this.dictValue = this.value === null || this.value === undefined ? '' : this.value
      console.log(`dictValue:${this.valueName}`, this.dictValue)
    },
  },
  methods: {
    changeValue(value) {
      this.$emit('input', value)
      this.$emit('change', value)
      let obj = this.selectList.find((item) => {
        return item[this.valueName] === value
      })
      this.$emit('update:selectName', obj ? obj[this.labelName] : '')
    },
  },
  mounted() {
    if (this.value) {
      console.log(`dictValue:${this.valueName}`, this.dictValue)
      this.changeValue(this.value)
    }
  },
}
</script>

<style>
</style>