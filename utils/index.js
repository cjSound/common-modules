/*
 * @Author: 曹捷
 * @Date: 2020-07-16 13:11:13
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-10-22 16:47:29
 * @Description: 返回注册全局api  到vue实例
 */
import store from '@/store'

export let util = require('./utils').default


/**
 * 额外增加面包屑和取消面包屑
 */
export let crumb = {
  /**
   * 增加面包屑
   * @param {String} menuName 
   */
  addTab (menuName) {
    let crumbInfo = { type: 'show', menuName, path: '' }
    store.commit('app/setLastBreadcrumb', crumbInfo)
  },
  /**
   * 取消自定义增加的面包屑
   */
  removeTab () {
    store.commit('app/removeLastBreadcrumb')
  }
}