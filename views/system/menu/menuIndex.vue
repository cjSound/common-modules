<!--
 * @Author: 曹捷
 * @Date: 2020-04-14 10:12:47
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-05-07 15:43:31
 * @Description: file content
 -->

 <template>
  <div class="com-main" v-loading="loading">
    <title-wrap title="菜单管理"></title-wrap>
    <div class="com-search">
      <comApp @change="initTree" v-model="params.appId"></comApp>
      <span class="f-r p-r-10">
        <el-button @click="initTree" class="btn-md" icon="el-icon-search" type="primary">搜索</el-button>

        <el-button @click="addDialog(0)" class="btn-md" icon="el-icon-plus" type="primary" v-permiss="'menuAdd'">新增菜单</el-button>
      </span>
    </div>
    <com-table-tree
      :childrenNum="'childrenNum'"
      :data-list="treeData"
      :expanded="'open'"
      :left="10"
      :name="'menuName'"
      :page="10"
      :widths="widths"
      class="table"
      id="menuId"
      title="菜单名称"
      v-if="treeData && treeData.length>0"
    >
      <div slot="类型" slot-scope="{item}">{{item.menuType|pressType}}</div>
      <div slot="编码" slot-scope="{item}">{{item.menuCode}}</div>
      <div slot="API类型" slot-scope="{item}">{{item.apiMethod|apiMethodName}}</div>
      <div slot="路径" slot-scope="{item}">{{item.apiUrl}}</div>

      <div slot="图标" slot-scope="{item}">
        <svg-icon :icon-class="item.iconClass" v-if="item.iconClass" />
      </div>
      <div slot="排序" slot-scope="{item}">{{item.orderNum}}</div>
      <div slot="描述" slot-scope="{item}">{{item.remark}}</div>

      <div slot="操作" slot-scope="{item,keys}">
        <el-tooltip class="item" content="新增菜单或者权限" effect="dark" placement="top" v-if="item.menuType===0" v-permiss="'menuAdd'">
          <i @click="addDialog(item.id)" class="el-icon el-icon-folder-add pointer com-link p-r-10"></i>
        </el-tooltip>
        <el-tooltip class="item" content="编辑" effect="dark" placement="top" v-permiss="'menuUpdate'">
          <i @click="editDialog(item)" class="el-icon el-icon-setting pointer com-link p-r-10"></i>
        </el-tooltip>
        <el-tooltip class="item" content="删除" effect="dark" placement="top" v-permiss="'menuDelete'">
          <i @click="deleteMenu(item,keys)" class="el-icon el-icon-delete pointer com-link"></i>
        </el-tooltip>
      </div>
    </com-table-tree>
    <nodata v-else></nodata>

    <menuAdd :addType="addType" :detailsInfo="detailsInfo" :visible.sync="addVisable" @reload="initTree"></menuAdd>
  </div>
</template>
 
 <script>
import comTableTree from '@/components/com-table-tree/table-tree'
import comApp from './../components/com-app/com-app'
import menuAdd from './menuAdd'
export default {
  components: { comTableTree, menuAdd, comApp },
  data() {
    return {
      loading: false,
      params: {},
      treeData: [],
      addVisable: false,
      detailsInfo: {},
      addType: 'add',
      widths: [
        '300px',
        '100px',
        '300px',
        '150px',
        '340px',
        '100px',
        '60px',
        '260px',
        '150px'
      ]
    }
  },
  filters: {
    pressType(value) {
      return value === 0 ? '菜单' : '权限'
    },
    apiMethodName(value) {
      let info = {
        1: 'POST',
        2: 'GET',
        3: 'PUT',
        4: 'DELETE'
      }
      return info[value]
    }
  },
  methods: {
    initTree() {
      this.$http.getMenuTree(this.params).then(res => {
        this.treeData = res
      })
    },
    addDialog(id) {
      if (!this.params.appId) {
        this.$message({
          type: 'error',
          message: '请先选择应用'
        })
        return
      }
      this.detailsInfo = {
        appId: this.params.appId,
        parentId: id ? id : 0
      }
      this.addVisable = true
      this.addType = 'add'
    },
    editDialog(item) {
      this.detailsInfo = item
      this.addVisable = true
      this.addType = 'edit'
    },
    deleteMenu(row) {
      let data = {}
      data.menuId = row.id
      this.$confirm('是否删除', '提示')
        .then(() => {
          this.$http.removeSystemMenu(data).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.initTree()
          })
        })
        .catch(() => {})
    }
  },
  mounted() {
    this.initTree()
  }
}
</script>
 
 <style lang="scss">
.table-tree {
  color: $tableColor;
}
</style>
