
<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" @toggleClick="toggleSideBar" class="hamburger-container" />
    <!-- breadcrumbTop true 配置 面包屑在header里面 -->
    <breadcrumb class="breadcrumb-container" v-if="config.breadcrumbTop" />
    <div class="navbarTitle" v-else-if="config.navbarTitle">{{config.navbarTitle}}</div>
    <div class="right-menu">
      <navbarRight v-if="config.navbarRight"></navbarRight>
      <div v-else>
        <span class="userName">欢迎，{{userInfo.userName}}</span>
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
    </div>
  </div>
</template>

<script>
import config from '@/config/config'
import Breadcrumb from '@/common-modules/components/Breadcrumb'
import Hamburger from '@/common-modules/components/Hamburger'
import { userRole } from '@/common-modules/utils/auth'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    navbarRight: config.navbarRight ? config.navbarRight.default : ''
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
  },
  data () {
    return {
      config: config,
      userInfo: {},
    }
  },
  created () {
    this.userInfo = JSON.parse(userRole.get())
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  },
}
</script>

<style lang="scss"  >
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: $navbag;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: $navTitle;
  .navbarTitle {
    display: inline-block;
    height: 100%;
    line-height: 50px;
    font-size: 18px;
  }
  .hamburger-container {
    line-height: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .userName {
      height: 100%;
      line-height: 50px;
      float: left;
      padding-right: 15px;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
