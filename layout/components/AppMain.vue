<!--
 * @Author: 曹捷
 * @Date: 2020-04-30 08:36:29
 * @LastEditors: 徐生延
 * @LastEditTime: 2020-06-04 16:08:36
 * @Description: file content
 -->
<template>
  <section :class="{'has-breadcrumb':!config.breadcrumbTop}" class="app-main theme-blue">
    <!-- breadcrumbTop false 配置 面包屑在body里面 -->
    <breadcrumb class="breadcrumb-container breadcrumb-content" v-if="!config.breadcrumbTop" />
    <transition mode="out-in" name="fade-transform">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/common-modules/components/Breadcrumb'
import config from '@/config/config'
export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  data() {
    return {
      config: config
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding:15px;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
