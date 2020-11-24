/*
 * @Author: 曹捷
 * @Date: 2020-10-26 16:36:29
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-11-05 10:34:29
 * @Description: 图表 charts工具类操作
 */
export default {

  /**
   * v-charts 组件 设置
   * @param {Array[Object]} list 
   * 接口返回数据 [{date:'',value:2}]
   * @param {Object} chartData 
   * chart 默认data ，包含columns顺序和data对应的rows
   * {
        columns: ['日期', '未开工数'],
        rows: []
      }
   * @param {Array[String]} listValue 
      和columns  对应的对象key集合['date', 'value']
   */
  listToChartList (list, chartData, listValue) {
    let arr = []
    list.forEach(element => {
      let eleInfo = {}
      listValue.forEach((ele, index) => {
        eleInfo[chartData.columns[index]] = element[ele]
      });
      arr.push(eleInfo)
    });
    chartData.rows = arr
  }
}