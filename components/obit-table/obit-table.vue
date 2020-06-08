<!--
 * @Author: 曹捷
 * @Date: 2020-05-17 11:39:56
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-08 11:21:12
 * @Description: file content
--> 
<template>
  <el-table :data="dataList" :style="{width:width}" @selection-change="handleSelectionChange" class="com-table">
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
    <el-table-column align="center" fixed="right" label="操作" v-if="$listeners.editEven || $listeners.deleteEven || $listeners.lookEven" width="100">
      <template slot-scope="scope">
        <el-tooltip class="item" content="修改" effect="dark" placement="top" v-if="$listeners.editEven" v-permiss="editPermiss">
          <i @click="clickEvent(scope.row,'editEven')" class="el-icon el-icon-setting pointer com-link p-r-10"></i>
        </el-tooltip>
        <el-tooltip class="item" content="删除" effect="dark" placement="top" v-if="$listeners.deleteEven" v-permiss="deletePermiss">
          <i @click="clickEvent(scope.row,'deleteEven')" class="el-icon el-icon-delete pointer com-link"></i>
        </el-tooltip>
        <el-tooltip class="item" content="查看详情" effect="dark" placement="top" v-if="$listeners.lookEven" v-permiss="deletePermiss">
          <i @click="clickEvent(scope.row,'lookEven')" class="el-icon el-icon-view pointer com-link"></i>
        </el-tooltip>
        <slot name="operate"></slot>
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
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
      default: 'left'
    },
    minWidth: {
      type: String,
      default: '80px'
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
    }
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