/*
 * @Author: 曹捷
 * @Date: 2020-11-05 10:58:20
 * @LastEditors: 曹捷
 * @LastEditTime: 2021-01-13 15:04:28
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
  legend: {
    selected: {
      //不想显示的都设置成false  对应series name 
    }
  },

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
  legend: {
    selected: {
      //不想显示的都设置成false  对应series name 
    }
  },
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
  title (title, options) {
    this.vm[this.key].title.text = title
    if (options) {
      Object.assign(this.vm[this.key].title, options)
    }
  }
  legend (options) {
    if (options) {
      Object.assign(this.vm[this.key].legend, options)
    }
    return this
  }
  y (name) {
    this.vm[this.key].yAxis.name = name
    return this
  }
  x (options) {
    if (options) {
      Object.assign(this.vm[this.key].xAxis, options)
    }
    return this
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