<!--
 * @Author: 刘硕
 * @Date: 2019-08-19 09:34:05
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-05-08 19:31:41
 * @Description: 用户查询
 -->
<template>
  <div class="com-main" v-loading="loading">
    <title-wrap title="用户管理"></title-wrap>
    <div class="com-search">
      <com-org placeholder="请选择机构" v-model="params.org"></com-org>
      <el-select @change="queryDataList(true)" class="input-md" clearable filterable placeholder="请选择用户类型" v-model="params.userType">
        <el-option :key="item.id" :label="item.dictName" :value="item.id" v-for="item in dictUserTypeList"></el-option>
      </el-select>
      <el-input @change="queryDataList(true)" class="input-md" placeholder="用户域账号" v-model="params.username"></el-input>

      <el-input @change="queryDataList(true)" class="input-md" placeholder="用户工号" v-model="params.userNo"></el-input>
      <el-input @change="queryDataList(true)" class="input-md" placeholder="用户姓名" v-model="params.realName"></el-input>

      <span class="f-r p-r-10">
        <el-button @click="queryDataList" class="btn-md" icon="el-icon-search" type="primary">搜索</el-button>
        <el-button @click="addDialog" class="btn-md" icon="el-icon-plus" type="primary" v-permiss="'userAdd'">新增</el-button>
      </span>
    </div>
    <div class="com-content">
      <el-table :data="dataList" class="com-table" style="width: 100%">
        <el-table-column :key="column.prop" :label="column.label" :min-width="column.minWidth" v-for="column in tableColumns">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row[column.prop]" class="item" effect="dark" placement="top">
              <span>{{scope.row[column.prop] || "-"}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <span>{{scope.row.firstName || '-'}}{{scope.row.lastName || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" content="重置密码" effect="dark" placement="top" v-permiss="'userPassword'">
              <svg-icon @click="updatePass(scope.row)" class="m-r-10 com-link" icon-class="reset" />
            </el-tooltip>
            <el-tooltip class="item" content="绑定角色" effect="dark" placement="top" v-permiss="'bindUserRole'">
              <svg-icon @click="updateRole(scope.row)" class="m-r-10 com-link" icon-class="peoples" />
            </el-tooltip>
            <el-tooltip class="item" content="绑定应用" effect="dark" placement="top" v-permiss="'userBindAPP'">
              <svg-icon @click="updateAppInfo(scope.row)" class="m-r-10 com-link" icon-class="w-app" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="com-pager">
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
    <updateUserRole :updateVisable.sync="updateRoleVisable" :userId="userId"></updateUserRole>
    <updateApp :updateVisable.sync="updateAppVisable" :userId="userId"></updateApp>
  </div>
</template>

<script>
import pagerMix from '@/common-modules/mixin/pagerMix'
import userAdd from './userAdd'
import updatePassword from './updatePassword'
import updateUserRole from './updateUserRole'
import updateApp from './updateApp'
export default {
  components: { userAdd, updatePassword, updateUserRole, updateApp },
  mixins: [pagerMix],
  data() {
    return {
      dictUserTypeList: [
        { dictName: '内部员工', id: 0 },
        { dictName: '外部（供应商）', id: 1 }
      ],
      tableColumns: [
        { prop: 'userId', label: '用户域账号' },
        { prop: 'userNo', label: '用户工号' },
        { prop: 'orgName', label: '机构' },
        { prop: 'positionText', label: '岗位' },
        { prop: 'mobile', label: '手机' }
      ],
      params: {},
      // 新增编辑相关
      addVisable: false,
      //密码重置相关
      updateVisable: false,
      updateRoleVisable: false,
      updateAppVisable: false,
      addType: 'add',
      detailsInfo: {},
      userId: 0
    }
  },
  mounted() {
    this.tableRequest = 'getUserPageList'
    this.reload()
  },
  methods: {
    todetails(item) {
      this.$message({
        type: 'success',
        message: item.name
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
      this.queryDataList()
    },
    updatePass(row) {
      this.updateVisable = true
      this.userId = row.id
    },
    updateRole(row) {
      this.userId = row.id
      this.updateRoleVisable = true
    },
    updateAppInfo(row) {
      this.userId = row.id
      this.updateAppVisable = true
    },
    reloadUp() {
      this.updateVisable = false
    }
  }
}
</script>

<style lang="scss">
</style>