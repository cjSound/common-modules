<!--
 * @Author: 曹捷
 * @Date: 2020-04-27 18:44:59
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-18 15:35:08
 * @Description: 封装select组件  支持同时获取value和name
 -->
<template>
  <el-select :clearable="clearable" :disabled="disabled" :multiple="multiple" :remote="remote"
    :remote-method="remoteMethod" :placeholder="placeholder" @change="changeValue" class="input-md" filterable
    v-model="dictValue" @focus="focus">
    <el-option :key="item.valueName" :label="item[labelName]" :value="item[valueName]" v-for="item in selectList">
    </el-option>
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
    remote: {
      type: Boolean,
      default: false
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
    valueType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dictValue: '',
      dictValueList: [],
    }
  },
  watch: {
    value () {
      this.typeToValue()
    },
  },
  methods: {
    focus (value) {
      this.$emit('focus', value)
    },
    remoteMethod (text) {
      this.$emit('remoteMethod', text)
    },
    typeToValue () {
      let value = this.value === null || this.value === undefined ? '' : this.value
      if (this.valueType === 'Int') {
        value = parseInt(value)
      }
      this.dictValue = value
    },
    changeValue (value) {
      // 初始化还么有selectList ，如果赋值selectName，会导致找不到而被置空
      if (this.selectList && this.selectList.length > 0) {
        let obj = this.selectList.find((item) => {
          return item[this.valueName] === value
        })
        this.$emit('update:selectName', obj ? obj[this.labelName] : '')
        this.$emit('changeInfo', obj)
      }
      this.$emit('input', value)
      this.$emit('change', value)
    },
  },
  mounted () {
    if (this.value) {
      this.changeValue(this.value)
      this.typeToValue()
    }
  },
}
</script>

<style>
</style>