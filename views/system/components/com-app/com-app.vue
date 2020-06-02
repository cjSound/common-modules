<!--
 * @Author: 曹捷
 * @Date: 2020-04-22 18:29:31
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-04-23 09:18:15
 * @Description: 获取所有的APP下拉选择
 -->
<template>
  <el-select class="input-md" clearable filterable placeholder="请选择应用" v-model="appId">
    <el-option :key="item.id" :label="item.appName" :value="item.id" v-for="item in appList"></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (!oldValue && newValue) {
        this.appId = newValue
      }
    },
    appId(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  },
  data() {
    return {
      appId: '',
      appList: []
    }
  },
  methods: {
    getappList() {
      this.$http.getAllApp().then(res => {
        this.appList = res
        // if (!this.appId) {
        //   this.appId = this.appList[0].id
        // }
      })
    }
  },
  mounted() {
    this.appId = this.value
    this.getappList()
  }
}
</script>

<style>
</style>