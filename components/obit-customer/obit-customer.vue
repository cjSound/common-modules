<!--
 * @Author: 曹捷
 * @Date: 2020-04-20 14:53:21
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-04 16:25:45
 * @Description: 客户
 -->
<template>
  <el-select @change="choiceCus" filterable placeholder="请选择客户" v-model="cValue">
    <el-option :key="item.customerId" :label="item.customerName" :value="item.customerId" v-for="item in custList"></el-option>
  </el-select>
</template>
 
<script>
export default {
  props: {
    value: {
      type: [Number, String]
    }
  },
  data() {
    return {
      cValue: this.value,
      custList: []
    }
  },
  watch: {
    value() {
      this.cValue = this.value
    }
  },
  methods: {
    choiceCus(item) {
      this.$emit('input', item)
    },
    initList() {
      this.$http.getAllCustomer().then(res => {
        this.custList = res
      })
    }
  },
  mounted() {
    this.initList()
  }
}
</script>
 
<style>
</style>
