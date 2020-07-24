<template>
  <div class="echarts-panel" ref="echarts"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    chartsOption: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(['windowSize'])
  },

  data() {
    return {
      chart: null
    }
  },

  watch: {
    windowSize() {
      if (this.chart != null && this.chart != '' && this.chart != undefined) {
        this.chart.resize()
      }
    },
    chartsOption: {
      deep: true,
      handler(val) {
        console.log('TCL: handler -> val', JSON.stringify(val))
        this.chart.setOption(val, true)
      }
    }
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
    }
  },

  mounted() {
    this.init()
  }
}
</script>

<style lang="scss">
.echarts-panel {
  width: 100%;
  height: 100%;
}
</style>
