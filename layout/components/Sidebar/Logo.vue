<!--
 * @Author: 曹捷
 * @Date: 2020-06-02 09:11:01
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-03 09:58:23
 * @Description: file content
--> 
<template>
  <div :class="{'collapse':collapse}" class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link class="sidebar-logo-link" key="collapse" to="/" v-if="collapse">
        <img class="sidebar-logo" src="@/assets/images/logoTop.png" />
        <!-- <h1 class="sidebar-title">{{ title }}</h1> -->
      </router-link>
      <router-link class="sidebar-logo-link" key="expand" to="/" v-else>
        <img class="sidebar-logo" src="@/assets/images/logoMenu.png" />
        <!-- <h1 class="sidebar-title">{{ title }}</h1> -->
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Vue Admin Template'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    text-align: left;

    & .sidebar-logo {
      width: 75%;
      /* height: 32px; */
      vertical-align: middle;
      // margin-right: 12px;
      margin-left: 20px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    & .sidebar-logo-link {
      text-align: center;
    }
    .sidebar-logo {
      margin-right: 0px;
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-left: 0;
    }
  }
}
</style>
