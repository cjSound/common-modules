<!--
 * @Author: 刘硕
 * @Date: 2020-07-24 10:25:07
 * @LastEditors: 徐生延
 * @LastEditTime: 2020-08-07 10:10:17
 * @Description: file content
--> 
<template>
  <div class="echarts-panel" ref="echarts"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    chartsOption: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    chartsOption: {
      deep: true,
      handler(val) {
        this.chart.setOption(val, true)
      },
    },
  },

  methods: {
    getChart() {
      return this.chart
    },
    init() {
      if (this.chart != null && this.chart != '' && this.chart != undefined) {
        this.chart.dispose()
      }
      if (this.chart === null) {
        this.chart = echarts.init(this.$refs.echarts, '')
      }
      this.chart.setOption(this.chartsOption)
    },
  },

  mounted() {
    this.init()
  },
}
</script>

<style lang="scss">
.echarts-panel {
  width: 100%;
  height: 100%;
}
</style>
