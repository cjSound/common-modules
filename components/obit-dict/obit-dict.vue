<!--
 * @Author: 曹捷
 * @Date: 2019-08-22 15:24:21
 * @LastEditors: 刘硕
 * @LastEditTime: 2020-06-29 11:15:39
 * @Description: 字典组件
 -->
<template>
  <el-select
    :clearable="clearable"
    :disabled="disabled"
    :multiple="multiple"
    :placeholder="placeholder"
    class="input-md"
    v-if="type==='select'"
    v-model="dictValue"
  >
    <el-option :key="item[valueName]" :label="item[labelName]" :value="item[valueName]" v-for="item in dictValueList"></el-option>
  </el-select>
  <el-radio-group :disabled="disabled" @change="changeDict" v-else-if="type==='radio'" v-model="dictValue">
    <el-radio :key="item[valueName]" :label="item[valueName]" v-for="item in dictValueList">{{item[labelName]}}</el-radio>
  </el-radio-group>
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
    // 是否可以多选
    multiple: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String, Array]
    },
    // 字典编码
    dictCode: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 展示名称key
    labelName: {
      type: String,
      default: 'valueDesc'
    },
    // 数据保存对应的key名称
    valueName: {
      type: String,
      default: 'codeValue'
    },
    // 字典展示方式   select  radio
    type: {
      type: String,
      default: 'select'
    }
  },
  data() {
    return {
      dictValue: '',
      dictValueList: []
    }
  },
  watch: {
    value() {
      this.initValue()
    },
    dictCode() {
      this.initData()
    },
    dictValue(value, oldvalue) {
      this.changeDict(value)
    }
  },
  methods: {
    initValue() {
      if (this.value === null || this.value === undefined) {
        this.dictValue = this.multiple ? [] : ''
      } else {
        if (this.value instanceof Array) {
          let arr = []
          this.value.forEach(element => {
            arr.push(element + '')
          })
          this.dictValue = arr
        } else {
          this.dictValue = this.value + ''
        }
      }
    },
    initData() {
      let param = { codeField: this.dictCode }
      ajax.methods.getCommonDictValueList(param).then(res => {
        this.dictValueList = res
        this.initValue()
      })
    },
    changeDict(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  },
  mounted() {
    // this.initValue()
    this.initData()
  }
}
</script>

<style>
</style>