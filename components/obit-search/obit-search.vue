<!--
 * @Author: 曹捷
 * @Date: 2020-06-22 17:06:07
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-16 17:10:36
 * @Description: 自定义查询条件 自动新增拼接sql
--> 
<template>
  <div class>
    <el-collapse accordion class="search-main">
      <el-collapse-item :title="title">
        <el-form :inline="true" :model="formData" class="search-ruleForm" label-width="100px" ref="ruleForm">
          <div :key="index" class="search-item" v-for="(item,index) in formData.searchParamsList">
            <el-form-item :prop="'searchParamsList.' + index + '.setCode'" :rules="{
                required: true, message: '字段名不能为空', trigger: 'change'
            }">
              <obitSelect :selectList="dataList" @change="changeSetting($event,index)" labelName="fieldContext"
                placeholder="请选择要查询的字段" v-model="item.setCode" valueName="fieldName"></obitSelect>
            </el-form-item>
            <el-form-item :prop="'searchParamsList.' + index + '.selectCode'" :rules="{
                required: true, message: '字段名不能为空', trigger: 'change'
            }">
              <obitSelect :clearable="false" :selectList="item.selectList" @change="changeSelect($event,index)"
                labelName="value" placeholder="请选择查询条件" v-model="item.selectCode" valueName="key"></obitSelect>
            </el-form-item>
            <!-- 以下是具体的值类型 -->
            <!-- 配置的ajax搜索下拉列表 -->
            <el-form-item :prop="'searchParamsList.' + index + '.value1'" :rules="[{
                required: true, message: '值不能为空', trigger: 'change'
            },{
                validator:validatorBetween, trigger: 'change'
            }]" v-if="item.type===4">
              <obitSelectUrl :itemInfo="item" :selectCode="item.setCode" v-model="item.value1"></obitSelectUrl>
            </el-form-item>
            <!-- 时间类型 包含单个或者区间范围 -----------------------start -->
            <el-form-item :prop="'searchParamsList.' + index + '.value1'" :rules="[{
                required: true, message: '查询时间不能为空', trigger: 'change'
            },{
                validator:validatorBetween, trigger: 'change'
            }]" v-if="item.type===1">
              <el-date-picker class="input-md" placeholder="请选择查询时间" type="date" v-model="item.value1"
                value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item :prop="'searchParamsList.' + index + '.value1'" :rules="[{
                required: true, message: '查询结束时间不能为空', trigger: 'change'
            },{
                validator:validatorBetween, trigger: 'change'
            }]" v-if="item.type===1 && item.selectCode==='between'">
              <el-date-picker class="input-md" placeholder="请选择查询结束时间" type="date" v-model="item.value2"
                value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <!-- 时间类型 包含单个或者区间范围 -----------------------end -->

            <!-- 数值类型 包含单个或者区间范围 -----------------------start -->
            <el-form-item :prop="'searchParamsList.' + index + '.value1'" :rules="[{
                required: true, message: '查询值不能为空', trigger: 'change'
            },{
                validator:validatorBetween, trigger: 'change'
            }]" v-if="item.type===3">
              <el-input :step="0.01" class="input-md" placeholder="请输入查询值" type="number" v-model.number="item.value1">
              </el-input>
            </el-form-item>
            <el-form-item :prop="'searchParamsList.' + index + '.value2'" :rules="[{
                required: true, message: '查询值不能为空', trigger: 'change'
            },{
                validator:validatorBetween, trigger: 'change'
            }]" v-if="item.type===3 && item.selectCode==='between'">
              <el-input :step="0.01" class="input-md" min="0.00" placeholder="请选择要查询的最大值" type="number"
                v-model.number="item.value2"></el-input>
            </el-form-item>
            <!-- 数值类型 包含单个或者区间范围 -----------------------end -->

            <!-- 字符串类型  只可匹配 = || like -----------------------start -->
            <el-form-item :prop="'searchParamsList.' + index + '.value1'" :rules="[{
                required: true, message: '查询值不能为空', trigger: 'change'
            } ]" v-if="item.type===2">
              <el-input class="input-md" placeholder="请输入查询值" v-model="item.value1"></el-input>
            </el-form-item>
            <!-- <el-button @click="addParams" circle icon="el-icon-plus" size="small"></el-button> -->
            <el-button @click="removeParam(index)" circle icon="el-icon-minus" size="small"></el-button>
          </div>
        </el-form>
        <div>
          <el-button @click="onSubmit" class="btn-md" icon="el-icon-search">查 询</el-button>
          <el-button @click="addParams" class="btn-md" icon="el-icon-plus">新 增</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import obitSelect from './../obit-select/obit-select'
import obitSelectUrl from './obit-select-url'
import { Message } from 'element-ui'

import util from './../../utils/utils.js'
export default {
  props: {
    value: {
      type: String
    },
    title: {
      type: String,
      default: '搜索条件'
    },
    searchCode: {
      type: String,
      required: true
    }
  },
  components: { obitSelect, obitSelectUrl },
  data () {
    return {
      formData: {
        searchParamsList: []
      },
      // 自定义参数对象
      selfParams: {},
      dataList: [
        // {
        //   fieldName: 'date',
        //   fieldContext: '时间',
        //   type: 1, //字段类型(1.date2.string3.int 4 URL获取) type
        //   valuename: '',
        //   labelname: ''
        // },
        // {
        //   fieldName: 'name',
        //   fieldContext: '姓名',
        //   type: 2 //字段类型(1.date2.string3.int) type
        // },
        // {
        //   fieldName: 'age',
        //   fieldContext: '年龄',
        //   type: 3 //字段类型(1.date2.string3.int) type
        // },
        // {
        //   fieldName: 'a.alarmLevel',
        //   fieldContext: '告警级别',
        //   ajaxurl: 'system/codeValue/findByCodeFiled?codeField=alarmLevel',
        //   labelname: 'valueDesc',
        //   valuename: 'codeValue',
        //   type: 4 //字段类型(1.date2.string3.int) type
        // }
      ],
      // 1.date2.string3.int 4 接口获取
      selectType: {
        1: [
          { key: '=', value: '等于' },
          { key: '>', value: '大于' },
          { key: '>=', value: '大于等于' },
          { key: '<', value: '小于' },
          { key: '<=', value: '小于等于' },
          { key: 'between', value: '介于' }
        ],
        2: [
          { key: 'like', value: '模糊匹配' },
          { key: '=', value: '等于' }
        ],
        3: [
          { key: '=', value: '等于' },
          { key: '>', value: '大于' },
          { key: '>=', value: '大于等于' },
          { key: '<', value: '小于' },
          { key: '<=', value: '小于等于' },
          { key: 'between', value: '介于' }
        ],
        4: [{ key: '=', value: '等于' }]
      }
    }
  },
  methods: {
    validatorBetween (rule, value, callback) {
      let fields = rule.field.split('.')
      let index = fields[1]
      let item = this.formData.searchParamsList[index]
      if (item.type === 3 && isNaN(value)) {
        callback(new Error('请输入正确的数值'))
      }
      if (item.selectCode === 'between' && item.value2 && item.value1) {
        //   1.date2.string3.int
        if (
          item.type === 1 &&
          new Date(item.value1).getTime() > new Date(item.value2).getTime()
        ) {
          callback(new Error('开始时间不能大于结束时间'))
        } else if (item.type === 3 && item.value1 > item.value2) {
          callback(new Error('输入的最小值不能大于最大值'))
        }
      }
      callback()
    },
    listToSearchList () {
      this.$http.getQuerySetting({ business: this.searchCode }).then(res => {
        // let list = util.util.cloneObj(this.dataList)
        this.dataList = res.data
      })
    },
    // 字段名改变
    changeSetting (event, index) {
      let arr = this.dataList.filter(item => {
        return item.fieldName === event
      })
      let selestList = this.selectType[arr[0].type]
      let param = this.formData.searchParamsList[index]
      /**
       * fatherId
       * 级联查询 ，代表当前查询条件的内容 ，要依据对应fatherId 选择的内容
       */
      if (arr[0].fatherId) {
        // debugger
        let info = this.dataList.filter(item => {
          return arr[0].fatherId === item.id
        })[0]
        let fItem = this.formData.searchParamsList.filter(item => {
          return arr[0].fatherId === item.id
        })
        if (fItem.length === 0 || !fItem[0].value1) {
          Message.warning({
            message: `提示：当前字段内容属于级联查询，依赖 [${info.fieldContext}] 字段内容，请先选择 [${info.fieldContext}] 字段`,
            duration: 10000
          })
          return
        } else {
          param.initValue = fItem[0].value1
        }
      }
      param.selectList = selestList
      param.selectCode = selestList[0].key

      util.util.assignObj(param, arr[0])
      param.value1 = ''
      param.value2 = ''
    },
    // 查询条件改变
    changeSelect (event, index) {
      let param = this.formData.searchParamsList[index]
      param.value2 = ''
    },
    addParams () {
      this.formData.searchParamsList.push({
        setCode: '', //字段名
        selectCode: '', //查询条件  = > <
        type: '', //1.date2.string3.int
        value1: '', //
        value2: '', //当介于条件 有多个条件
        selectList: [], //查询条件集合
        ajaxurl: '',
        remote: 0,
        deal: '',
        labelname: '',
        valuename: '',
        id: '',
        fatherId: ''
      })
    },
    removeParam (index) {
      this.formData.searchParamsList.splice(index, 1)
      //   Message.warning('提示:至少')
    },
    onSubmit () {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let sql = ` `
          this.formData.searchParamsList.forEach(element => {
            let item = util.util.cloneObj(element)
            if (item.deal === 1) {
              // item.deal 1才拼接sql
              // item.deal 0返回自定义params
              if (item.type === 1 || item.type === 2) {
                if (item.selectCode === 'like') {
                  item.value1 = `'%${item.value1}%'`
                } else {
                  item.value1 = `'${item.value1}'`
                  item.value2 = `'${item.value2}'`
                }
              } else if (item.type === 4) {
                // todo 001 判断为 数字
                if (isNaN(item.value1)) {
                  item.value1 = `'${item.value1}'`
                }
              }
              if (item.selectCode === 'between') {
                sql += ` and  ${item.setCode} ${item.selectCode}  ${item.value1} and ${item.value2} `
              } else {
                sql += ` and  ${item.setCode} ${item.selectCode}  ${item.value1}   `
              }
            } else if (item.deal === 0) {
              this.selfParams[item.setCode] = item.value1
            }
          })
          this.$emit('input', sql)
          this.$emit('update:params', this.selfParams)
          this.$emit('change', sql)
          console.log('onSubmit -> sql', sql)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    this.listToSearchList()
  }
}
</script>

<style lang="scss">
.search-main {
  .search-ruleForm {
    max-height: 340px;
    overflow: auto;
    //   margin-right: -10px;
    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .search-item {
    .el-form-item {
      //   float: left;
      //   display: inline-block;
      //   width: auto;
    }
  }
}
</style>
