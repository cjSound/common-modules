/*
 * @Author: 曹捷
 * @Date: 2020-04-22 14:28:38
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-18 15:07:00
 * @Description: 路由基础文件
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const modulesFiles = require.context("./templete", true, /\.js$/);
let modules = modulesFiles.keys().reduce((modules, element) => {
  modules[element.replace(/^\.\/(\S+)\.js$/, '$1')] = modulesFiles(element).default
  return modules
}, {});
//  name 判断权限的关键字，必须和后台菜单设置里面的menuCode相等，才有此菜单
export let constantRoutes = [
  {
    path: '/404',
    component: () => import('@/common-modules/views/404'),
    meta: {
      noLogin: true
    },
    hidden: true
  },
  {
    path: '/401',
    hidden: true,
    meta: {
      noLogin: true
    },
    component: () => import('@/common-modules/views/401'),
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
]

const createRouter = (options = {}) => {
  let arr = []
  // 初始化 加载默认模板
  if (options.template) {
    if (Object.prototype.toString.call(options.template).indexOf('String') !== -1) {
      arr.push(options.template)
    } else if (Object.prototype.toString.call(options.template).indexOf('Array') !== -1) {
      arr = options.template
    }
  }
  if (arr.length > 0) {
    arr.forEach(element => {
      if (modules[element]) {
        constantRoutes = constantRoutes.concat(modules[element])
      } else {
        console.error(`obit front platform  找不到 ${element} Router 模块`)
      }
    })
  }
  return new Router({
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })
}

// const router = createRouter()
// router.addRoutes(systemRouter)

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default createRouter