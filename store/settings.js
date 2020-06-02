/*
 * @Author: 曹捷
 * @Date: 2020-04-21 09:40:10
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-02 14:39:56
 * @Description: file content
 */
import config from '@/config/config'


const state = {

  title: config.title,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

