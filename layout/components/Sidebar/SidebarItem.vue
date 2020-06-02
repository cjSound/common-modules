<!--
 * @Author: 曹捷
 * @Date: 2020-04-22 14:28:39
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-05-26 13:22:22
 * @Description: 菜单 根据路由生成，根据系统权限判断是否展示对应菜单
 -->
<template>
  <div v-if="!item.hidden && hasMenuPermission(item)">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild)" v-if="onlyOneChild.meta">
        <el-menu-item :class="{'submenu-title-noDropdown':!isNest}" :index="resolvePath(onlyOneChild)">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu :index="resolvePath(item)" popper-append-to-body ref="subMenu" v-else>
      <template slot="title">
        <item :icon="item.meta && item.meta.icon" :title="item.meta.title" v-if="item.meta" />
      </template>
      <sidebar-item :base-path="resolvePath(child)" :is-nest="true" :item="child" :key="child.path" class="nest-menu" v-for="child in item.children" />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/common-modules/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import { mapState } from 'vuex'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  computed: {
    ...mapState(['permission'])
  },
  mixins: [FixiOSBug],
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
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    // 判断是否有此 菜单权限 通过后台设置的唯一值  menuCode 和router的name
    hasMenuPermission(parent) {
      if (this.permission.sysMenu.indexOf(parent.name) != -1) {
        return true
      }
      if (parent.children && parent.children.length === 1) {
        let child = parent.children[0]
        if (this.permission.sysMenu.indexOf(child.name) != -1) {
          return true
        }
      }
      return false
    },
    resolvePath(item) {
      let routePath = item.path
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      let rpath = path.resolve(this.basePath, routePath)
      return rpath
    }
  }
}
</script>
