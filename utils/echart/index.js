/*
 * @Author: 曹捷
 * @Date: 2020-10-26 16:36:29
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-15 14:52:48
 * @Description: 图表 原生  Eharts工具类操作
 */
import { defaultOptions, noCoordOptions, Options } from './options'
import Series from './series'
import dataSet from './dataSet'
import legend from './legend'
import tooltip from './tooltip'
import utils from './../utils'
class echartInfo {
  /**
   * Eharts工具类操作
   * @param {*} vm 
   * vue  dom 
   * @param {*} options 
   * echarts options 直接使用当前options
   * 为空根据图标类型 ，定义初始值
   * @param {String} key  options
   * echarts  对应 vue data 对象key名
   * @param {String} type  
   * default  coord
   * coord 有坐标系的  默认有坐标系
   * noCoord 无坐标系的
   */
  constructor (vm, options, key = 'options', type = "coord") {
    let initOption = {}
    if (type === 'coord') {
      initOption = defaultOptions
    } else if (type === 'noCoord') {
      initOption = noCoordOptions
    }
    options = options ? options : utils.util.cloneObj(initOption)
    this.vm = vm
    this.key = key
    vm.$set(vm, key, options)
    this.series = new Series(vm, key)
    this.dataSet = new dataSet(vm, key)
    this.options = new Options(vm, key)
    this.legend = new legend(vm, key)
    this.tooltip = new tooltip(vm, key)

    return this
  }
  /**
   * echarts dataset数据设置
   * 将接口返回的数据  转换为  dataset  key  value 要求的格式
   * @param {Array[Object]} list 
   * 接口返回数据 [{date:'',value:2}]
   * @param {Object} chartData 
   * chart 默认data ，包含columns顺序和data对应的rows
   * dataset:{
        dimensions:['key', 'value'], //维度
        source:[] //数据
      },
   * @param {Array[String]} listValue 
      和columns  对应的对象key集合['date', 'value']
   */
  setDataByKeys (list) {
    let arr = []
    let listValue = this.vm[this.key].dataset.dimensions
    list.forEach(element => {
      let eleInfo = {}
      listValue.forEach((ele, index) => {
        eleInfo[ele] = element[ele]
      });
      arr.push(eleInfo)
    });
    this.vm[this.key].dataset.source = arr
  }
  // 直接设置数据源
  setData (list) {
    this.vm[this.key].dataset.source = list
  }

}

export default echartInfo