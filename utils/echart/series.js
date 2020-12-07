/*
 * @Author: 曹捷
 * @Date: 2020-11-23 14:59:24
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-07 11:26:38
 * @Description: series 相关操作
 */
let typeInfo = {
  min: '最小值', max: '最大值', average: '平均值', median: '中位数'
}
export default class {
  /**
   * echart series 相关API调用操作  虚拟dom 赋值
   * @param {*} vm 
   */
  constructor (vm, key) {
    this.vm = vm
    this.key = key
  }
  /**
   * ['line','line']
   * @param {Array[String]} typesArray 
   */
  init (typesArray, options = {}) {
    typesArray.forEach((element, index) => {
      let item = this.vm[this.key].series[index]
      if (item) {
        this.vm.$set(item, 'type', element)
      } else {
        this.vm[this.key].series.push(Object.assign({ type: element }, options))
      }
    });
    // this.vm.$set(this.vm[this.key], 'series', arr)
  }
  /**
   * 初始化label
   * @param {*} position 
   * 支持：top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
   * String  
   * 每一列label的位置，每一列都相等
   * Array
   * 每一列 细分，数组下标对应
   */
  showLable (position) {
    let list = this.vm[this.key].series
    position = position ? position : 'top'
    list.forEach((element, index) => {
      let pos = Object.prototype.toString.call(position).indexOf('Array') === -1 ? position : position[index]
      this.vm.$set(element, 'label', {
        normal: {
          show: true,
          position: pos
        }
      })
    });
  }
  addHover () {
    let list = this.vm[this.key].series
    let emphasis = {
      label: {
        show: true,
        fontSize: '16',
        fontWeight: 'bold'
      }
    }
    list.forEach((element, index) => {
      this.vm.$set(element, 'emphasis', emphasis)
    });
  }

  /**
   * 新增图表标线
   * @param {Array} pointTypes 
   * typeInfo
   * @param {*} options 
   * echarts 参数 ，文档参数
   * https://echarts.apache.org/zh/option.html#series-line.markPoint
   */
  addMarkPoint (pointTypes, options = {}) {
    let data = []
    pointTypes.forEach(element => {
      data.push({
        type: element, name: typeInfo[element]
      })
    });
    let markPoint = Object.assign({ data }, options)
    if (Object.prototype.toString.call(this.vm[this.key].series).indexOf('Object') !== -1) {
      this.vm.$set(this.vm[this.key].series, 'markPoint', markPoint)
    } else if (Object.prototype.toString.call(this.vm[this.key].series).indexOf('Array') !== -1) {
      this.vm[this.key].series.forEach((element, index) => {
        this.vm.$set(this.vm[this.key].series[index], 'markPoint', markPoint)
      });
    }
  }
  /**
   * 新增图表标线。
   * @param {*} pointTypes 
   * typeInfo 
   * @param {*} options 
   * https://echarts.apache.org/zh/option.html#series-line.markLine
   */
  addMarkLine (pointTypes, options = {}) {
    let data = []
    pointTypes.forEach(element => {
      data.push({
        type: element, name: typeInfo[element],
        label: {
          formatter: '{b}: {c}'
        }
      })
    });
    let markLine = Object.assign({ data }, options)
    if (Object.prototype.toString.call(this.vm[this.key].series).indexOf('Object') !== -1) {
      this.vm.$set(this.vm[this.key].series, 'markLine', markLine)
    } else if (Object.prototype.toString.call(this.vm[this.key].series).indexOf('Array') !== -1) {
      this.vm[this.key].series.forEach((element, index) => {
        this.vm.$set(this.vm[this.key].series[index], 'markLine', markLine)
      });
    }
  }
}