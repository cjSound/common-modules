/*
 * @Author: 曹捷
 * @Date: 2020-04-21 09:40:10
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-17 12:26:38
 * @Description: file content
 */
import ajax from './../api/config'
import { userRole, getToken, setToken, removeToken } from '@/common-modules/utils/auth'
import md5 from 'js-md5'


const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      console.log('🚀 ~ file: user.js ~ line 44 ~ ajax.methods.login ~ ajax', ajax)
      ajax.API.login({ userName: username.trim(), password: md5(password), systemType: 'manager' }).then(response => {
        console.log('login -> response', response)
        const { accessToken } = response
        commit('SET_TOKEN', accessToken)

        userRole.set(response)
        setToken(accessToken)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      resolve(userRole.get())
    })
  },

  // user logout
  logout ({ commit, state }) {
    removeToken()
    commit('RESET_STATE')
    console.log('logout -> userRole', userRole)

    userRole.remove()
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      userRole.remove()
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

