/*
 * @Author: 曹捷
 * @Date: 2020-11-05 10:58:20
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-04 11:48:25
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
    console.log('title: ', title);
    this.vm[this.key].title.text = title
  }
  grid (top = 0, right = 0, bottom = 0, left = 0) {
    if (top) {
      this.vm[this.key].grid.top = `${top}%`
    }
    if (right) {
      this.vm[this.key].grid.right = `${right}%`
    }
    if (bottom) {
      this.vm[this.key].grid.bottom = `${bottom}%`
    }
    if (left) {
      this.vm[this.key].grid.left = `${left}%`
    }
  }
}
export let Options = options;