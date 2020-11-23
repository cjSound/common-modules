/*
 * @Author: 曹捷
 * @Date: 2020-11-05 10:58:20
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-11-23 17:56:04
 * @Description: 基础默认的配置
 */
/**
 * 基础默认的配置
 */
export let defaultOptions = {
  dataset: {
    dimensions: [],
    source: []
  },
  legend: {},
  title: {
    text: ''
  },
  grid: {
    left: '4%',
    right: '0%',
    bottom: '5%',
  },
  yAxis: {
    name: '',
    axisLine: {
      show: true,
    },
    axisTick: { show: false }
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: true
    },
  },
  tooltip: {
    trigger: 'axis'
  },
  series: []
}
export let noCoordOptions = {
  dataset: {
    dimensions: [],
    source: []
  },
  legend: {},
  title: {
    text: ''
  },
  grid: {
    left: '4%',
    right: '0%',
    bottom: '5%',
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return `${params.seriesName} <br/> ${params[params.dimensionNames[0]]} ：${params.value[params.dimensionNames[1]]}
       (${params.percent}%)`
    }
  },
  series: []
}

class options {
  constructor (vm, key) {
    this.vm = vm
    this.key = key
  }
  title (title) {
    this.vm[this.key].title.text = title
  }
}
export let Options = options;