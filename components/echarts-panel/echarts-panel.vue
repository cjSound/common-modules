<!--
 * @Author: 刘硕
 * @Date: 2020-07-24 10:25:07
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-15 15:43:25
 * @Description: file content
--> 
<template>
  <div class="echarts-panel" :id="createKey" :class="hasData?'':'pcenter'">
    <div class="echarts-panel" ref="echarts" v-show="hasData"></div>
    <nodata v-show="!hasData" />
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import DomSize from './../../utils/domsize'
export default {
  props: {
    type: {
      type: String,
      default: 'canvas'
    },
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
      createKey: ''
    }
  },
  computed: {
    hasData () {
      let res = true
      if (this.chartsOption && this.chartsOption.dataset) {
        let dataset = this.chartsOption.dataset
        if (!dataset.source || dataset.source.length === 0) {
          res = false
        }
      }
      if (this.chartsOption && this.chartsOption.series) {
        let info = {}
        if (Object.prototype.toString.call(this.chartsOption.series).indexOf('Array') !== -1) {
          info = this.chartsOption.series[0]
        } else {
          info = this.chartsOption.series
        }
        if (info && info.data && info.data.length > 0) {
          res = true
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
        this.$nextTick(() => {
          this.resize()
        })
      },
    },
    theme (newTheme, oldTheme) {
      this.chart.dispose();
      this.chart = echarts.init(this.$refs.chart, theme, { renderer: this.type });
    }
  },
  methods: {
    getChart () {
      return this.chart
    },
    resize () {
      this.chart.resize();
    },
    init () {
      let _this = this
      if (this.chart != null && this.chart != '' && this.chart != undefined) {
        this.chart.dispose()
      }
      if (this.chart === null) {
        this.chart = echarts.init(this.$refs.echarts, this.theme, { renderer: this.type })
      }
      this.chart.setOption(this.chartsOption)
      this.chart.on('click', (params) => {
        this.$emit('click', params)
      });
      this.$nextTick(() => {
        this.resize()
        DomSize.bind(document.getElementById(this.createKey), function () {
          _this.resize()
        })
      })
    },
  },

  mounted () {
    this.createKey = Math.random() * 1000 + this.$util.util.randomString(10)
    this.init()
  },
  beforeDestroy () {
    this.chart.dispose()
    DomSize.remove(document.getElementById(this.createKey))
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
