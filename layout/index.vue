<!--
 * @Author: 曹捷
 * @Date: 2020-04-22 14:28:39
 * @LastEditors: 徐生延
 * @LastEditTime: 2020-07-18 16:14:43
 * @Description:  布局layout
 -->
<template>
  <div :class="classObj" class="app-wrapper">
    <div @click="handleClickOutside" class="drawer-bg" v-if="device==='mobile'&&sidebar.opened" />
    <sidebar class="sidebar-container" />
    <div class="main-container" v-if="loadPermission">
      <!-- fixedHeader 是否固定header区域 -->
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <div :class="{'fixed-header-main':fixedHeader}" class="obt-main">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { routerPermission } from '@/common-modules/utils/validate'
import config from '@/config/config'
import { userRole } from '@/common-modules/utils/auth'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      config: config,
      loadPermission: false
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      let obj = {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
      if(this.config.theme){
        obj[this.config.theme] =true
      }
      return obj
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    initMenu() {
      this.$store.dispatch('permission/getUserPermission').then(res => {
        if (
          !routerPermission(
            this.$store.state.permission.sysMenu,
            this.$route.path,
            this.$route.meta
          )
        ) {
          this.$router.push({ path: '/401' })
        }
        this.loadPermission = true
      })
    }
  },
  mounted() {
    let userInfo = userRole.get()
    if(userInfo && JSON.parse(userInfo).userType === 1){
      this.initMenu()
    }else{
      if(this.$route.path === '/main'){
        this.$router.push('/client/monitorIndex');
      }else{
        this.$router.push('/401');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/common-modules/styles/mixin.scss';
@import '~@/common-modules/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
