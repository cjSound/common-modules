/*
 * @Author: 曹捷
 * @Date: 2020-08-26 09:45:47
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-02 11:45:32
 * @Description: 用户权限
 */
import ajax from '@/common-modules/api'
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
        getUserPermission({ commit }, ) {
            return new Promise((resolve, reject) => {
                ajax.methods.getSysUserMenuAndPermiss().then(res => {
                    let arr = res.menus
                    let menu = arr.filter(item => {
                        return item.menuType === 0
                    })
                    let menuArr = []
                    menu.forEach(element => {
                        menuArr.push(element.menuCode)
                    });
                    let btnList = arr.filter(item => {
                        return item.menuType === 1
                    })
                    let btnArr = []
                    btnList.forEach(element => {
                        btnArr.push(element.menuCode)
                    });
                    util.localstorage.put('sysMenu', menuArr)
                    commit('setSysMenu', menuArr)
                    commit('setSysBtn', btnArr)
                    resolve()
                }).catch(error => {
                    reject(error)
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


