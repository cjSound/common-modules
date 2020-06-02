<!--
 * @Author: 曹捷
 * @Date: 2019-08-13 10:49:35
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-05-07 15:44:47
 * @Description: 机构管理
 -->
<template>
  <div class="com-main" v-loading="loading">
    <title-wrap title="机构管理"></title-wrap>
    <div class="com-search t-r">
      <span class="p-r-10">
        <el-button @click="addDialog(0)" class="btn-md" icon="el-icon-plus" type="primary" v-permiss="'orgAdd'">新增</el-button>
      </span>
    </div>
    <div class="com-content">
      <com-table-tree
        :data-list="orgList"
        :expanded="'open'"
        :left="10"
        :name="'label'"
        :page="10"
        class="table"
        id="id"
        title="机构名称"
        v-if="orgList.length>0"
      >
        <div slot="机构ID" slot-scope="{item}">{{item.orgId}}</div>

        <div slot="简介" slot-scope="{item}">{{item.orgTextEn}}</div>

        <div slot="操作" slot-scope="{item,keys}">
          <el-tooltip class="item" content="新增下级机构" effect="dark" placement="top" v-permiss="'orgAdd'">
            <i @click="addDialog(item.orgId)" class="el-icon el-icon-folder-add pointer com-link p-r-10"></i>
          </el-tooltip>
          <el-tooltip class="item" content="编辑" effect="dark" placement="top" v-permiss="'orgChange'">
            <i @click="editDialog(item)" class="el-icon el-icon-setting pointer com-link p-r-10"></i>
          </el-tooltip>
          <el-tooltip class="item" content="删除" effect="dark" placement="top" v-permiss="'orgDelete'">
            <i @click="remove(item,keys)" class="el-icon el-icon-delete pointer com-link"></i>
          </el-tooltip>
        </div>
      </com-table-tree>
    </div>
    <orgAdd :addType="addType" :detailsInfo="detailsInfo" :visible.sync="addVisable" @reload="getOrgList"></orgAdd>
  </div>
</template>

<script>
import pagerMix from '@/common-modules/mixin/pagerMix'
import comTableTree from '@/components/com-table-tree/table-tree'
import util from '@/common-modules/utils/utils'
import orgAdd from './orgAdd'
export default {
  components: { orgAdd, comTableTree },
  mixins: [pagerMix],
  data() {
    return {
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
        fatherId: id
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
          this.$http.removeOrgInfo({ orgId: item.orgId }).then(res => {
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