<!--
 * @Author: 曹捷
 * @Date: 2019-08-19 15:24:34
 * @LastEditors  : 曹捷
 * @LastEditTime : 2019-12-23 13:10:51
 * @Description: file content
 -->
<template>
  <div v-if="visible">
    <el-dialog :close-on-click-modal="false" :title="showTitle" :visible.sync="addVisible" @closed="closeDialog" width="40%">
      <el-form :inline="true" :model="formData" :rules="rules" class="obit-form-100" ref="formData">
        <el-form-item label="编码值" prop="codeValue">
          <el-input :maxlength="20" show-word-limit v-model="formData.codeValue"></el-input>
        </el-form-item>
        <el-form-item label="值描述" prop="valueDesc">
          <el-input :maxlength="100" show-word-limit type="textarea" v-model="formData.valueDesc"></el-input>
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
    selectCode: {
      type: String
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
      return this.addType === 'add' ? '新增字典值' : '修改字典值'
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
        codeValue: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ],
        valueDesc: [
          { required: true, message: '请输入字典描述', trigger: 'blur' }
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
            param.codeField = this.selectCode
            this.$http.addSysDictValue(param).then(res => {
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