<!--
 * @Author: 曹捷
 * @Date: 2020-06-22 20:37:04
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-22 21:52:09
 * @Description: 自定义查询条件 接口下拉列表
--> 
<template>
  <obitSelect
    :clearable="false"
    :labelName="itemInfo.labelname"
    :selectList="selectList"
    :valueName="itemInfo.valuename"
    @change="changeValue"
    placeholder="请选择对应值"
    v-model="cValue"
  ></obitSelect>
</template>

<script>
import obitSelect from './../obit-select/obit-select'
export default {
  props: {
    value: {
      type: [Number, String]
    },
    itemInfo: {
      type: Object
    }
  },
  data() {
    return {
      cValue: this.value,
      selectList: []
    }
  },
  watch: {
    value() {
      this.cValue =
        this.value === null || this.value === undefined ? '' : this.value
    }
  },
  components: { obitSelect },
  methods: {
    changeValue(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },
    initData() {
      this.$http.getDataByUrl(this.itemInfo.ajaxurl).then(res => {
        this.selectList = res
      })
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style>
</style>