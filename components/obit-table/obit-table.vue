<!--
 * @Author: 曹捷
 * @Date: 2020-05-17 11:39:56
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-07-03 11:21:45
 * @Description: file content
--> 
<template>
  <el-table :border="tableBorder" :data="dataList" :style="{width:width}" @selection-change="handleSelectionChange" class="com-table">
    <el-table-column type="selection" v-if="$listeners.selectionChange" width="55"></el-table-column>
    <el-table-column :label="indexName" type="index" v-if="indexName !==null" width="50"></el-table-column>
    <el-table-column
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
    </el-table-column>
    <!-- 默认操作列 有编辑删除 查看三个按钮 额外需要新增的可以采用slot=operate -->
    <el-table-column
      :width="operationWidth"
      align="center"
      fixed="right"
      label="操作"
      v-if="$listeners.editEven || $listeners.deleteEven || $listeners.lookEven"
    >
      <template slot-scope="scope">
        <el-tooltip class="item" content="修改" effect="dark" placement="top" v-if="$listeners.editEven" v-permiss="editPermiss">
          <i @click="clickEvent(scope.row,'editEven')" class="el-icon el-icon-setting pointer obit-link p-r-10"></i>
        </el-tooltip>
        <el-tooltip class="item" content="删除" effect="dark" placement="top" v-if="$listeners.deleteEven" v-permiss="deletePermiss">
          <i @click="clickEvent(scope.row,'deleteEven')" class="el-icon el-icon-delete pointer obit-link"></i>
        </el-tooltip>
        <el-tooltip class="item" content="查看详情" effect="dark" placement="top" v-if="$listeners.lookEven" v-permiss="deletePermiss">
          <i @click="clickEvent(scope.row,'lookEven')" class="el-icon el-icon-view pointer obit-link"></i>
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
export default {
  props: {
    dataList: {
      type: Array,
      default: function() {
        return []
      }
    },
    tableColumns: {
      type: Array,
      required: true
    },
    hasSelection: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: config.tableAlign ? config.tableAlign : 'left'
    },
    minWidth: {
      type: String,
      default: '80px'
    },
    /**
     * 操作列 宽度
     */
    operationWidth: {
      type: String,
      default: '80'
    },
    width: {
      type: String,
      default: '100%'
    },
    /**
     * 编辑按钮的权限key
     */
    editPermiss: {
      type: String,
      default: 'no'
    },
    /**
     * 删除按钮的权限key
     */
    deletePermiss: {
      type: String,
      default: 'no'
    },
    indexName: {
      type: String,
      default: null
    },
    tableBorder: {
      type: Boolean,
      default: config.tableBorder ? config.tableBorder : false
    }
  },
  mounted() {
    // console.log(this.$scopedSlots, this)
  },
  methods: {
    // 多选 将id 存入handleSelectionList 集合
    handleSelectionChange(item) {
      // let arr = []
      // item.forEach(element => {
      //   arr.push(element[this.handleSelectionKey])
      // })
      // this.handleSelectionList = arr
      this.$emit('selectionChange', item)
    },
    clickEvent(item, eventKey) {
      this.$emit(eventKey, item)
    }
  }
}
</script>

<style>
</style>