/*
 * @Author: 曹捷
 * @Date: 2020-06-02 09:11:00
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-16 17:13:21
 * @Description: file content
 */
import Vue from 'vue'
import SvgIcon from './../components/SvgIcon/svg-icon.vue'// svg component
// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
