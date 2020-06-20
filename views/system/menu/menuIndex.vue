<!--
 * @Author: 曹捷
 * @Date: 2020-04-14 10:12:47
 * @LastEditors: 刘硕
 * @LastEditTime: 2020-06-20 16:49:13
 * @Description: file content
 -->

 <template>
  <div class="obit-main obit-main-fill" v-loading="loading">
    <div class="obit-search t-r">
      <span class="p-r-10">
        <el-button @click="addDialog(0)" class="btn-md" icon="el-icon-plus" type="primary" v-permiss="'menuAdd'">新增</el-button>
      </span>
    </div>
    <div class="obit-content">
      <el-table :data="treeData" :tree-props="{children: 'children' }" border default-expand-all row-key="menuId" style="width: 100%; ">
        <el-table-column label="菜单名称" prop="menuName"></el-table-column>
        <el-table-column label="类型" prop="menuName">
          <template slot-scope="scope">{{scope.row.permissionType|pressType}}</template>
        </el-table-column>
        <el-table-column label="编码" prop="menuCode"></el-table-column>
        <el-table-column label="路径" prop="path" width="300"></el-table-column>
        <el-table-column label="图标">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.iconname" v-if="scope.row.iconname" />
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="orderNum"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" content="新增菜单或者权限" effect="dark" placement="top" v-if="scope.row.permissionType===1" v-permiss="'menuAddChild'">
              <i @click="addDialog(scope.row.menuId)" class="el-icon el-icon-folder-add pointer obit-link p-r-10"></i>
            </el-tooltip>
            <el-tooltip class="item" content="编辑" effect="dark" placement="top" v-permiss="'menuEdit'">
              <i @click="editDialog(scope.row)" class="el-icon el-icon-setting pointer obit-link p-r-10"></i>
            </el-tooltip>
            <el-tooltip class="item" content="删除" effect="dark" placement="top" v-permiss="'menuRemove'">
              <i @click="deleteMenu(scope.row)" class="el-icon el-icon-delete pointer obit-link"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- <obit-table-tree
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
      </obit-table-tree>-->
    </div>

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
