<!--
 * @Author:  
 * @Date: 2019-08-19 20:13:34
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-04-24 16:43:33
 * @Description: 绑定APP
 -->
<template>
  <div v-if="updateVisable">
    <el-dialog :close-on-click-modal="false" :visible.sync="upvisible" @closed="closeDialog" title="绑定应用" width="40%">
      <el-form :inline="true" :model="formData" class="com-form-100" ref="formData">
        <el-form-item
          :key="index"
          :label="'应用'+(index+1)"
          :prop="'appIds['+index+']'  "
          :rules="{
            required: true, message: '所属角色不能为空', trigger: 'change'
          }"
          v-for="(domain, index) in formData.appIds"
        >
          <el-select class="input-md childer-80" clearable filterable placeholder="请选择绑定应用" v-model="formData.appIds[index]">
            <el-option :key="item.id" :label="item.appName" :value="item.id" v-for="item in appList"></el-option>
          </el-select>
          <el-tooltip class="hover-operator com-link p-r-10" content="新增" effect="dark" placement="top">
            <i @click.stop="addRole" class="el-icon el-icon-circle-plus-outline pointer"></i>
          </el-tooltip>
          <el-tooltip class="hover-operator com-link" content="删除" effect="dark" placement="top" v-if="formData.appIds.length>1">
            <i @click.stop="removeRole(index)" class="el-icon el-icon-delete pointer"></i>
          </el-tooltip>
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
    updateVisable: {
      type: Boolean
    },
    userId: {
      type: Number
    }
  },
  data() {
    return {
      upvisible: this.updateVisable,
      formData: {
        appIds: []
      },
      appList: []
    }
  },

  computed: {},
  watch: {
    updateVisable(value) {
      if (value) {
        this.initUserApp()
      }
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
          this.$http.setUserApps(param).then(res => {
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
      util.util.cleanObj(this.formData)
      this.$emit('update:updateVisable', false)
      this.$emit('reloadUp')
    },
    initUserApp() {
      let param = {
        id: this.userId
      }
      this.$http.getUserApps(param).then(res => {
        let arr = []
        res.forEach(element => {
          arr.push(element.appId)
        })
        this.$set(this.formData, 'appIds', arr)
        if (this.formData.appIds.length === 0) {
          this.formData.appIds.push('')
        }
      })
    },
    addRole() {
      this.formData.appIds.push('')
    },
    removeRole(index) {
      this.formData.appIds.splice(index, 1)
    },
    initAllApp() {
      this.$http.getAllApp().then(res => {
        this.appList = res
      })
    }
  },
  mounted() {
    this.initAllApp()
  }
}
</script>

<style lang="scss">
</style>