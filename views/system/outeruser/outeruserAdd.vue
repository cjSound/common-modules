<!--
 * @Author: 刘硕
 * @Date: 2019-08-19 14:45:40
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-05-08 20:09:13
 * @Description: file content
 -->
<template>
  <div v-if="visible">
    <el-dialog :close-on-click-modal="false" :title="showTitle" :visible.sync="addVisible" @closed="closeDialog" width="40%">
      <el-form :inline="true" :model="formData" :rules="rules" class="com-form-100" ref="formData">
        <el-form-item label="供应商名称" prop="supplierName">
          <el-input placeholder="请输入供应商名称" v-model="formData.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="简称">
          <el-input placeholder="请输入简称" v-model="formData.abbreviation"></el-input>
        </el-form-item>
        <el-form-item label="供应商编码" prop="supplierCode">
          <el-input placeholder="请输入供应商编码" v-model="formData.supplierCode"></el-input>
        </el-form-item>
        <el-form-item label="所属应用" prop="appId">
          <comApp v-model="formData.appId"></comApp>
        </el-form-item>
        <el-form-item label="物料名称">
          <el-input placeholder="请输入物料名称" v-model="formData.materialName"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="contactUserName">
          <el-input placeholder="请输入联系人姓名" v-model="formData.contactUserName"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机" prop="contactUserTel">
          <el-input placeholder="请输入联系人手机" v-model="formData.contactUserTel"></el-input>
        </el-form-item>
        <el-form-item label="联系人邮件">
          <el-input placeholder="请输入联系人邮件" v-model="formData.contactUserEmail"></el-input>
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
import comApp from './../components/com-app/com-app'
import util from '@/common-modules/utils/utils'

export default {
  components: { comApp },
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
      roleList: [],
      orgList: [],
      activeName: 'add',
      addVisible: this.visible,
      rules: {
        supplierName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' }
        ],
        appId: [{ required: true, message: '请选择应用', trigger: 'change' }],
        supplierCode: [
          { required: true, message: '请输入供应商编码', trigger: 'blur' }
        ],
        contactUserName: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        contactUserTel: [
          { required: true, message: '请输入联系人手机号码', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    showTitle() {
      return this.addType === 'add' ? '新增供应商' : '修改供应商'
    }
  },
  watch: {
    visible(value) {
      if (value && this.addType === 'edit') {
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
            let key =
              this.addType === 'add'
                ? 'saveOuterUserInfo'
                : 'changeOuterUserInfo'
            this.$http[key](param).then(res => {
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