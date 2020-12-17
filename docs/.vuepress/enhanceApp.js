/*
 * @Author: 曹捷
 * @Date: 2020-03-05 20:27:42
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-16 17:07:04
 * @Description: file content
 */
import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import componets from './../../components'
console.log('🚀 ~ file: enhanceApp.js ~ line 13 ~ componets', componets)
// 使用异步函数也是可以的
export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
    isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
    // ...做一些其他的应用级别的优化
    Vue.use(Element)
    Vue.use(VueHighlightJS)
    // Vue.use(obitGif)

}