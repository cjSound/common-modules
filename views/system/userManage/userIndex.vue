<!--
 * @Author: 刘硕
 * @Date: 2019-08-19 09:34:05
 * @LastEditors: 刘硕
 * @LastEditTime: 2020-06-20 16:50:33
 * @Description: file content
 -->
<template>
  <div class="obit-main obit-main-fill">
    <div class="obit-search">
      <el-input @change="queryDataList(true)" class="input-md" placeholder="用户名、用户编码" v-model="params.name"></el-input>
      <el-select @change="queryDataList(true)" class="input-md" clearable filterable placeholder="请选择机构" v-model="params.orgId">
        <el-option :key="item.organizationId" :label="item.organizationName" :value="item.organizationId" v-for="item in orgList"></el-option>
      </el-select>

      <span class="p-r-10">
        <el-button @click="queryDataList" class="btn-md" icon="el-icon-search" type="primary">搜索</el-button>
        <el-button @click="addDialog" class="btn-md" icon="el-icon-plus" type="primary" v-permiss="'addUser'">新增</el-button>
      </span>
    </div>
    <div class="obit-content">
      <!-- <el-table :data="dataList" class="obit-table" style="width: 100%">
        <el-table-column :key="column.prop" :label="column.label" :min-width="column.minWidth" v-for="column in tableColumns">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row[column.prop]" class="item" effect="dark" placement="top">
              <span>{{scope.row[column.prop] || "-"}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" content="重置密码" effect="dark" placement="top" v-permiss="'resetUser'">
              <svg-icon @click="updatePass(scope.row)" class="m-r-10 obit-link" icon-class="reset" />
            </el-tooltip>
            <el-tooltip class="item" content="编辑" effect="dark" placement="top" v-permiss="'editUser'">
              <i @click="editDialog(scope.row)" class="el-icon el-icon-setting pointer obit-link p-r-10"></i>
            </el-tooltip>
            <el-tooltip class="item" content="删除" effect="dark" placement="top" v-permiss="'removeUser'">
              <i @click="deleteUser(scope.row)" class="el-icon el-icon-delete pointer obit-link"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>-->
      <obit-table
        :dataList="dataList"
        :tableColumns="tableColumns"
        @deleteEven="deleteUser"
        @editEven="editDialog"
        deletePermiss="removeUser"
        editPermiss="editUser"
        iconType="name"
        operationWidth="150px"
        v-loading="loading"
      >
        <span slot="operate" slot-scope="scope">
          <el-tooltip class="item m-l-10" content="重置密码" effect="dark" placement="top" v-permiss="'resetUser'">
            <!-- <i @click="redeploy(scope.data)" class="el-icon el-icon-view pointer com-link"></i> -->
            <svg-icon @click="updatePass(scope.data)" class="pointer obit-link" icon-class="reset" />
          </el-tooltip>
        </span>
      </obit-table>
      <div class="obit-pager">
        <el-pagination
          :current-page="searchParams.pageNum"
          :page-size="searchParams.pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <userAdd :addType="addType" :detailsInfo="detailsInfo" :visible.sync="addVisable" @reload="reload"></userAdd>
    <updatePassword :updateVisable.sync="updateVisable" :userId="userId" @reloadUp="reloadUp"></updatePassword>
  </div>
</template>

<script>
import pagerMix from '@/common-modules/mixin/pagerMix'
import userAdd from './userAdd'
import updatePassword from './updatePassword'

export default {
  components: { userAdd, updatePassword },
  mixins: [pagerMix],
  data() {
    return {
      tableColumns: [
        { prop: 'account', label: '账号' },
        { prop: 'userName', label: '用户名称' },
        { prop: 'userCode', label: '用户编码' },
        { prop: 'orgName', label: '机构' },
        { prop: 'roleName', label: '角色' }
      ],
      orgList: [],
      params: {
        userType: 1
      },
      // 新增编辑相关
      addVisable: false,
      //密码重置相关
      updateVisable: false,
      addType: 'add',
      detailsInfo: {},
      userId: 0
    }
  },
  mounted() {
    this.tableRequest = 'getSystemUserList'
    this.queryDataList()
    this.getOrgList()
  },
  methods: {
    todetails(item) {
      this.$message({
        type: 'success',
        message: item.name
      })
    },
    //获取组织树
    getOrgList() {
      let data = {}
      this.$http.getAllOrgTree().then(res => {
        this.orgList = res
      })
    },
    //删除
    deleteUser(row) {
      let data = {}
      data.userId = row.userId
      this.$confirm('是否删除', '提示')
        .then(() => {
          this.$http.deleteUser(data).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.reload()
          })
        })
        .catch(() => {})
    },
    addDialog() {
      this.addVisable = true
      this.addType = 'add'
    },
    editDialog(item) {
      this.detailsInfo = item
      this.addVisable = true
      this.addType = 'edit'
    },
    reload() {
      this.tableRequest = 'getSystemUserList'
      this.queryDataList()
      this.getOrgList()
    },
    updatePass(row) {
      this.updateVisable = true
      this.userId = row.userId
    },
    reloadUp() {
      this.updateVisable = false
    }
  }
}
</script>

<style lang="scss">
</style>