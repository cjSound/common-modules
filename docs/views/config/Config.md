---
title: '配置中心 Config'
---
#  介绍

**配置中心是每个项目的入口默认配置，可以修改系统相关参数，包括主体布局，默认主题，ajax自定义拦截等**

## 目录结构
```js
├── src
│   ├── config 
│   │   └── `config.js` 
│   │ 
│   └── common-modules
│ 
└── package.json
```



## 基础配置文件

```js
export default {
  TokenKey: "sany-TOKEN",
  roleKey: "sany-ROLE",
  title: "易比特",
  navbarTitle: "水务智能制造平台",
  // 菜单栏图标
  showLogin: true,
  
  navbarRight: require('./components/navbarRight'), // Vue组件 框架顶部navbar   右侧组件  是否自定义

  /**
   * 是否固定header区域
   */
  fixedHeader: true,
  /**
   * 面包屑是否是在顶部navbar里面还是在body里面
   */
  breadcrumbTop: true,
  /**
   * table 是否有border
   */
  tableBorder: false,
  /**
   * 表格默认是否居中靠左  left  right  center
   */
  tableAlign: "center",
  /**
   * theme-blue theme-black
   */
  theme: "theme-blue theme-sany-risk",
  /**
   * ajax请求相关 配置
   */
  ajaxConfig: {
    // ajax请求成功 状态CODE
    successCode: '0000'
  },
  /**
   * 是否静态配置菜单 有则优先静态菜单
   */
  configMenu: require('./menu').default.menuList,

  /**
   * 菜单路由不需要验证权限  不验证登录
   */
  noPermission: true,
  // 首页对应的 组件页面，针对同代码多套系统有多个不同首页
  mainComponent: 'predictionMain'
}
```
# navbarRight 自定义头像组件
- 自定义navbar右侧组件

该组件引入 如果有会替换成框架navbar右侧区域，包括欢迎信息，头像信息，退出登录等个性化设置
```vue
<!--
 * @Author: 曹捷
 * @Date: 2020-12-11 15:28:05
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-14 11:43:05
 * @Description: 该组件引入 如果有会替换成框架navbar右侧区域，包括欢迎信息，头像信息，退出登录等个性化设置
-->
<template>
  <div class="navbarRight">
    <span class="">欢迎 {{userInfo.userName}}</span>
    <span class="notice">
      <el-badge :value="alarmLen" class="item">
        <i class="el-icon el-icon-bell" style="font-size:22px" @click="toAlarm"></i>
      </el-badge>
    </span>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="@/assets/images/logoTop.png" />
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item @click.native="logout" divided>
          <span style="display:block;">退 出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'navbarRight',
  computed: {
    navBarIndex () {
      return this.$store.state.navbar.navBarIndex
    }
  },
  data () {
    return {
      userInfo: {},
      interV: null,
      alarmLen: 0,
      len: 0
    }
  },
  watch: {
    navBarIndex () {
      this.getLatestAlarm()
    }
  },
  mounted () {
    this.getLatestAlarm();
    if (this.userInfo && this.userInfo.userType === 1) {
      if (!this.interV) {
        this.interV = window.setInterval(() => {
          this.getLatestAlarm();
        }, 60 * 30 * 1000);
      }
    }
  },
  render (h) {
    return h(
      <div class="navbarRight">
        <span class="userName">欢迎，</span>
      </div>
    )
  },
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    toAlarm () {
      this.$router.push({ path: "/workOrder/deviceAlarmIndex" });
    },
    getLatestAlarm () {
      this.$http.getLatestAlarm().then((data) => {
        this.len = data.length;
        if (data && this.len > 0) this.setNotify(this.len);
      });
      this.$http.getUncertainAlarm().then((data) => {
        this.alarmLen = data
      });
    },
    setNotify (len) {
      if (this.notify) this.notify.close();

      const h = this.$createElement;
      const generalText = h("strong", [
        h("span", "您最近有"),
        h(
          "span",
          {
            style: {
              color: "red",
              margin: "0 3px",
            },
          },
          len
        ),
        h("span", "条告警信息未读!"),
        h(
          "span",
          {
            style: {
              color: variables.mainColor,
              marginLeft: "3px",
              cursor: "pointer",
            },
            on: {
              click: () => {
                if (this.notify) this.notify.close();
                this.$router.push({ path: "/workOrder/deviceAlarmIndex" });
              },
            },
          },
          "点击查看"
        ),
      ]);
      this.notify = this.$notify({
        title: "温馨提示",
        duration: 0,
        message: generalText,
        position: "bottom-right",
      });
    },
  },
  beforeDestroy () {
    console.log('🚀 ~ file: navbarRight.vue ~ line 121 ~ beforeDestroy ~ beforeDestroy',)
    if (this.interV) window.clearInterval(this.interV);
    this.interV = null;

  },
  created () {
    this.userInfo = JSON.parse(Cookies.get('WT-ROLE'))
  },
}
</script>

<style lang="scss">
.navbarRight {
  display: flex;
  align-items: center;
  .notice {
    width: 70px;
    cursor: pointer;
    text-align: center;
    .el-badge__content {
      color: #fff;
    }
  }
  .notice:hover {
  }
}
</style>
```

- 静态菜单   configMenu
```js
/*
 * @Author: 曹捷
 * @Date: 2020-10-21 09:40:00
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-09 15:51:30
 * @Description: 菜单路由
 */
export default {
  menuList: [
    {
      "menuId": 100,
      "menuName": "首页",
      "menuCode": "systemMain",
      "path": "/main",
      "iconname": "tab",
      "parentId": 0,
    },
    {
      "menuId": 200,
      "menuName": "未开工预警管理",
      "menuCode": "rest",
      "path": "/rest",
      "parentId": 0,
      "iconname": "tab",
      children: [
        {
          "menuId": 201,
          "menuName": "未开工数据",
          "menuCode": "restCarInfoIndex",
          "path": "/rest/restCarInfoIndex",
          "parentId": 200,
        },
        {
          "menuId": 202,
          "menuName": "统计分析",
          "menuCode": "restStatisIndex",
          "path": "/rest/restStatisIndex",
          "parentId": 200,
        },
        {
          "menuId": 203,
          "menuName": "累计未开工统计",
          "menuCode": "restOutIndex",
          "path": "/rest/restOutIndex",
          "parentId": 200,
        },
      ]
    },
    {
      "menuId": 300,
      "menuName": "跨区域预警管理",
      "menuCode": "crossArea",
      "path": "/",
      "parentId": 0,
      "iconname": "tab",
      children: [
        {
          "menuId": 301,
          "menuName": "跨区域信息",
          "menuCode": "crossAreaIndex",
          "path": "/crossAreaIndex",
          "parentId": 300,
        },
        {
          "menuId": 302,
          "menuName": "统计分析",
          "menuCode": "crossStatisIndex",
          "path": "/crossStatisIndex",
          "parentId": 200,
        },
      ]
    }
  ]
}
```



#  接着奏乐
<ClientOnly>
  <obit-gif/>
</ClientOnly>