<!--
 * @Author: 曹捷
 * @Date: 2019-08-19 10:44:04
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-05-07 15:46:22
 * @Description: 资源管理
 -->
<template>
  <div class="com-main submit-main" v-loading="loading">
    <title-wrap title="资源管理"></title-wrap>
    <el-container class="height-100-head">
      <el-container class="role-layout">
        <el-aside width="300px">
          <div class="title p-l-10 p-r-10">
            <span class="online">系统资源</span>
            <el-button @click="addDialog" class="btn-md f-r" icon="el-icon-plus" type="primary" v-permiss="'resourceAdd'">新增</el-button>
          </div>
          <!-- <el-input class="input-com p-l-10 p-r-10" placeholder="搜索" v-model="model.approvalStatus">
            <i @click="search(true)" class="el-input__icon el-icon-search" slot="suffix" style="line-height:32px;"></i>
          </el-input>-->
          <ul class="role-list" v-if="list.length>0">
            <li
              :class="{'ischeck':checkRole ===item.id}"
              :key="index"
              @click="choiceRole(item)"
              class="role-device-item pointer"
              v-for="(item,index) in list"
            >
              {{item.resourceName}}
              <el-tooltip class="hover-operator com-link f-r" content="删除" effect="dark" placement="top" v-permiss="'resourceDelete'">
                <i @click.stop="removeRole(item)" class="el-icon el-icon-delete pointer"></i>
              </el-tooltip>
              <el-tooltip class="hover-operator com-link f-r" content="编辑" effect="dark" placement="top" v-permiss="'resourceUpdate'">
                <i @click.stop="editDialog(item)" class="el-icon el-icon-setting pointer"></i>
              </el-tooltip>
            </li>
          </ul>
        </el-aside>
        <el-main class="scrollBar">
          <comApp @change="initTree" v-model="treeParams.appId"></comApp>
          <contentForm :fromtitle="{title1:'角色权限',title2:'以下为用户数据权限'}">
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
              <el-button @click="submitRole" class="submit btn-md" style="padding: 10px 28px;" type="primary" v-permiss="'resourceMenus'">提交</el-button>
            </div>
          </contentForm>
        </el-main>
      </el-container>
    </el-container>
    <resourceAdd :addType="addType" :detailsInfo="detailsInfo" :visible.sync="addVisable" @reload="initRole"></resourceAdd>
  </div>
</template>

<script>
import comApp from './../components/com-app/com-app'
import resourceAdd from './resourceAdd'
import util from '@/common-modules/utils/utils'
export default {
  components: { resourceAdd, comApp },
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
      detailsInfo: {},
      // 菜单树 筛选 APP
      treeParams: {
        appId: ''
      }
    }
  },
  methods: {
    initRole() {
      this.$http.getAllResource().then(res => {
        this.list = res
      })
    },
    initTree() {
      this.$http.getMenuTree(this.treeParams).then(res => {
        if (!res) {
          this.$message.error('请选择对应的应用')
        }
        this.treeData = res
      })
    },
    // 选择角色，分配权限
    choiceRole(item) {
      if (!this.checkRole && (!this.treeData || this.treeData.length === 0)) {
        this.$message.error('请选择对应的应用')
        return
      }
      this.checkRole = this.checkRole === item.id ? '' : item.id
      if (this.checkRole) {
        let list = []
        item.resourceMenuList.forEach(element => {
          list.push(element.menuId)
        })
        this.removeParentId(list, this.treeData)
        this.defaultChecks = list
        this.$refs.tree.setCheckedKeys(this.defaultChecks)
      } else {
        this.defaultChecks = []
        this.$refs.tree.setCheckedKeys(this.defaultChecks)
      }
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
            if (keys.indexOf(element.id) != -1) {
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
          this.$http.removeResource({ resourceId: item.id }).then(res => {
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
        this.loading = true
        let param = {
          resourceId: this.checkRole,
          menuIds: keys
        }
        this.$http
          .saveResourceMenu(param)
          .then(res => {
            this.$message.success('资源保存成功')
            this.initRole()
            this.loading = false
          })
          .catch(error => {
            this.loading = false
          })
      } else {
        this.$message.error('请选择系统资源')
      }
    }
  },
  mounted() {
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