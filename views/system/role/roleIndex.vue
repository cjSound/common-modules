<!--
 * @Author: 曹捷
 * @Date: 2019-08-19 10:44:04
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-05-07 15:47:19
 * @Description: 角色管理
 -->
<template>
  <div class="com-main submit-main" v-loading="loading">
    <title-wrap title="角色管理"></title-wrap>
    <comApp @change="initRole" class="m-l-5" v-model="treeParams.appId"></comApp>
    <el-container class="height-100-head" style="height: calc(100% - 96px);">
      <el-container class="role-layout">
        <el-aside width="300px">
          <!-- <comApp @change="initTree" v-model="treeParams.appId"></comApp> -->

          <div class="title p-l-10 p-r-10">
            <span class="online">系统角色</span>
            <el-button @click="addDialog" class="btn-md f-r" icon="el-icon-plus" type="primary" v-permiss="'roleAdd'">新增</el-button>
          </div>
          <ul class="role-list" v-if="list.length>0">
            <li
              :class="{'ischeck':checkRole ===item.id}"
              :key="index"
              @click="choiceRole(item)"
              class="role-device-item pointer"
              v-for="(item,index) in list"
            >
              {{item.roleName}}
              <el-tooltip class="hover-operator com-link f-r" content="删除" effect="dark" placement="top" v-permiss="'roleDelete'">
                <i @click.stop="removeRole(item)" class="el-icon el-icon-delete pointer"></i>
              </el-tooltip>
              <el-tooltip class="hover-operator com-link f-r" content="编辑" effect="dark" placement="top" v-permiss="'roleChange'">
                <i @click.stop="editDialog(item)" class="el-icon el-icon-setting pointer"></i>
              </el-tooltip>
            </li>
          </ul>
        </el-aside>
        <el-main class="scrollBar">
          <contentForm :fromtitle="{title1:'系统资源',title2:'以下为系统资源整合体'}">
            <el-tree
              :data="treeData"
              :default-checked-keys="defaultChecks"
              :default-expand-all="true"
              :highlight-current="true"
              :props="defaultProps"
              class="role-tree"
              node-key="id"
              ref="tree"
              show-checkbox
              v-if="treeData && treeData.length>0"
            ></el-tree>
            <nodata v-else></nodata>
            <div class="btn_wrap">
              <el-button @click="submitRole" class="submit btn-md" style="padding: 10px 28px;" type="primary" v-permiss="'roleResource'">提交</el-button>
            </div>
          </contentForm>
        </el-main>
      </el-container>
    </el-container>
    <roleAdd :addType="addType" :detailsInfo="detailsInfo" :visible.sync="addVisable" @reload="initRole"></roleAdd>
  </div>
</template>

<script>
import comApp from './../components/com-app/com-app'
import roleAdd from './roleAdd'
import util from '@/common-modules/utils/utils'
export default {
  components: { roleAdd, comApp },
  data() {
    return {
      loading: false,
      list: [],
      checkRole: '',
      // 权限树展示相关
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'resourceName'
      },
      defaultChecks: [], // 树 默认选择
      // 新增编辑相关
      addVisable: false,
      addType: 'add',
      detailsInfo: {},
      // 菜单树 筛选 APP
      treeParams: {
        appId: ''
      }
    }
  },
  methods: {
    initRole() {
      this.$http.getAllRole(this.treeParams).then(res => {
        this.list = res
        this.$refs.tree.setCheckedKeys([])
        this.checkRole = ''
      })
    },
    initTree() {
      this.$http.getAllResource().then(res => {
        this.treeData = res
      })
    },
    // 选择角色，分配权限
    choiceRole(item) {
      this.checkRole = this.checkRole === item.id ? '' : item.id
      if (this.checkRole) {
        let list = []
        item.roleResourceList.forEach(element => {
          list.push(element.resourceId)
        })

        this.defaultChecks = list
        this.$refs.tree.setCheckedKeys(this.defaultChecks)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
    },
    // 角色新增和编辑相关  --------------start --------------------------
    addDialog() {
      this.addVisable = true
      this.addType = 'add'
    },
    editDialog(item) {
      this.detailsInfo = item
      this.addVisable = true
      this.addType = 'edit'
    },
    removeRole(item) {
      this.$confirm('是否删除', '提示')
        .then(() => {
          this.$http.removeRole({ roleId: item.id }).then(res => {
            this.$message.success('删除成功')
            this.initRole()
          })
        })
        .catch(() => {})
    },
    // 角色新增和编辑相关   -------------------end-------------------
    submitRole() {
      if (!this.checkRole) {
        this.$message.error('请选择系统角色')
        return
      }
      let keys = this.$refs.tree.getCheckedKeys()
      // keys = this.setParentId(keys, this.treeData)
      // keys = util.util.removeByValue(keys, 0)
      this.loading = true

      let param = {
        roleId: this.checkRole,
        resourceIds: keys
      }
      this.$http
        .saveRoleResource(param)
        .then(res => {
          this.$message.success('角色保存成功')
          this.initRole()
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    }
  },
  mounted() {
    this.initRole()
    this.initTree()
  }
}
</script>

<style lang='scss' >
.role-layout {
  .role-tree {
    margin-top: 20px;
    .el-tree-node__content {
      height: auto;
      line-height: 34px;
    }
    .el-checkbox__inner {
      margin-right: 5px;
    }
  }
  .el-aside {
    margin: 5px;
    overflow: auto;
    // background: #f1f2f6;
    background: #fff;
    border: 1px solid #e4e4e4;
    position: relative;
  }
  .title {
    color: $active;
    height: 35px;
    line-height: 35px;
    font-size: 14px !important;
    margin: 10px 0;
  }
  .role-list {
    margin: 0;
    padding: 0;
    padding-top: 10px;
    font-size: 12px !important;
    overflow: auto;
    height: calc(100% - 65px);
    @include scrollBar;
    .role-device-item {
      overflow: hidden;
      height: 35px;
      line-height: 35px;
      padding-left: 10px;
      border-top: 1px solid $border;
      .hover-operator {
        display: none;
        height: 35px;
        line-height: 35px;
        padding-right: 10px;
      }
    }
    .role-device-item:last-child {
      border-bottom: 1px solid $border;
    }
    .role-device-item:hover {
      background: #f5f7fa;
      .hover-operator {
        display: initial;
      }
    }
    .ischeck {
      color: #fff;
      i {
        color: #fff;
      }
      background: $active !important;
    }
  }
}
.btn_wrap {
  height: 48px;
  width: calc(100%);
  box-sizing: border-box;
  padding: 7px 20px;
  background-color: #fff;
  border-top: 1px solid #ececec;
  position: fixed;
  bottom: 0px;
  left: 0;
  box-shadow: 0 -2px 2px #ececec;
  z-index: 100;
  border-top: 1px solid #ddd;
  .submit {
    float: right;
    margin-left: 10px;
  }
  .right {
    float: right;
    margin-left: 10px;
  }
}
</style>