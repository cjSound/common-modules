<!--
 * @Author: 曹捷
 * @Date: 2020-04-22 14:28:39
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-03 10:33:38
 * @Description: 菜单 根据路由生成，根据系统权限判断是否展示对应菜单
 -->
<template>
  <div class="menu-wrapper" v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item)">
      <el-menu-item :class="{'submenu-title-noDropdown':!isNest,'currMenu':currMenu}" :index="item.menuCode" @click="toPath(item)">
        <item :icon="item.iconname||(item&&item.iconname)" :title="item.menuName" />
      </el-menu-item>
    </template>

    <el-submenu :index="'submenu'+item.menuCode" popper-append-to-body ref="subMenu" v-else>
      <template slot="title">
        <item :icon="item && item.iconname" :title="isCollapse?'':item.menuName" v-if="item" />
      </template>
      <sidebar-item
        :base-path="resolvePath(child.path)"
        :is-nest="true"
        :item="child"
        :key="child.menuCode"
        class="nest-menu"
        v-for="child in item.children"
      />
    </el-submenu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import path from 'path'
import { isExternal } from '@/common-modules/utils/validate'
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: { Item },
  computed: {
    ...mapGetters(['sidebar']),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    isCollapse() {
      return this.sidebar.opened === 2
    }
  },
  watch: {
    $route(value) {
      this.currMenu = value.path === this.item.path
    }
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    this.onlyOneChild = null
    return {
      currMenu: false
    }
  },
  mounted() {},
  methods: {
    toPath(item) {
      item.name = item.menuName
      this.$store.dispatch('tagsView/addVisitedView', item)
      console.log('toPath -> this.$route.path', this.$route.path, item)
      if (this.$route.path !== item.path) {
        this.$router.push({
          path: item.path
        })
      }
    },
    hasOneShowingChild(children = [], parent) {
      return parent.children && parent.children.length > 0 ? false : true
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(
        this.basePath === null ? '' : this.basePath,
        routePath === null ? '' : routePath
      )
    }
  }
}
</script>
<style lang="scss">
#app .sidebar-container .el-submenu {
  .menu-wrapper {
    .currMenu {
      background-color: $subMenuSelect !important;
    }
  }
}
</style>
