<!--
 * @Author: 曹捷
 * @Date: 2019-08-19 15:24:34
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-04-16 17:00:18
 * @Description: file content
 -->
<template>
  <div v-if="visible">
    <el-dialog :close-on-click-modal="false" :title="showTitle" :visible.sync="addVisible" @closed="closeDialog" width="40%">
      <el-form :inline="true" :model="formData" :rules="rules" class="obit-form-100" ref="formData">
        <el-form-item label="机构名称" prop="organizationName">
          <el-input v-model="formData.organizationName"></el-input>
        </el-form-item>
        <el-form-item label="上级机构" prop="parentId">
          <obit-org :disabled="addType === 'edit'" v-model="formData.parentId"></obit-org>
          <!-- <obit-cascader
            :disabled="addType === 'edit'"
            :options="orgList"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
            v-model="formData.parentId"
          ></obit-cascader>-->
        </el-form-item>
        <el-form-item label="机构编码" prop="organizationCode">
          <el-input :maxlength="10" show-word-limit v-model="formData.organizationCode"></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="shortName">
          <el-input :maxlength="10" show-word-limit v-model="formData.shortName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="areaCode">
          <obitCity type="list" v-model="formData.areaCode"></obitCity>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input :maxlength="50" show-word-limit type="textarea" v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="concatName">
          <el-input :maxlength="10" show-word-limit v-model="formData.concatName "></el-input>
        </el-form-item>
        <el-form-item label="电话 " prop="phone">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="orgDesc">
          <el-input :maxlength="50" show-word-limit type="textarea" v-model="formData.orgDesc"></el-input>
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
        organizationName: [
          { required: true, message: '请输入机构名称', trigger: 'change' }
        ],
        phone: [
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的电话号码',
            trigger: 'blur'
          }
        ],
        orgDesc: [
          { min: 3, max: 50, message: '内容长度3-50', trigger: 'change' }
        ],
        address: [
          { min: 3, max: 50, message: '内容长度3-50', trigger: 'change' }
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
            if (param.areaCode && param.areaCode.length > 0) {
              let list = param.areaCode
              param.provinceCode = list[0] ? list[0] : null
              param.cityCode = list[1] ? list[1] : null
              param.districtCode = list[2] ? list[2] : null
              param.areaCode = list[3] ? list[3] : null
            } else {
              param.areaCode = ''
            }
            this.$http.addSystemOrg(param).then(res => {
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