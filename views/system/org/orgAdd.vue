<!--
 * @Author: 曹捷
 * @Date: 2019-08-19 15:24:34
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-04-23 14:15:50
 * @Description: file content
 -->
<template>
  <div v-if="visible">
    <el-dialog :close-on-click-modal="false" :title="showTitle" :visible.sync="addVisible" @closed="closeDialog" width="40%">
      <el-form :inline="true" :model="formData" :rules="rules" class="com-form-100" ref="formData">
        <el-form-item label="机构名称" prop="orgText">
          <el-input v-model="formData.orgText"></el-input>
        </el-form-item>
        <el-form-item label="上级机构" prop="fatherId">
          <com-org :disabled="addType === 'edit'" v-model="formData.fatherId"></com-org>
        </el-form-item>
        <el-form-item label="机构ID" prop="orgId">
          <el-input :disabled="addType === 'edit'" :maxlength="20" show-word-limit v-model="formData.orgId"></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="orgTextEn">
          <el-input :maxlength="40" show-word-limit v-model="formData.orgTextEn"></el-input>
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
      return this.addType === 'add' ? '新增组织机构' : '修改组织机构'
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
  data() {
    return {
      activeName: 'add',
      addVisible: this.visible,
      formData: {},
      orgList: [],
      rules: {
        orgText: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        orgId: [
          {
            required: true,
            min: 7,
            max: 20,
            message: '内容长度3-50',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getOrgList()
  },
  methods: {
    addSimInfo() {
      if (this.activeName === 'add') {
        this.$refs['formData'].validate(valid => {
          if (valid) {
            let param = util.util.cloneObj(this.formData)
            let requestKey =
              this.addType === 'add' ? 'saveOrgInfo' : 'changeOrgInfo'
            this.$http[requestKey](param).then(res => {
              this.$message({
                type: 'success',
                message: this.addType === 'add' ? '新增成功' : '修改成功'
              })
              this.getOrgList()
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
    getOrgList() {
      let data = {}
      this.$http.getAllOrgTree().then(res => {
        this.orgList = res
      })
    }
  }
}
</script>
<style lang="scss">
</style>