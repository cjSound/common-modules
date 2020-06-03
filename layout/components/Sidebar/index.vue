<!--
 * @Author: 曹捷
 * @Date: 2020-06-02 09:11:01
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-03 10:40:59
 * @Description: 左侧菜单
--> 
<template>
  <div :class="{'has-logo':showLogo}">
    <logo :collapse="isCollapse" v-if="showLogo" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :active-text-color="variables.menuActiveText"
        :background-color="variables.menuBg"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
        :text-color="variables.menuText"
        :unique-opened="true"
        mode="vertical"
      >
        <sidebar-item :base-path="route.path" :item="route" :key="route.menuCode" v-for="route in routes" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/common-modules/styles/variables.scss'
import styleVariables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    routes() {
      return this.$store.state.permission.sysMenu
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return styleVariables ? styleVariables : variables
    },
    isCollapse() {
      return !this.$store.state.app.sidebar.opened
    }
  }
}
</script>

