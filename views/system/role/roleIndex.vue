<!--
 * @Author: 曹捷
 * @Date: 2019-08-19 10:44:04
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-03 17:50:11
 * @Description: file content
 -->
<template>
  <div class="obit-main obit-main-fill" v-loading="loading">
    <title-wrap title="角色管理"></title-wrap>
    <el-container class="height-100-head">
      <el-container class="role-layout">
        <el-aside width="300px">
          <div class="title p-l-10 p-r-10">
            <span class="online">系统角色</span>
            <el-button @click="addDialog" class="btn-md f-r" icon="el-icon-plus" type="primary" v-permiss="'addRole'">新增</el-button>
          </div>
          <!-- <el-input class="input-obit p-l-10 p-r-10" placeholder="搜索" v-model="model.approvalStatus">
            <i @click="search(true)" class="el-input__icon el-icon-search" slot="suffix" style="line-height:32px;"></i>
          </el-input>-->
          <ul class="role-list" v-if="list.length>0">
            <li
              :class="{'ischeck':checkRole ===item.roleId}"
              :key="index"
              @click="choiceRole(item)"
              class="role-device-item pointer"
              v-for="(item,index) in list"
            >
              {{item.roleName}}
              <el-tooltip class="hover-operator obit-link f-r" content="删除" effect="dark" placement="top" v-permiss="'removeRole'">
                <i @click.stop="removeRole(item)" class="el-icon el-icon-delete pointer"></i>
              </el-tooltip>
              <el-tooltip class="hover-operator obit-link f-r" content="编辑" effect="dark" placement="top" v-permiss="'editRole'">
                <i @click.stop="editDialog(item)" class="el-icon el-icon-setting pointer"></i>
              </el-tooltip>
            </li>
          </ul>
        </el-aside>
        <el-main class="scrollBar">
          <contentForm :fromtitle="{title1:'角色权限',title2:'以下为用户数据权限'}">
            <el-tree
              :data="treeData"
              :default-checked-keys="defaultChecks"
              :default-expand-all="true"
              :highlight-current="true"
              :props="defaultProps"
              class="role-tree"
              node-key="menuId"
              ref="tree"
              show-checkbox
              v-if="checkRole"
            ></el-tree>
            <nodata v-else></nodata>
            <div class="btn_wrap">
              <el-button @click="submitRole" class="submit btn-md" style="padding: 10px 28px;" type="primary">提交</el-button>
            </div>
            <!-- <submit-bar @submitForm="submitRole" v-permiss="'editPermiss'" v-show="checkRole" /> -->
          </contentForm>
        </el-main>
      </el-container>
    </el-container>
    <roleAdd :addType="addType" :detailsInfo="detailsInfo" :visible.sync="addVisable" @reload="initRole"></roleAdd>
  </div>
</template>

<script>
import roleAdd from './roleAdd'
import util from '@/common-modules/utils/utils'
export default {
  components: { roleAdd },
  data() {
    return {
      loading: false,
      list: [],
      checkRole: '',
      // 权限树展示相关
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      defaultChecks: [], // 树 默认选择
      // 新增编辑相关
      addVisable: false,
      addType: 'add',
      detailsInfo: {}
    }
  },
  methods: {
    initRole() {
      this.$http.getSystemRoleList().then(res => {
        this.list = res
      })
    },
    initTree() {
      this.$http.getSystemPermissionList().then(res => {
        this.treeData = res
      })
    },
    // 选择角色，分配权限
    choiceRole(item) {
      this.checkRole = this.checkRole === item.roleId ? '' : item.roleId
      this.checkRole &&
        this.$http
          .getPermissionByRoleId({ roleId: this.checkRole })
          .then(res => {
            let list = []
            res.forEach(element => {
              list.push(element.menuId)
            })
            this.removeParentId(list, this.treeData)
            this.defaultChecks = list
            this.$refs.tree.setCheckedKeys(this.defaultChecks)
          })
    },

    setParentId(keys, data) {
      //由于element  tree选择的子节点是没有包含父节点的，在传递参数之前必须带上父节点，这里最多三级
      function getParent(list, keys) {
        let num = 0
        for (const key in list) {
          if (list.hasOwnProperty(key)) {
            const element = list[key]
            if (element.children && element.children.length > 0) {
              getParent(element.children, keys)
            }
            if (keys.indexOf(element.menuId) != -1) {
              num++
            }
          }
        }
        if (num > 0) {
          if (keys.indexOf(list[0].parentId) == -1) {
            keys.push(list[0].parentId)
          }
        }
      }
      getParent(data, keys)
      return keys
    },
    /**
     * 在设置的时候  不必要的父节点必须去掉
     * data 数据，    总数组
     */
    removeParentId(arr, data, its) {
      for (var i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i])
      }
      var parent = []
      queryRemove(arr, data, parent)
      removeParent(arr, parent)
      function queryRemove(arr, data, parent) {
        var res = true
        for (var d in data) {
          if (res) {
            for (var a = 0; a < arr.length; a++) {
              if (data[d] == arr[a]) {
                break
              } else if (a == arr.length - 1) {
                res = false
                parent.push(data[d].parentId)
                break
              }
            }
          }
          if (data[d].children != null && data[d].children.length > 0) {
            queryRemove(arr, data[d].children, parent)
          }
        }
      }
      function removeParent(arr, parent) {
        for (var i in parent) {
          arr = util.util.removeByValue(arr, parent[i])
        }
      }
    },
    getArrString(arr) {
      var right = ''
      for (var i = 0; i < arr.length; i++) {
        right += arr[i]
        if (i != arr.length - 1) {
          right += ','
        }
      }
      return right
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
          this.$http.removeSystemRoleInfo({ roleId: item.roleId }).then(res => {
            this.$message.success('删除成功')
            this.initRole()
          })
        })
        .catch(() => {})
    },
    // 角色新增和编辑相关   -------------------end-------------------
    submitRole() {
      if (this.checkRole) {
        let keys = this.$refs.tree.getCheckedKeys()
        keys = this.setParentId(keys, this.treeData)
        keys = util.util.removeByValue(keys, 0)
        console.log('TCL: submitRole -> keys', keys)
        this.loading = true
        this.$http
          .addPerByRoleId({
            roleId: this.checkRole,
            permission: keys.join(',')
          })
          .then(res => {
            this.$message.success('权限保存成功')
            this.loading = false
          })
      }
    }
  },
  mounted() {
    this.initTree()
    this.initRole()
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
    background: $bodybg;
    border: 1px solid $--border-color-base;
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
      i {
        color: $--color-text-primary;
      }
    }
    .role-device-item:last-child {
      border-bottom: 1px solid $border;
    }
    .role-device-item:hover {
      background: $--color-text-regular;
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
  background-color: $bodybg;
  border-top: 1px solid $--border-color-lighter;
  position: fixed;
  bottom: 0px;
  left: 0;
  box-shadow: 0 -2px 2px $--border-color-lighter;
  z-index: 100;
  border-top: 1px solid $--border-color-lighter;
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