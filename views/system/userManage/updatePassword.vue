<!--
 * @Author: 刘硕
 * @Date: 2019-08-19 20:13:34
 * @LastEditors: 刘硕
 * @LastEditTime: 2019-08-20 09:14:54
 * @Description: file content
 -->
<template>
  <div v-if="updateVisable">
    <el-dialog :close-on-click-modal="false" :visible.sync="upvisible" @closed="closeDialog" title="重置密码" width="40%">
      <el-form :inline="true" :model="formData" :rules="rules" class="obit-form-100" ref="formData">
        <el-form-item label="新密码" prop="newPassword">
          <el-input placeholder="请输入新密码" show-password v-model="formData.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="secPassword">
          <el-input placeholder="请重复密码" show-password v-model="formData.secPassword"></el-input>
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
    updateVisable: {
      type: Boolean
    },
    userId: {
      type: Number
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      console.log('TCL: validatePass -> value', value)
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      upvisible: this.updateVisable,
      formData: {},
      rules: {
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        secPassword: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },

  computed: {},
  watch: {
    updateVisable(value) {
      this.upvisible = value
    }
  },
  methods: {
    //保存
    onSubmit() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          let param = util.util.cloneObj(this.formData)
          param.userId = this.userId
          this.$http.updatePassword(param).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.closeDialog()
          })
        } else {
          return false
        }
      })
    },
    closeDialog() {
      this.upvisible = false
      util.util.cleanObj(this.formData)
      this.$emit('reloadUp')
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
</style>