/*
 * @Author: 曹捷
 * @Date: 2019-08-01 14:25:13
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-17 15:01:42
 * @Description: file content
 */
import API from './api/api'
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
        this.api = new API(config)
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
    }
}
export default obitAjax;