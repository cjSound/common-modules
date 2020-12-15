/*
 * @Author: 曹捷
 * @Date: 2020-11-23 15:38:35
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-15 14:53:10
 * @Description: 数据中心
 */
export default class {
  /**
  * echart 数据中心 相关API调用操作  虚拟dom 赋值
  * @param {*} vm 
  */
  constructor (vm, key) {
    this.vm = vm
    this.key = key
  }
  /**
   * 设置series 名称和 dataset 维度关系  
   * @param {Array} listKey 
   * 第一个是维度
   * 第二个是Y轴
   * 第三个
   * 第四个等
   * [{ prop: 'alarmSum', label: '预警数量', },
      { prop: 'deviceSum', label: '总设备数', }]
   * @param {Array} keys 
    对应关系
      ['prop', 'label']
   */
  init (listKey, keys = ['key', 'name']) {
    let dimensions = []
    listKey.forEach((element, index) => {
      dimensions.push(element[keys[0]])
      if (index > 0) {
        let item = this.vm[this.key].series[index - 1]
        if (item) {
          this.vm.$set(item, 'name', element[keys[1]])
        } else {
          this.vm[this.key].series.push({ name: element[keys[1]] })
        }
      }
    });
    this.vm.$set(this.vm[this.key].dataset, 'dimensions', dimensions)
  }
}