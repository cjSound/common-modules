<!--
 * @Author: 刘硕
 * @Date: 2020-07-24 10:25:07
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-07 09:09:43
 * @Description: file content
--> 
<template>
  <div class="echarts-panel" :class="hasData?'':'pcenter'">
    <div class="echarts-panel" ref="echarts" v-show="hasData"></div>
    <nodata v-show="!hasData" />
  </div>

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
  computed: {
    hasData () {
      let res = true
      if (this.chartsOption && this.chartsOption.dataset) {
        let dataset = this.chartsOption.dataset
        console.log('this.chartsOption.source: ', this.chartsOption.source);
        if (!dataset.source || dataset.source.length === 0) {
          res = false
        }
      }
      return res
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
      this.chart.on('click', (params) => {
        this.$emit('click', params)
      });
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
.pcenter {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
