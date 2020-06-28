<!--
 * @Author: 曹捷
 * @Date: 2019-08-20 20:25:19
 * @LastEditors: 刘硕
 * @LastEditTime: 2020-06-28 10:06:07
 * @Description: file content
 -->
<template>
  <div class="obit-main obit-main-fill" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="11">
        <contentForm :fromtitle="{title1:'字典类型',title2:'数据字典类型'}">
          <div class="obit-search">
            <el-input @change="queryDataList(true)" class="input-md" placeholder="字典类型" v-model="params.codeField"></el-input>
            <el-input @change="queryDataList(true)" class="input-md" placeholder="字典描述" v-model="params.codeDesc"></el-input>
            <span class="f-r">
              <el-button @click="addDialog" class="btn-md" icon="el-icon-plus" type="primary" v-permiss="'addDict'">新增</el-button>
            </span>
          </div>
          <el-table :data="dataList" @current-change="dictsChange" class="obit-table" highlight-current-row style="width: 100%">
            <el-table-column :key="column.prop" :label="column.label" :min-width="column.minWidth" v-for="column in tableColumns">
              <template slot-scope="scope">
                <el-tooltip :content="scope.row[column.prop]" class="item" effect="dark" placement="top">
                  <span>{{scope.row[column.prop] || "-"}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-tooltip class="item" content="操作" effect="dark" placement="top" v-permiss="'editDict'">
                  <i @click="editDialog(scope.row)" class="el-icon el-icon-setting obit-link p-r-10"></i>
                </el-tooltip>
                <el-tooltip class="item" content="删除" effect="dark" placement="top" v-permiss="'removeDict'">
                  <i @click="removeInfo(scope.row)" class="el-icon el-icon-delete pointer obit-link"></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </contentForm>
      </el-col>
      <el-col :span="13">
        <contentForm :fromtitle="{title1:'字典值',title2:'数据字典类型值'}">
          <div class="obit-search">
            <span class="f-r">
              <el-button @click="addDialogValue" class="btn-md" icon="el-icon-plus" type="primary">新增</el-button>
            </span>
          </div>
          <el-table :data="dictValueList" class="obit-table" style="width: 100%">
            <el-table-column :key="column.prop" :label="column.label" :min-width="column.minWidth" v-for="column in dictColumns">
              <template slot-scope="scope">
                <el-tooltip :content="scope.row[column.prop]" class="item" effect="dark" placement="top">
                  <span>{{scope.row[column.prop] || "-"}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-tooltip class="item" content="操作" effect="dark" placement="top">
                  <i @click="editDialogValue(scope.row)" class="el-icon el-icon-setting obit-link p-r-10"></i>
                </el-tooltip>
                <el-tooltip class="item" content="删除" effect="dark" placement="top">
                  <i @click="removeInfoValue(scope.row)" class="el-icon el-icon-delete pointer obit-link"></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </contentForm>
      </el-col>
    </el-row>
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
    <dictAdd :addType="addType" :detailsInfo="detailsInfo" :visible.sync="addVisable" @reload="queryDataList(true)"></dictAdd>
    <dictValueAdd
      :addType="addValueType"
      :detailsInfo="valueDetailsInfo"
      :selectCode="selectCode"
      :visible.sync="addValueVisable"
      @reload="getSysdictValue"
    ></dictValueAdd>
  </div>
</template>

<script>
import pagerMix from '@/common-modules/mixin/pagerMix'
import dictAdd from './dictAdd'
import dictValueAdd from './dictValueAdd'
export default {
  components: { dictAdd, dictValueAdd },
  mixins: [pagerMix],
  data() {
    return {
      tableColumns: [
        { prop: 'codeField', label: '字典名称' },
        { prop: 'codeDesc', label: '字典描述' }
      ],
      dictColumns: [
        { prop: 'codeField', label: '父字典编码' },
        { prop: 'codeValue', label: '编码值' },
        { prop: 'valueDesc', label: '值描述' }
      ],
      // 父字典新增编辑相关
      addVisable: false,
      addType: 'add',
      detailsInfo: {},
      // 子字典值新增编辑相关
      addValueVisable: false,
      addValueType: 'add',
      valueDetailsInfo: {},
      // end
      selectCode: '',
      dictValueList: []
    }
  },
  mounted() {
    this.tableRequest = 'getSysDictList'
    this.queryDataList()
  },
  methods: {
    // 父字典新增和编辑相关  --------------start --------------------------
    addDialog() {
      this.addVisable = true
      this.addType = 'add'
    },
    editDialog(item) {
      this.detailsInfo = item
      this.addVisable = true
      this.addType = 'edit'
    },
    removeInfo(item) {
      this.$confirm('是否删除', '提示')
        .then(() => {
          this.$http.removeSysDict({ codeField: item.codeField }).then(res => {
            this.queryDataList()
            this.$message.success('删除成功!')
          })
        })
        .catch(() => {})
    },
    // 父字典新增和编辑相关   -------------------end-------------------
    // 选择字典
    dictsChange(val) {
      if (val) {
        this.selectCode = val.codeField
        this.getSysdictValue()
      }
    },
    getSysdictValue() {
      if (this.selectCode) {
        this.$http
          .getCommonDictValueList({ codeField: this.selectCode })
          .then(res => {
            this.dictValueList = res
          })
      }
    },
    // 子字典新增和编辑相关  --------------start --------------------------
    addDialogValue() {
      if (this.selectCode) {
        this.addValueVisable = true
        this.addValueType = 'add'
      } else {
        this.$message.error('请选择字典类型')
      }
    },
    editDialogValue(item) {
      this.valueDetailsInfo = item
      this.addValueVisable = true
      this.addValueType = 'edit'
    },
    removeInfoValue(item) {
      this.$confirm('是否删除', '提示')
        .then(() => {
          this.$http.removeSysDictValue({ id: item.id }).then(res => {
            this.getSysdictValue()
            this.$message.success('删除成功!')
          })
        })
        .catch(() => {})
    }
    // 子字典新增和编辑相关   -------------------end-------------------
  }
}
</script>

<style>
</style>