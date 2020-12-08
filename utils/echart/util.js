/*
 * @Author: 曹捷
 * @Date: 2020-12-08 10:50:50
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-08 10:53:21
 * @Description: fileContent
 */
export default {
  /**
   * 判断数据类型
   * @param {*} Obj 
   * 需要判断的数据
   * @param {*} type 
   * 基础类型String值  例如 'String'
   */
  isType (Obj, type) {
    return Object.prototype.toString.call(Obj).indexOf(type) !== -1
  }
}