/*
 * @Author: 曹捷
 * @Date: 2020-04-22 14:28:38
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-10-22 16:26:10
 * @Description: 保存登录用户信息 到cookie
 */
import Cookies from 'js-cookie'
import config from '@/config/config'
import store from '@/store'
const TokenKey = config.TokenKey
const userRoleKey = config.roleKey


export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export const userRole = {
  get () {
    let user = Cookies.get(userRoleKey)
    return user ? user : '{}'
  },
  set (role) {
    return Cookies.set(userRoleKey, role)
  },
  remove () {
    return Cookies.remove(userRoleKey)
  }
}

export function hasPermiss (roleKey) {
  let bthList = store.state.permission.sysBtn
  return bthList.filter(item => item.menuCode === roleKey).length > 0
}