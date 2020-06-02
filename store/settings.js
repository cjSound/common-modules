/*
 * @Author: 曹捷
 * @Date: 2020-04-21 09:40:10
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-05-25 10:30:31
 * @Description: file content
 */


const state = {

  title: "三一重起激励系统",

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

