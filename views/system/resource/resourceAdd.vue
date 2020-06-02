<!--
 * @Author: 曹捷
 * @Date: 2019-08-19 15:24:34
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-04-23 15:48:36
 * @Description: 新增资源
 -->
<template>
  <div v-if="visible">
    <el-dialog :close-on-click-modal="false" :title="showTitle" :visible.sync="addVisible" @closed="closeDialog" width="40%">
      <el-form :inline="true" :model="formData" :rules="rules" class="com-form-100" ref="formData">
        <el-form-item label="资源名称" prop="resourceName">
          <el-input v-model="formData.resourceName"></el-input>
        </el-form-item>
        <el-form-item label="资源编码" prop="resourceCode">
          <el-input v-model="formData.resourceCode"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="addSimInfo" type="primary">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import util from '@/common-modules/utils/utils'
export default {
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
  computed: {
    showTitle() {
      return this.addType === 'add' ? '新增资源' : '修改资源'
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
  data() {
    return {
      activeName: 'add',
      addVisible: this.visible,
      formData: {},
      rules: {
        resourceName: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        resourceCode: [
          { required: true, message: '请输入资源编码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  methods: {
    addSimInfo() {
      if (this.activeName === 'add') {
        this.$refs['formData'].validate(valid => {
          if (valid) {
            let param = util.util.cloneObj(this.formData)
            let key = this.addType === 'add' ? 'saveResource' : 'changeResource'
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