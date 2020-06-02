<!--
 * @Author: 曹捷
 * @Date: 2020-04-14 10:12:47
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-02 16:20:08
 * @Description: file content
 -->

 <template>
  <div class="obit-main" v-loading="loading">
    <title-wrap title="菜单管理"></title-wrap>
    <div class="obit-search t-r">
      <span class="p-r-10">
        <el-button @click="addDialog(0)" class="btn-md" icon="el-icon-plus" type="primary" v-permiss="'menuAdd'">新增菜单</el-button>
      </span>
    </div>
    <obit-table-tree
      :childrenNum="'childrenNum'"
      :data-list="treeData"
      :expanded="'open'"
      :left="10"
      :name="'menuName'"
      :page="10"
      class="table"
      id="menuId"
      title="菜单名称"
      v-if="treeData.length>0"
    >
      <div slot="类型" slot-scope="{item}">{{item.permissionType|pressType}}</div>
      <div slot="编码" slot-scope="{item}">{{item.menuCode}}</div>
      <div slot="路径" slot-scope="{item}">{{item.path}}</div>

      <div slot="图标" slot-scope="{item}">
        <svg-icon :icon-class="item.iconname" v-if="item.iconname" />
      </div>
      <div slot="排序" slot-scope="{item}">{{item.orderNum}}</div>

      <div slot="操作" slot-scope="{item,keys}">
        <el-tooltip class="item" content="新增菜单或者权限" effect="dark" placement="top" v-if="item.permissionType===1" v-permiss="'menuAddChild'">
          <i @click="addDialog(item.menuId)" class="el-icon el-icon-folder-add pointer obit-link p-r-10"></i>
        </el-tooltip>
        <el-tooltip class="item" content="编辑" effect="dark" placement="top" v-permiss="'menuEdit'">
          <i @click="editDialog(item)" class="el-icon el-icon-setting pointer obit-link p-r-10"></i>
        </el-tooltip>
        <el-tooltip class="item" content="删除" effect="dark" placement="top" v-permiss="'menuRemove'">
          <i @click="deleteMenu(item,keys)" class="el-icon el-icon-delete pointer obit-link"></i>
        </el-tooltip>
      </div>
    </obit-table-tree>

    <menuAdd :addType="addType" :detailsInfo="detailsInfo" :visible.sync="addVisable" @reload="initTree"></menuAdd>
  </div>
</template>
 
 <script>
import obitTableTree from '@/common-modules/components/obit-table-tree'
import menuAdd from './menuAdd'
export default {
  components: { obitTableTree, menuAdd },
  data() {
    return {
      loading: false,
      params: {},
      treeData: [],
      addVisable: false,
      detailsInfo: {},
      addType: 'add'
    }
  },
  filters: {
    pressType(value) {
      return value === 1 ? '菜单' : '权限'
    }
  },
  methods: {
    initTree() {
      this.$http.getSystemPermissionList().then(res => {
        this.treeData = res
      })
    },
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
    deleteMenu(row) {
      let data = {}
      data.menuId = row.menuId
      this.$confirm('是否删除', '提示')
        .then(() => {
          this.$http.removeMenu(data).then(res => {
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
