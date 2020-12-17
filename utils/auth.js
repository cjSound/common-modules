/*
 * @Author: 曹捷
 * @Date: 2020-04-22 14:28:38
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-17 17:28:14
 * @Description: 保存登录用户信息 到cookie
 */
import Cookies from 'js-cookie'
import { System } from './../api'
import { API, CONFIG } from './../api'
// import info from './../api/index'
// let SYSTEM = new info()
import store from './../store/permission'
console.log('🚀 ~ file: auth.js ~ line 14 ~ store', store)

function getTokenKey () {
  if (System && System.CONFIG && System.CONFIG.TokenKey) {
    return System.CONFIG.TokenKey
  }
  return 'tokenKey'
}
function getRoleKey () {
  if (System.CONFIG && System.CONFIG.roleKey) {
    return System.CONFIG.roleKey
  }
  return 'roleKey'
}
export function getToken () {
  return Cookies.get(getTokenKey())
}

export function setToken (token) {
  return Cookies.set(getTokenKey(), token)
}

export function removeToken () {
  return Cookies.remove(getTokenKey())
}

export const userRole = {
  get () {
    let user = Cookies.get(getRoleKey())
    return user ? user : '{}'
  },
  set (role) {
    return Cookies.set(getRoleKey(), role)
  },
  remove () {
    return Cookies.remove(getRoleKey())
  }
}

export function hasPermiss (roleKey) {
  let bthList = store.state.sysBtn
  return bthList.filter(item => item.menuCode === roleKey).length > 0
}