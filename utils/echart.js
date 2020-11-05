/*
 * @Author: 曹捷
 * @Date: 2020-10-26 16:36:29
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-11-05 11:19:40
 * @Description: 图表 原生  Eharts工具类操作
 */
class echartInfo {
  /**
   * Eharts工具类操作
   * @param {*} vm 
   * vue  dom 
   * @param {*} options 
   * echarts options 
   */
  constructor (vm, options) {
    this.vm = vm
    this.options = options
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
        dimensions:['key', 'value'],维度
        source:[] 数据
      },
   * @param {Array[String]} listValue 
      和columns  对应的对象key集合['date', 'value']
   */
  setDataSet (list, listValue) {
    let arr = []
    list.forEach(element => {
      let eleInfo = {}
      listValue.forEach((ele, index) => {
        eleInfo[this.options.dataset.dimensions[index]] = element[ele]
      });
      arr.push(eleInfo)
    });
    this.options.dataset.source = arr
  }
}

export default echartInfo