/*
 * @Author: 曹捷
 * @Date: 2020-08-26 09:45:47
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-03 13:38:21
 * @Description: 用户权限
 */
import ajax from '@/common-modules/api'
import { Message } from 'element-ui'
import util from '@/common-modules/utils/utils'
const permission = {
    namespaced: true,
    state: {
        sysMenu: [],
        sysBtn: [],
    },
    mutations: {
        setSysMenu: (state, value) => {
            state.sysMenu = value
        },
        setSysBtn: (state, value) => {
            state.sysBtn = value
        },
    },
    actions: {
        // 获取用户的权限 set进vuex  在左侧菜单判断是否显示菜单 和路由拦截里面判断是否有权限
        getUserPermission({ commit }, state) {
            return new Promise((allresolve, allreject) => {
                let menu = new Promise((resolve, reject) => {
                    ajax.methods.getSystemMenuList().then(res => {
                        commit('setSysMenu', res)
                        var arr = util.array.treeToArray(util.util.cloneObj(res), 'children')
                        util.localstorage.put('listM', arr)
                        resolve()
                    }).catch(err => {
                        reject()
                    })
                })
                let btn = new Promise((resolve, reject) => {
                    ajax.methods.getSystemButtonList().then(res => {
                        commit('setSysBtn', res)
                        resolve()
                    }).catch(err => {
                        reject()
                    })
                })
                Promise.all([menu, btn]).then(result => {
                    allresolve()
                }).catch(error => {
                    allreject()
                    Message.error('获取系统权限失败，请刷新页面重试')
                })
            })

        }
    },
    getters: {
        sysMenu: state => state.sysMenu,
        sysBtn: state => state.sysBtn,

    }
}

export default permission


