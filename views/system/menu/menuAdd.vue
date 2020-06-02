<!--
 * @Author: 刘硕
 * @Date: 2019-08-19 14:45:40
 * @LastEditors: 刘硕
 * @LastEditTime: 2020-04-18 14:24:24
 * @Description: file content
 -->
<template>
  <div v-if="visible">
    <el-dialog :close-on-click-modal="false" :title="showTitle" :visible.sync="addVisible" @closed="closeDialog" width="40%">
      <el-form :inline="true" :model="formData" :rules="rules" class="obit-form-100" ref="formData">
        <el-form-item label="名称" prop="menuName">
          <el-input placeholder="请输入菜单或者权限名称" v-model="formData.menuName"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="menuCode">
          <el-input placeholder="请输入编码" v-model="formData.menuCode"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="permissionType">
          <obitDict :dictCode="'permissionType'" :disabled="addType==='edit'" placeholder="请选择新增菜单或者权限" v-model="formData.permissionType"></obitDict>
        </el-form-item>
        <el-form-item label="图标" prop="iconname" v-if="formData.permissionType == 1">
          <el-input placeholder="请输入图标" v-model="formData.iconname"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input placeholder="请输入菜单路径" v-model="formData.path"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input placeholder="请输入菜单排序" v-model="formData.orderNum"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="onSubmit" type="primary">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pagerMix from '@/common-modules/mixin/pagerMix'
import util from '@/common-modules/utils/utils'

export default {
  mixins: [pagerMix],
  props: {
    visible: {
      type: Boolean
    },
    addType: {
      type: String
    },
    detailsInfo: {
      type: Object
    }
  },
  data() {
    return {
      formData: {},
      activeName: 'add',
      addVisible: this.visible,
      rules: {
        menuName: [
          { required: true, message: '请输入菜单或者权限名称', trigger: 'blur' }
        ],
        menuCode: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        permissionType: [
          {
            required: true,
            message: '请选择新增菜单或者权限',
            trigger: 'change'
          }
        ],
        iconname: [
          { required: true, message: '请选择菜单对应图标', trigger: 'blur' }
        ],
        path: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showTitle() {
      return this.addType === 'add' ? '新增菜单' : '修改菜单'
    }
  },
  watch: {
    visible(value) {
      if (value) {
        this.$set(this, 'formData', util.util.cloneObj(this.detailsInfo))
      } else {
        util.util.cleanObj(this.formData)
      }
      this.addVisible = value
    }
  },
  mounted() {},
  methods: {
    //保存
    onSubmit() {
      if (this.activeName === 'add') {
        this.$refs['formData'].validate(valid => {
          if (valid) {
            let param = util.util.cloneObj(this.formData)
            this.$http.saveMenu(param).then(res => {
              this.$message({
                type: 'success',
                message: this.addType === 'add' ? '新增成功' : '修改成功'
              })
              this.$emit('reload')
              this.closeDialog()
            })
          } else {
            return false
          }
        })
      }
    },
    closeDialog() {
      util.util.cleanObj(this.formData)
      this.activeName = 'add'
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss">
</style>