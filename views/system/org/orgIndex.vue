<!--
 * @Author: 曹捷
 * @Date: 2019-08-13 10:49:35
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-02 16:25:22
 * @Description: 机构管理
 -->
<template>
  <div class="obit-main obit-main-fill" v-loading="loading">
    <title-wrap title="机构管理"></title-wrap>
    <div class="obit-search t-r">
      <span class="p-r-10">
        <el-button @click="addDialog(0)" class="btn-md" icon="el-icon-plus" type="primary" v-permiss="'addOrg'">新增</el-button>
      </span>
    </div>
    <div class="obit-content">
      <obit-table-tree
        :data-list="orgList"
        :expanded="'open'"
        :left="10"
        :name="'organizationName'"
        :page="10"
        class="table"
        id="organizationId"
        title="机构名称"
        v-if="orgList.length>0"
      >
        <div slot="机构编码" slot-scope="{item}">{{item.organizationCode}}</div>
        <div slot="简称" slot-scope="{item}">{{item.shortName}}</div>
        <div slot="地址" slot-scope="{item}">{{item.address}}</div>

        <div slot="联系人" slot-scope="{item}">{{item.concatName}}</div>
        <div slot="电话" slot-scope="{item}">{{item.phone}}</div>
        <div slot="描述" slot-scope="{item}">{{item.orgDesc}}</div>

        <div slot="操作" slot-scope="{item,keys}">
          <el-tooltip class="item" content="新增下级机构" effect="dark" placement="top" v-permiss="'menuAddChild'">
            <i @click="addDialog(item.organizationId)" class="el-icon el-icon-folder-add pointer obit-link p-r-10"></i>
          </el-tooltip>
          <el-tooltip class="item" content="编辑" effect="dark" placement="top" v-permiss="'editOrg'">
            <i @click="editDialog(item)" class="el-icon el-icon-setting pointer obit-link p-r-10"></i>
          </el-tooltip>
          <el-tooltip class="item" content="删除" effect="dark" placement="top" v-permiss="'removeOrg'">
            <i @click="remove(item,keys)" class="el-icon el-icon-delete pointer obit-link"></i>
          </el-tooltip>
        </div>
      </obit-table-tree>
    </div>
    <orgAdd :addType="addType" :detailsInfo="detailsInfo" :visible.sync="addVisable" @reload="getOrgList"></orgAdd>
  </div>
</template>

<script>
import pagerMix from '@/common-modules/mixin/pagerMix'
import obitTableTree from '@/common-modules/components/obit-table-tree'
import util from '@/common-modules/utils/utils'
import orgAdd from './orgAdd'
export default {
  components: { orgAdd, obitTableTree },
  mixins: [pagerMix],
  data() {
    return {
      tableColumns: [
        { prop: 'organizationName', label: '机构名称' },
        { prop: 'organizationCode', label: '机构编码' },
        { prop: 'shortName', label: '简称' },
        { prop: 'address', label: '地址' },
        { prop: 'concatName', label: '联系人' },
        { prop: 'phone', label: '电话' },
        { prop: 'orgDesc', label: '描述' }
      ],
      // 新增编辑相关
      addVisable: false,
      addType: 'add',
      detailsInfo: {},
      orgList: []
    }
  },
  mounted() {
    this.getOrgList()
  },
  methods: {
    // 机构新增和编辑相关  --------------start --------------------------
    addDialog(id) {
      this.detailsInfo = {
        parentId: id
      }

      this.addVisable = true
      this.addType = 'add'
    },
    editDialog(item) {
      this.detailsInfo = item
      this.addVisable = true
      this.addType = 'edit'
    },
    remove(item) {
      this.$confirm('是否删除', '提示')
        .then(() => {
          this.$http
            .removeSystemOrg({ orgId: item.organizationId })
            .then(res => {
              this.getOrgList()
              this.$message.success('删除成功!')
            })
        })
        .catch(() => {})
    },
    // 机构新增和编辑相关   -------------------end-------------------
    getOrgList() {
      let data = {}
      this.$http.getAllOrgTree().then(res => {
        this.orgList = res
      })
    }
  }
}
</script>

<style lang="scss">
.table-tree {
  color: $tableColor;
}
</style>