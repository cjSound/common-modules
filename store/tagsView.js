/*
 * @Author: 曹捷
 * @Date: 2019-08-01 14:25:13
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-04-13 14:58:51
 * @Description: file content
 */
const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    let item = Object.assign({}, view, {
      title: view.name || 'no-name'
    })
    item.name = undefined
    state.visitedViews.push(item)
  },

  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },

  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.affix || v.path === view.path
    })
  },

  DEL_ALL_VISITED_VIEWS: state => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.affix)
    state.visitedViews = affixTags
  },

  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  addVisitedView({
    commit
  }, view) {
    commit('ADD_VISITED_VIEW', view)
  },

  delView({
    dispatch,
    state
  }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
      })
    })
  },
  delVisitedView({
    commit,
    state
  }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersViews({
    dispatch,
    state
  }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
      })
    })
  },
  delOthersVisitedViews({
    commit,
    state
  }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },

  delAllViews({
    dispatch,
    state
  }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
      })
    })
  },
  delAllVisitedViews({
    commit,
    state
  }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },

  updateVisitedView({
    commit
  }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true, // vuex 有独立的命名空间 调用例如：tagsView/addVisitedView
  state,
  mutations,
  actions,
  getters: {
    visitedViews: state => state.visitedViews
  }
}