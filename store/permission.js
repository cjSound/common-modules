/*
 * @Author: 曹捷
 * @Date: 2020-08-26 09:45:47
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-17 17:34:35
 * @Description: 用户权限
 */
import { System } from './../api'
import { Message } from 'element-ui'
import util from './../utils/utils.js'
const permission = {
    namespaced: true,
    state: {
        config: {},
        sysMenu: [],
        sysBtn: [],
        slideList: [
            {
                menuName: '系统样例',
                path: 'demo',
                menuCode: 'demo',
                iconname: 'component',
                children: [
                    {
                        menuName: '流程',
                        menuCode: 'demo1',
                        path: '/demo/flow',
                        iconname: 'star'
                    },
                ]
            }
        ]
    },
    mutations: {
        setSysMenu: (state, value) => {
            value = process.env.NODE_ENV === 'development' ? value.concat(state.slideList) : value
            state.sysMenu = value
        },
        setSysBtn: (state, value) => {
            state.sysBtn = value
        },
    },
    actions: {
        // 获取用户的权限 set进vuex  在左侧菜单判断是否显示菜单 和路由拦截里面判断是否有权限
        getUserPermission ({ commit }, state) {
            return new Promise((allresolve, allreject) => {
                /**
                 * 保存菜单树到vuex  给菜单组件
                 * 保存菜单单列listM到store，给面包屑组件
                 * @param {Array} list 
                 */
                function saveMenuAndCrumb (list) {
                    commit('setSysMenu', list)
                    var arr = util.array.treeToArray(util.util.cloneObj(list), 'children')
                    util.localstorage.put('listM', arr)
                }
                // 如果有静态菜单 静态优先
                if (System.CONFIG.configMenu && System.CONFIG.configMenu instanceof Array) {
                    saveMenuAndCrumb(System.CONFIG.configMenu)
                    allresolve()
                } else {
                    let menu = new Promise((resolve, reject) => {
                        System.API.getSystemMenuList().then(res => {
                            saveMenuAndCrumb(res)
                            resolve()
                        }).catch(err => {
                            reject()
                        })
                    })
                    let btn = new Promise((resolve, reject) => {
                        System.API.getSystemButtonList().then(res => {
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
                }

            })

        }
    },
    getters: {
        sysMenu: state => state.sysMenu,
        sysBtn: state => state.sysBtn,

    }
}

export default permission


