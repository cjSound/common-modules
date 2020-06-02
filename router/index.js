/*
 * @Author: 曹捷
 * @Date: 2020-04-22 14:28:38
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-02 16:43:14
 * @Description: 路由基础文件
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import system from './system'
//  name 判断权限的关键字，必须和后台菜单设置里面的menuCode相等，才有此菜单
export const constantRoutes = [
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
  ...system
]

const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()
// router.addRoutes(systemRouter)

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router