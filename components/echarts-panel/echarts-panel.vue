<!--
 * @Author: 刘硕
 * @Date: 2020-07-24 10:25:07
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-11-05 17:16:14
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
    theme: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      chart: null,
    }
  },
  watch: {
    chartsOption: {
      deep: true,
      handler (val) {
        this.chart.setOption(val, true)
      },
    },
    theme (newTheme, oldTheme) {
      this.chart.dispose();
      this.chart = echarts.init(this.$refs.chart, theme);
    }
  },

  methods: {
    getChart () {
      return this.chart
    },
    init () {
      if (this.chart != null && this.chart != '' && this.chart != undefined) {
        this.chart.dispose()
      }
      if (this.chart === null) {
        this.chart = echarts.init(this.$refs.echarts, this.theme)
      }
      this.chart.setOption(this.chartsOption)
    },
  },

  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.chart.dispose()
  }
}
</script>

<style lang="scss">
.echarts-panel {
  width: 100%;
  height: 100%;
}
</style>
