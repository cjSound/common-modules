/*
 * @Author: 曹捷
 * @Date: 2020-12-08 10:42:03
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-08 10:56:46
 * @Description: 图例组件。
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
   * 关闭一个或者多个图例
   * @param {String,Array} info 
   * 
   */
  close (info) {
    if (util.isType(info, 'Array')) {
      info.forEach(element => {
        this.vm.$set(this.vm[this.key].legend.selected, element, false)
      })
    } else if (util.isType(info, 'String')) {
      this.vm.$set(this.vm[this.key].legend.selected, info, false)
    }
  }
  /**
  * 打开一个或者多个图例
  * @param {String,Array} info 
  * 
  */
  open (info) {
    if (util.isType(info, 'Array')) {
      info.forEach(element => {
        this.vm.$set(this.vm[this.key].legend.selected, element, true)
      })
    } else if (util.isType(info, 'String')) {
      this.vm.$set(this.vm[this.key].legend.selected, info, true)
    }
  }
}