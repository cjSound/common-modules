/*
 * @Author: 曹捷
 * @Date: 2020-04-27 14:49:50
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-03 13:21:36
 * @Description: 系统管理路由
 */
import Layout from '@/common-modules/layout'
export default [{
    path: '/system',
    name: 'systemMain',
    component: Layout,
    children: [{
        path: 'userIndex',
        name: 'systemUser',
        component: () => import('@/common-modules/views/system/userManage/userIndex'),
    },
    {
        path: 'roleIndex',
        name: 'systemRole',
        component: () => import('@/common-modules/views/system/role/roleIndex'),
    },
    {
        path: 'orgIndex',
        name: 'systemOrg',
        component: () => import('@/common-modules/views/system/org/orgIndex')
    }, {
        path: 'dicIndex',
        name: 'systemDcit',
        component: () => import('@/common-modules/views/system/dict/dicIndex')
    }, {
        path: 'menuIndex',
        name: 'menuMain',
        component: () => import('@/common-modules/views/system/menu/menuIndex')
    },

    ]
}
]