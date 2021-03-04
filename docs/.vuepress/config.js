/*
 * @Author: 曹捷
 * @Date: 2020-02-26 11:45:28
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-24 19:29:10
 * @Description: file content
 */
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '../../' + dir)
}
module.exports = {
  base: '/obit-web-ui/',
  host: '0.0.0.0',
  title: '前端基础开发平台',
  description: '易比特 大数据 智能物联 前端基础平台',
  port: 6000,
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }]
  ],
  locales: {
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
    },
  },
  themeConfig: {
    logo: '/img/logo.png',
    nav: [{
      text: '首页',
      link: '/'
    },
    {
      text: 'Github',
      link: 'https://github.com/cjSound/obit-ui/'
    },
    {
      text: 'Gitee',
      link: 'https://gitee.com/cjSound/obit-ui/'
    },
    ],
    sidebar: [
      {
        title: '开发指南',
        collapsable: false,
        children: [
          'views/guide/install.md',
          'views/guide/get-started.md'
        ]
      },
      {
        title: '配置',
        collapsable: false,
        children: [
          'views/config/Config.md',
          'views/config/API.md',
          'views/config/router.md',
          'views/config/filter.md',
        ]
      },
      {
        title: '基础组件',
        collapsable: false,
        children: [
          'views/components/icon.md',
        ]
      }
    ]
  },
  markdown: {
    lineNumbers: true
  },
  scss: { //配置 scss 根目录
    includePaths: [path.join(__dirname, '../../style')]
  },
  plugins: ['demo-container'],
  chainWebpack: (config, isServer) => {
    // config 是 ChainableConfig 的一个实例
    config.module
      .rule('svg')
      .exclude.add(resolve('icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}