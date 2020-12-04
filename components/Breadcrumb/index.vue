<!--
 * @Author: 曹捷
 * @Date: 2020-04-22 14:28:38
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-02 11:27:21
 * @Description: 面包屑  两种形式 
  1放在header里面
  2放在body里面 breadcrumb-content
 -->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group class="breadcrumb" name="breadcrumb">
      <el-breadcrumb-item :key="'bread'+index" v-for="(item,index) in levelList">
        <span class="no-redirect" v-if="item.path==='noRedirect'||index==levelList.length-1">{{ item.menuName }}</span>
        <a @click.prevent="handleLink(item)" v-else>{{ item.menuName }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import util from '@/common-modules/utils/utils'
export default {
  data () {
    return {
      levelList: null,
      listMean: [],
      lastRouter: {}
    }
  },
  watch: {
    $route (list) {
      this.getBreadcrumb()
    },
    '$store.state.app.lastBreadcrumb': function (newInfo, oldInfo) {
      this.getBreadcrumb()
    }
  },
  created () {
    this.listMean = util.localstorage.get('listM')
    this.getBreadcrumb()
  },
  methods: {
    /**
     * 获取当前路径 所有上级的面 包屑 
     */
    getBreadcrumb () {
      // only show routes with meta.title
      let arr = []
      let lastCrumb = this.$store.state.app.lastBreadcrumb
      this.$route.matched.forEach(element => {
        arr = arr.concat(
          this.listMean.filter(item => {
            return element.name === item.menuCode
          })
        )
      })
      let lastRouter = arr[arr.length - 1]
      const first = arr[0]
      if (!this.isDashboard(first)) {
        arr = [{ path: '/main', menuName: '首页' }].concat(arr)
      }
      if (lastCrumb.menuName) {
        // console.log('getBreadcrumb -> lastCrumb.menuName', lastCrumb.menuName, this.lastRouter)
        if (this.lastRouter) {
          arr.push(this.lastRouter)
        }
        arr.push(lastCrumb)
      } else {
        this.lastRouter = lastRouter
      }
      this.levelList = arr
    },
    isDashboard (route) {
      const name = route && route.menuCode
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'main'.toLocaleLowerCase()
    },
    handleLink (item) {
      const { path } = item
      if (path) {
        if (path === this.$route.path) {
          return
        }
        this.$router.push(path)
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
// 面包屑在主体里面
.app-breadcrumb.breadcrumb-content {
  line-height: normal !important;
  width: 100%;
  .breadcrumb {
    float: right;
    padding-right: 20px;
  }
}
</style>
