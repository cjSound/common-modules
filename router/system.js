/*
 * @Author: 曹捷
 * @Date: 2020-04-27 14:49:50
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-18 09:02:05
 * @Description: 系统管理路由
 */
import Layout from './../layout/index.vue'
export default [
    {
        path: '/system',
        name: 'systemMain',
        component: Layout,
        children: [{
            path: 'userIndex',
            name: 'systemUser',
            component: () => import('./../views/system/userManage/userIndex'),
        },
        {
            path: 'roleIndex',
            name: 'systemRole',
            component: () => import('./../views/system/role/roleIndex'),
        },
        {
            path: 'orgIndex',
            name: 'systemOrg',
            component: () => import('./../views/system/org/orgIndex')
        }, {
            path: 'dicIndex',
            name: 'systemDcit',
            component: () => import('./../views/system/dict/dicIndex')
        }, {
            path: 'menuIndex',
            name: 'menuMain',
            component: () => import('./../views/system/menu/menuIndex')
        },
        ]
    }
]