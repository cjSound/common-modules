/*
 * @Author: 曹捷
 * @Date: 2019-08-01 14:25:13
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-11 15:26:54
 * @Description: 系统参数 必须
 */
export default {
    TokenKey: 'WT-TOKEN',
    roleKey: 'WT-ROLE',
    title: '智水环境',
    navbarTitle: '设备运维管理平台',
    navbarRight: require('./components/navbarRight'), // Vue组件 框架顶部navbar   右侧组件  是否自定义
    showLogin: true,
    fixedHeader: false,
    /**
     * 面包屑是否是在顶部navbar里面还是在body里面
     */
    breadcrumbTop: false,
    /**
     * table 是否有border
     */
    tableBorder: true,
    /**
     * 表格默认是否居中靠左  left  right  center
     */
    tableAlign: 'center',
    /**
     * theme-blue theme-black
     */
    theme: 'theme-black',

    /**
     * echarts图计时器时间
     */
    pollTime: 30000,
}