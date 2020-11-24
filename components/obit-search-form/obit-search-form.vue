<!--
 * @Author: 曹捷
 * @Date: 2020-10-21 17:13:01
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-10-27 09:30:08
 * @Description: 搜索条件
-->
<template>
  <el-form :inline="true" :model="params" class="com-serach-form" label-width="110px" ref="searchForm">
    <el-form-item :label="item.name" :prop="item.key" v-for="(item) in paramList" :key="item.key">
      <!-- {type:'date',name:'开始时间',key:''} -->
      <el-date-picker v-if="item.type ==='date'" class="input-md" :placeholder="`请选择${item.name}`"
        v-model="params[item.key]" value-format="yyyy-MM-dd"></el-date-picker>
      <!-- {type:'month',name:'年月',key:''} -->
      <el-date-picker v-else-if="item.type ==='month'" class="input-md" type="month" :placeholder="`请选择${item.name}`"
        v-model="params[item.key]" value-format="yyyy-MM-dd"></el-date-picker>
      <!-- { type: 'ajax', key: 'province', name: '省份', valuename: 'codeValue', labelname: 'valueDesc', ajaxurl: 'codeValue/findByCodeFiled?codeField=pasi_area' }, -->
      <obitSelectUrl v-else-if="item.type==='ajax'" :itemInfo="item" :placeholder="`请选择${item.name}`"
        v-model="params[item.key]">
      </obitSelectUrl>
      <!-- {type:'input',name:'地址',key:'address'} -->
      <el-input v-else class="input-md" :placeholder="`请输入${item.name}`" v-model="params[item.key]"></el-input>
    </el-form-item>
    <div :key="i" class="search-br" v-for="i in 3"></div>

    <el-form-item class="search-btn" v-if="type=='center'">
      <el-button @click="toSearch" class="btn-md" icon="el-icon-search" type="primary">搜 索</el-button>
      <el-button @click="resetForm('searchForm')" class="btn-md" icon="el-icon-refresh">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import obitSelectUrl from './../obit-search/obit-select-url'
export default {
  components: { obitSelectUrl },
  props: {
    params: {
      type: Object
    },
    paramList: {
      type: Array
    },
    type: {
      type: String,
      default: 'center'
    }
  },
  methods: {
    toSearch () {
      this.$emit('search')
    },
    // 重置form标单内容  初始化
    resetForm (name) {
      this.$refs[name].resetFields()
    },
  }
}
</script>

<style lang="scss">
.com-serach-form {
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  // justify-content: space-between;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  transition: 0.2s;
  // padding: 0px 10px 5px;
  padding: 10px 20px 0 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);

  .input-md {
    margin-right: 0;
    width: 100%;
  }

  .btn-md {
    padding: 7px 15px;
  }
  .el-form-item__label {
    padding-right: 10px;
  }
  .search-br {
    width: 25%;
    height: 1px;
  }
  .el-form-item {
    margin-bottom: 0px;
    margin-top: 0px;
    margin-right: 0px;
    width: 25%;
    display: inline-flex;
  }
  @media only screen and (max-width: 1440px) {
    .el-form-item {
      width: 33.3%;
    }
    .search-br {
      width: 33.3%;
      height: 0;
    }
  }
  .el-form-item__content {
    flex: 1;
  }
  .search-btn {
    width: 100%;
    margin-right: 10px;
    margin-bottom: 5px;
    text-align: center;
    position: relative;
    .el-form-item__content {
      position: static;
    }
  }
  .t-r {
    width: 100%;
    margin: 0;
  }
  .po-r {
    position: absolute;
    right: 0;
  }
}
</style>