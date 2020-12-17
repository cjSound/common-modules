/*
 * @Author: 曹捷
 * @Date: 2019-08-01 14:25:13
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-17 16:52:50
 * @Description: file content
 */
import Api from './api/api'
import common from './api/common-api'
class obitAjax {
    /**
     * 
     * @param {*} router 
     * 系统路由
     * @param {*} config 
     * 系统配置文件
     */
    constructor (router, config = {}) {
        this.api = new Api(config)
        this.config = config
        this.router = router
    }
    /**
     * 加入业务API
     * @param {*} list 
     */
    init (list) {
        this.methods = {
            ...common(this.api),
            ...list
        }
        // 系统通用配置
        obitAjax.prototype.CONFIG = this.config
        // 系统所有API
        obitAjax.prototype.API = this.methods
        obitAjax.prototype.ROUTER = this.router
    }
}

export const ObitAjax = obitAjax

let SYSTEM = (function () {
    // console.log('inst', 1)
    let info = null
    return function (key) {
        // console.log('inst', '获取实例', key)
        if (!info || !info.CONFIG) {
            info = new obitAjax()
            // console.log('inst', '初始化')
            // console.log('inst', 2222, info)
        }
        return info
    }
})()
/**
 * 获取ajax  实例
 * 通过原型链 获取所有ajaxAPI
 * 系统配置文件
 * 系统路由绑定
 */
export const System = SYSTEM()