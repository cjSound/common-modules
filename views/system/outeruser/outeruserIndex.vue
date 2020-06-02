<!--
 * @Author: 曹捷
 * @Date: 2020-04-26 09:19:48
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-05-07 15:48:02
 * @Description: 供应商管理
 -->
<template>
  <div class="com-main" v-loading="loading">
    <title-wrap title="供应商管理"></title-wrap>
    <div class="com-search">
      <comApp @change="queryDataList(true)" v-model="params.appId"></comApp>
      <el-input @change="queryDataList(true)" class="input-md" placeholder="供应商名称" v-model="params.supplierName"></el-input>
      <el-input @change="queryDataList(true)" class="input-md" placeholder="供应商代码" v-model="params.supplierCode"></el-input>
      <el-input @change="queryDataList(true)" class="input-md" placeholder="联系人名称" v-model="params.contactUserName"></el-input>
      <el-input @change="queryDataList(true)" class="input-md" placeholder="联系人电话" v-model="params.contactUserTel"></el-input>

      <span class="f-r p-r-10">
        <el-button @click="queryDataList" class="btn-md" icon="el-icon-search" type="primary">搜索</el-button>
        <el-button @click="addDialog" class="btn-md" icon="el-icon-plus" type="primary" v-permiss="'outeruserAdd'">新增</el-button>
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
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" content="编辑" effect="dark" placement="top" v-permiss="'outeruserChange'">
              <i @click="editDialog(scope.row)" class="el-icon el-icon-setting pointer com-link p-r-10"></i>
            </el-tooltip>
            <el-tooltip class="item" content="删除" effect="dark" placement="top" v-permiss="'outeruserDelete'">
              <i @click="deleteUser(scope.row)" class="el-icon el-icon-delete pointer com-link"></i>
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
    <outeruserAdd :addType="addType" :detailsInfo="detailsInfo" :visible.sync="addVisable" @reload="reload"></outeruserAdd>
  </div>
</template>

<script>
import pagerMix from '@/common-modules/mixin/pagerMix'
import comApp from './../components/com-app/com-app'
import outeruserAdd from './outeruserAdd'
export default {
  components: { outeruserAdd, comApp },
  mixins: [pagerMix],
  data() {
    return {
      dictUserTypeList: [
        { dictName: '内部员工', id: 0 },
        { dictName: '外部（供应商）', id: 1 }
      ],
      tableColumns: [
        { prop: 'supplierName', label: '供应商名称' },
        { prop: 'abbreviation', label: '简称' },
        { prop: 'supplierCode', label: '代码' },
        { prop: 'appName', label: '所属应用' },
        { prop: 'materialName', label: '物料名称' },
        { prop: 'contactUserTel', label: '联系人手机' },
        { prop: 'contactUserEmail', label: '联系人邮件' },
        { prop: 'contactUserName', label: '联系人姓名' }
      ],
      params: {},
      // 新增编辑相关
      addVisable: false,
      addType: 'add',
      detailsInfo: {},
      userId: 0
    }
  },
  mounted() {
    this.tableRequest = 'getOuteruserPage'
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
      let data = {
        id: row.id
      }
      this.$confirm('是否删除', '提示')
        .then(() => {
          this.$http.removeOuterUserinfo(data).then(res => {
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
    }
  }
}
</script>

<style lang="scss">
</style>