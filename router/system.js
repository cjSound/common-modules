/*
 * @Author: 曹捷
 * @Date: 2020-04-27 14:49:50
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-02 11:48:53
 * @Description: 系统管理路由
 */
import Layout from '@/common-modules/layout'
export default [{
    path: '/system',
    component: Layout,
    redirect: '/system/menu',
    name: 'systemMain',
    meta: { title: '系统管理', icon: 'w-app' },
    children: [
        {
            path: 'menu',
            name: 'menuIndex',
            component: () => import('@/common-modules/views/system/menu/menuIndex'),
            meta: { title: '菜单管理', icon: 'tree' }
        },
        {
            path: 'org',
            name: 'orgIndex',
            component: () => import('@/common-modules/views/system/org/orgIndex'),
            meta: { title: '机构管理', icon: 'nested' }
        },
        {
            path: 'resource',
            name: 'resourceIndex',
            component: () => import('@/common-modules/views/system/resource/resourceIndex'),
            meta: { title: '资源管理', icon: 'tree' }
        },
        {
            path: 'roleIndex',
            name: 'roleIndex',
            component: () => import('@/common-modules/views/system/role/roleIndex'),
            meta: { title: '角色管理', icon: 'peoples' }
        },
        {
            path: 'userIndex',
            name: 'userIndex',
            component: () => import('@/common-modules/views/system/userManage/userIndex'),
            meta: { title: '用户管理', icon: 'user' }
        }
    ]
}
]