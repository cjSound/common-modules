/*
 * @Author: 曹捷
 * @Date: 2020-04-27 14:49:50
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-02 16:22:25
 * @Description: 系统管理路由
 */
import Layout from '@/common-modules/layout'
export default [{
    path: '/system',
    component: Layout,
    children: [{
        path: 'test1',
        component: () => import('@/common-modules/views/system/About'),
    }, {
        path: 'test2',
        component: () => import('@/common-modules/views/system/Home'),
    }, {
        path: 'userIndex',
        component: () => import('@/common-modules/views/system/userManage/userIndex'),
    },
    {
        path: 'roleIndex',
        component: () => import('@/common-modules/views/system/role/roleIndex'),
    },
    {
        path: 'orgIndex',
        component: () => import('@/common-modules/views/system/org/orgIndex')
    }, {
        path: 'dicIndex',
        component: () => import('@/common-modules/views/system/dict/dicIndex')
    }, {
        path: 'menuIndex',
        component: () => import('@/common-modules/views/system/menu/menuIndex')
    },

    ]
}
]