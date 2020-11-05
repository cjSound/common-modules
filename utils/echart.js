/*
 * @Author: 曹捷
 * @Date: 2020-10-26 16:36:29
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-11-05 16:33:14
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
    this.typeInfo = {
      min: '最小值', max: '最大值', average: '平均值', median: '中位数'
    }
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
  // 直接设置数据源
  setData (list) {
    this.options.dataset.source = list
  }


  /**
   * 新增图表标线
   * @param {Array} pointTypes 
   * this.typeInfo
   * @param {*} options 
   * echarts 参数 ，文档参数
   * https://echarts.apache.org/zh/option.html#series-line.markLine
   */
  addMarkPoint (pointTypes, options = {}) {
    let data = []
    pointTypes.forEach(element => {
      data.push({
        type: element, name: this.typeInfo[element]
      })
    });
    let markPoint = Object.assign({ data }, options)
    if (Object.prototype.toString.call(this.options.series).indexOf('Object') !== -1) {
      this.vm.$set(this.options.series, 'markPoint', markPoint)
    } else if (Object.prototype.toString.call(this.options.series).indexOf('Array') !== -1) {
      this.options.series.forEach((element, index) => {
        this.vm.$set(this.options.series[index], 'markPoint', markPoint)
      });
    }
  }
  /**
   * 新增图表标线。
   * @param {*} pointTypes 
   * this.typeInfo 
   * @param {*} options 
   * https://echarts.apache.org/zh/option.html#series-line.markLine
   */
  addMarkLine (pointTypes, options = {}) {
    let data = []
    pointTypes.forEach(element => {
      data.push({
        type: element, name: this.typeInfo[element],
        label: {
          formatter: '{b}: {c}'
        }
      })
    });
    let markLine = Object.assign({ data }, options)
    if (Object.prototype.toString.call(this.options.series).indexOf('Object') !== -1) {
      this.vm.$set(this.options.series, 'markLine', markLine)
    } else if (Object.prototype.toString.call(this.options.series).indexOf('Array') !== -1) {
      this.options.series.forEach((element, index) => {
        this.vm.$set(this.options.series[index], 'markLine', markLine)
      });
    }
  }
}

export default echartInfo