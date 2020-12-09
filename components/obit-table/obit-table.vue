<!--
 * @Author: 曹捷
 * @Date: 2020-05-17 11:39:56
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-09 15:47:52
 * @Description: 表格统一处理 示例如下
--> 
<!--
传参demos
tableColumns: [
        // 支持多选，多选触发table  handleCurrentChange 方法
        { label: ' ', type: 'selection' },
        // 支持显示序号，新增如下对象
        { label: '序号 ', type: 'index' },
        // 自定义过滤转换
        { prop: 'detailDate', label: '日期', filterType: 'dateM' },
        // 支持表格头合并单元格  示例如下
        {
          label: '一级汇总',
          children: [
            { prop: 'departmentName', label: '部门' },
            {
              label: '事业部',
              children: [
                { prop: 'divisionName', label: '事业部1' },
                { prop: 'agentName', label: '代理商2' },
              ],
            },
            { prop: 'agreementNo', label: '合同号' },
          ],
        },
        // 支持自定义渲染HTML  和绑定点击事件 示例如下
        {
          prop: 'alarmNum', label: '预警', sortable: 'custom', render (item) {
            return `<span class="obit-link">${item.alarmNum}</span>`
          }, click (event, data, item) {
            console.log('item: ', data);
          }
        },
        // 对字段进行自定义排序  custom 后端排序 触发表格sortChange方法
        { prop: 'createTime', label: '导入时间' ,sortable:'custom'},
      ],
--> 
<template>
  <el-table @sort-change="sortChange" :border="tableBorder" :data="dataList" :style="{width:width}"
    @current-change="handleCurrentChange" @selection-change="handleSelectionChange" class="com-table"
    :max-height="maxHeight" highlight-current-row>
    <!-- <el-table-column type="selection" v-if="$listeners.selectionChange" width="55"></el-table-column> -->
    <!-- <el-table-column :label="indexName" type="index" v-if="indexName !==null" width="50"></el-table-column> -->
    <tableColumn :tableColumnItem="tableColumns"></tableColumn>

    <!-- <el-table-column
      :align="align"
      :key="column.prop"
      :label="column.label"
      :min-width="minWidth"
      :width="column.width"
      v-for="column in tableColumns"
    >
      <template slot-scope="scope">
        <el-tooltip :content="column.render ? column.render(scope.row) +'':scope.row[column.prop]+''" class="item" effect="dark" placement="top">
          <span>{{column.render ? column.render(scope.row) :scope.row[column.prop] |valueType(column.filterType)}}</span>
        </el-tooltip>
      </template>
    </el-table-column>-->
    <!-- 默认操作列 有编辑删除 查看三个按钮 额外需要新增的可以采用slot=operate -->
    <el-table-column :width="operationWidth" align="center" fixed="right" label="操作"
      v-if="$listeners.editEven || $listeners.deleteEven || $listeners.lookEven">
      <template slot-scope="scope">
        <el-tooltip class="item" content="查看详情" effect="dark" placement="top" v-if="$listeners.lookEven"
          v-permiss="deletePermiss">
          <i @click="clickEvent(scope.row,'lookEven')" class="el-icon el-icon-view pointer obit-link p-r-10"></i>
        </el-tooltip>
        <el-tooltip class="item" content="修改" effect="dark" placement="top" v-if="$listeners.editEven"
          v-permiss="editPermiss">
          <i @click="clickEvent(scope.row,'editEven')" class="el-icon el-icon-setting pointer obit-link p-r-10"></i>
        </el-tooltip>
        <el-tooltip class="item" content="删除" effect="dark" placement="top" v-if="$listeners.deleteEven"
          v-permiss="deletePermiss">
          <i @click="clickEvent(scope.row,'deleteEven')" class="el-icon el-icon-delete pointer obit-link"></i>
        </el-tooltip>
        <slot :data="scope.row" name="operate"></slot>
      </template>
    </el-table-column>
    <!-- 完全自定义操作列内容按钮  直接采用slot=operate-->
    <el-table-column :width="operationWidth" align="center" fixed="right" label="操作" v-else-if="$scopedSlots.operate">
      <template slot-scope="scope">
        <slot :data="scope.row" name="operate"></slot>
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
import config from '@/config/config'
import tableColumn from './table-column.js'
export default {
  components: { tableColumn },
  props: {
    dataList: {
      type: Array,
      default: function () {
        return []
      },
    },
    tableColumns: {
      type: Array,
      required: true,
    },
    hasSelection: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String,
      default: config.tableAlign ? config.tableAlign : 'left',
    },
    minWidth: {
      type: String,
      default: '80px',
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto',
    },
    /**
     * 操作列 宽度
     */
    operationWidth: {
      type: String,
      default: '80',
    },
    width: {
      type: String,
      default: '100%',
    },
    /**
     * 编辑按钮的权限key
     */
    editPermiss: {
      type: String,
      default: 'no',
    },
    /**
     * 删除按钮的权限key
     */
    deletePermiss: {
      type: String,
      default: 'no',
    },
    indexName: {
      type: String,
      default: null,
    },
    tableBorder: {
      type: Boolean,
      default: config.tableBorder ? config.tableBorder : false,
    },
  },
  provide () {
    let props = this._props
    let res = {}
    for (const key in props) {
      res[key] = props[key]
    }
    return res
  },
  methods: {
    // 多选 将id 存入handleSelectionList 集合
    handleSelectionChange (item) {
      // let arr = []
      // item.forEach(element => {
      //   arr.push(element[this.handleSelectionKey])
      // })
      // this.handleSelectionList = arr
      this.$emit('selectionChange', item)
    },
    clickEvent (item, eventKey) {
      this.$emit(eventKey, item)
    },
    handleCurrentChange (item) {
      this.$emit('handleCurrentChange', item)
    },
    /**
     * 排序需求
     */
    sortChange (column) {
      console.log('sortChange -> column', column)
      this.$emit('sortChange', column)

    }
  },
}
</script>

<style>
/** 解决表头和数据不对齐问题*/
.el-table th.gutter {
  display: table-cell !important;
}
</style>