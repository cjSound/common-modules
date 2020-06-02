<!--
 * @Author: 曹捷
 * @Date: 2020-04-16 15:05:48
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-04-16 16:20:00
 * @Description: 机构 组件
 -->
<template>
  <obit-cascader
    :disabled="disabled"
    :options="orgList"
    :props="{ expandTrigger: 'hover' }"
    :show-all-levels="false"
    v-if="orgList.length>0"
    v-model="orgId"
  ></obit-cascader>
</template>

<script>
import ajax from './../../api'
import obitCascader from './../obit-cascader/obit-cascader'
export default {
  components: { obitCascader },
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
        this.orgId = newValue
      }
    },
    orgId(value) {
      this.$emit('input', value)
    }
  },
  data() {
    return {
      orgId: '',
      orgList: []
    }
  },
  methods: {
    getOrgList() {
      ajax.methods.getAllOrgTree().then(res => {
        this.orgList = res
      })
    }
  },
  mounted() {
    this.orgId = this.value
    this.getOrgList()
  }
}
</script>

<style>
</style>