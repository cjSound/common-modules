/*
 * @Author: 曹捷
 * @Date: 2020-08-26 09:45:47
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-10-21 10:26:51
 * @Description: 用户权限
 */
import ajax from '@/common-modules/api'
import { Message } from 'element-ui'
import config from '@/config/config'
import util from '@/common-modules/utils/utils'
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
                if (config.configMenu && config.configMenu instanceof Array) {
                    saveMenuAndCrumb(config.configMenu)
                    allresolve()
                } else {
                    let menu = new Promise((resolve, reject) => {
                        ajax.methods.getSystemMenuList().then(res => {
                            saveMenuAndCrumb(res)
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


