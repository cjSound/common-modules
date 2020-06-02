<!--
 * @Author: 刘硕
 * @Date: 2019-08-19 14:45:40
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-04-26 10:18:33
 * @Description: 新增用户
 -->
<template>
  <div class="com-main-add" v-if="visible">
    <div class="com-main p-b-20">
      <title-wrap :title="showTitle">
        <svg-icon @click="goback" class="com-link" icon-class="back" style="font-size:28px " />
      </title-wrap>
      <el-form :inline="true" :model="formData" :rules="rules" class="com-form-50" ref="formData">
        <el-form-item label="用户域账号" prop="userId">
          <el-input placeholder="请输入用户域账号（登录账户）" v-model="formData.userId"></el-input>
        </el-form-item>
        <el-form-item label="用户工号" prop="userNo">
          <el-input placeholder="请输入用户工号" v-model="formData.userNo"></el-input>
        </el-form-item>
        <el-form-item label="组织单位" prop="org">
          <com-org v-model="formData.org"></com-org>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="this.activeName === 'add'">
          <el-input placeholder="请输入用户密码" show-password type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-select class="input-md" clearable filterable placeholder="请选择类型" v-model="formData.userType">
            <el-option :key="item.id" :label="item.dictName" :value="item.id" v-for="item in dictUserTypeList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-select
            :loading="pstLoading"
            :remote-method="remoteMethod"
            class="input-md"
            clearable
            filterable
            placeholder="请选择岗位"
            remote
            v-model="formData.position"
          >
            <el-option :key="item.positionId" :label="item.positionText" :value="item.positionId" v-for="item in positionList"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属应用" prop="appId">
          <el-select @change="choiceApp" class="input-md childer-80" clearable filterable placeholder="请选择绑定应用" v-model="formData.appId">
            <el-option :key="item.id" :label="item.appName" :value="item.id" v-for="item in appList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属角色" prop="roleId">
          <el-select class="input-md childer-80" clearable filterable placeholder="请选择角色" v-model="formData.roleId">
            <el-option :key="item.id" :label="item.roleName" :value="item.id" v-for="item in roleList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属供应商" prop="supplierId" v-if="formData.userType ===1">
          <el-select class="input-md childer-80" clearable filterable placeholder="请选择所属供应商" v-model="formData.supplierId">
            <el-option :key="item.id" :label="item.supplierName" :value="item.id" v-for="item in supplierList"></el-option>
          </el-select>
        </el-form-item>

        <br />
        <el-form-item label="姓" prop="firstName">
          <el-input placeholder="请输入姓" v-model="formData.firstName"></el-input>
        </el-form-item>
        <el-form-item label="名" prop="lastName">
          <el-input placeholder="请输入名" v-model="formData.lastName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select class="input-md" clearable filterable placeholder="请选择类型" v-model="formData.sex">
            <el-option :key="item.id" :label="item.dictName" :value="item.id" v-for="item in dictSexList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input placeholder="请输入联系电话" v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="手机电话" prop="telephone">
          <el-input placeholder="请输入手机电话" v-model="formData.telephone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input placeholder="请输入身份证号" v-model="formData.idCard"></el-input>
        </el-form-item>

        <div class="t-r">
          <el-button @click="goback">取 消</el-button>
          <el-button @click="onSubmit" type="primary">保 存</el-button>
        </div>
      </el-form>
    </div>
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
  data() {
    return {
      formData: {},
      positionList: [],
      dictSexList: [
        { dictName: '男', id: 1 },
        { dictName: '女', id: 2 }
      ],
      dictUserTypeList: [
        { dictName: '内部员工', id: 0 },
        { dictName: '外部（供应商）', id: 1 }
      ],
      activeName: 'add',
      addVisible: this.visible,
      rules: {
        userNo: [
          { required: true, message: '请输入用户工号', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '请输入用户域账号', trigger: 'blur' }
        ],
        org: [{ required: true, message: '请选择组织机构', trigger: 'change' }],
        userType: [
          { required: true, message: '请选择用户类型', trigger: 'change' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        userId: [
          { required: true, message: '请选择运营商', trigger: 'change' }
        ],
        position: [
          { required: true, message: '请选择岗位', trigger: 'change' }
        ],
        appId: [
          { required: true, message: '请选择所属应用', trigger: 'change' }
        ],
        roleId: [
          { required: true, message: '请选择应用再选择角色', trigger: 'change' }
        ],
        supplierId: [
          {
            required: true,
            message: '请选择应用再选择供应商',
            trigger: 'change'
          }
        ]
      },
      pstLoading: false,
      positionList: [],
      appList: [],
      roleList: [],
      // 供应商列表
      supplierList: []
    }
  },

  computed: {
    showTitle() {
      return this.addType === 'add' ? '新增用户' : '修改用户'
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
  mounted() {
    this.remoteMethod()
    this.initAllApp()
  },
  methods: {
    initAllApp() {
      this.$http.getAllApp().then(res => {
        this.appList = res
      })
    },
    choiceApp(item) {
      if (item) {
        let param = {
          appId: item
        }
        this.$http.getAllRole(param).then(res => {
          this.$set(this.formData, 'roleId', '')
          this.roleList = res
        })
        // 获取APP对应的供应商
        this.$http.getOuterUserByApp(param).then(res => {
          this.supplierList = res
        })
      } else {
        this.$set(this.formData, 'roleId', '')
      }
    },
    remoteMethod(query) {
      let param = {
        positionText: query
      }
      this.loading = true
      this.$http
        .getPositionByName(param)
        .then(res => {
          this.positionList = res
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    goback() {
      this.$emit('update:visible', false)
      this.$emit('reload')
    },
    //保存
    onSubmit() {
      if (this.activeName === 'add') {
        this.$refs['formData'].validate(valid => {
          if (valid) {
            let param = util.util.cloneObj(this.formData)
            param.username = param.userId
            let key = this.addType === 'add' ? 'saveUserInfo' : 'changeUserInfo'
            this.$http[key](param).then(res => {
              this.$message({
                type: 'success',
                message: this.addType === 'add' ? '新增成功' : '修改成功'
              })
              this.goback()
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
    getAllPosition() {
      this.$http.getAllPosition().then(res => {
        this.positionList = res
      })
    }
  }
}
</script>

<style lang="scss">
</style>