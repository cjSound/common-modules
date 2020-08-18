<!--
 * @Author: 刘硕
 * @Date: 2019-08-19 14:45:40
 * @LastEditors: 刘硕
 * @LastEditTime: 2020-08-18 11:03:19
 * @Description: file content
 -->
<template>
  <div v-if="visible">
    <el-dialog :close-on-click-modal="false" :title="showTitle" :visible.sync="addVisible" @closed="closeDialog" width="40%">
      <el-form :inline="true" :model="formData" :rules="rules" class="obit-form-100" ref="formData">
        <el-form-item label="账号" prop="account">
          <el-input placeholder="请输入账号" v-model="formData.account"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input placeholder="请输入用户名称" v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户编码">
          <el-input placeholder="请输入用户编码" v-model="formData.userCode"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="this.addType == 'add'">
          <el-input placeholder="请输入密码" show-password v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="机构" prop="organizationId">
          <obit-org v-model="formData.organizationId"></obit-org>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select filterable placeholder="请选择角色" v-model="formData.roleId">
            <el-option :key="item.roleId" :label="item.roleName" :value="item.roleId" v-for="item in roleList"></el-option>
          </el-select>
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
import util from '@/common-modules/utils/utils'

export default {
  props: {
    visible: {
      type: Boolean,
    },
    addType: {
      type: String,
    },
    detailsInfo: {
      type: Object,
    },
  },
  data() {
    let checkValue = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'))
      }
      if (this.oldAccount === value) {
        return callback()
      }
      let params = {}
      params.account = value
      this.$http.accountCanUse(params).then((res) => {
        if (res) {
          return callback(new Error('该账号已使用'))
        } else {
          return callback()
        }
      })
    }
    return {
      formData: {},
      roleList: [],
      orgList: [],
      activeName: 'add',
      addVisible: this.visible,
      oldAccount: '',
      rules: {
        account: [{ required: true, validator: checkValue, trigger: 'blur' }],
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        organizationId: [
          { required: true, message: '请选择机构', trigger: 'change' },
        ],
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
      },
    }
  },

  computed: {
    showTitle() {
      return this.addType === 'add' ? '新增用户' : '修改用户'
    },
  },
  watch: {
    visible(value) {
      if (value && this.addType === 'edit') {
        this.$set(this, 'formData', util.util.cloneObj(this.detailsInfo))
        this.oldAccount = this.formData.account
      } else {
        util.util.cleanObj(this.formData)
      }
      this.addVisible = value
    },
  },
  mounted() {
    this.getAllRole()
  },
  methods: {
    //保存
    onSubmit() {
      if (this.activeName === 'add') {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            let param = util.util.cloneObj(this.formData)
            if (this.addType === 'add') {
              param.userType = 1
            }

            this.$http.saveUser(param).then((res) => {
              this.$message({
                type: 'success',
                message: this.addType === 'add' ? '新增成功' : '修改成功',
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
    },
    //获取所有角色
    getAllRole() {
      this.$http.getSystemRoleList().then((res) => {
        this.roleList = res
      })
    },
  },
}
</script>

<style lang="scss">
</style>