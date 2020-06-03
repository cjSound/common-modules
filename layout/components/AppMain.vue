<!--
 * @Author: 曹捷
 * @Date: 2020-04-30 08:36:29
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-03 11:13:36
 * @Description: file content
 -->
<template>
  <section class="app-main theme-blue">
    <transition mode="out-in" name="fade-transform">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
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
