/*
 * @Author: 曹捷
 * @Date: 2020-12-08 10:42:03
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-08 11:28:17
 * @Description: 提示框组件。
https://echarts.apache.org/zh/option.html#tooltip
    可以通过点击图例控制哪些系列不显示
 */
import util from './util'
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
   * 
   * @param {*} type 
   * item\axis\none
   */
  type (type) {
    this.vm.$set(this.vm[this.key].tooltip, 'trigger', type)
  }
  formatter (fmt) {
    this.vm.$set(this.vm[this.key].tooltip, 'formatter', fmt)
  }
}