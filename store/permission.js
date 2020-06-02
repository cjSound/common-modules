/*
 * @Author: 曹捷
 * @Date: 2020-08-26 09:45:47
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-02 15:17:18
 * @Description: 用户权限
 */
import ajax from '@/common-modules/api'
import { routerPermission } from '@/common-modules/utils/validate'
import { Message } from 'element-ui'
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
                    // if (!routerPermission(this.sysMenu, this.$route.path, this.$route.meta)) {
                    //     this.$router.push({ path: '/401' })
                    // }
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


