<!--
 * @Author: 曹捷
 * @Date: 2020-06-22 20:37:04
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-10-22 15:17:54
 * @Description: 自定义查询条件 接口下拉列表
--> 
<template>
  <obitSelect :labelName="itemInfo.labelname" :placeholder="placeholder" :remote="remote" :selectList="selectList"
    :valueName="itemInfo.valuename" @change="changeValue" @remoteMethod="initData" clearable v-model="cValue">
  </obitSelect>
</template>

<script>
import obitSelect from './../obit-select/obit-select'

export default {
  props: {
    value: {
      type: [Number, String]
    },
    itemInfo: {
      type: Object
    },
    placeholder: {
      type: String,
      default: '请选择对应值'
    },
    selectCode: { type: String }
  },
  data () {
    return {
      remote: false, //是否为远程搜索
      cValue: this.value,
      selectList: []
    }
  },
  watch: {
    value () {
      this.cValue =
        this.value === null || this.value === undefined ? '' : this.value
    },
    /**
     * 查询字段的改变 触发对应下拉改变
     */
    selectCode (value) {
      this.initData(this.itemInfo.initValue)
    }
  },
  components: { obitSelect },
  methods: {
    changeValue (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },
    initData (searchText) {
      searchText = searchText ? searchText : ''
      let config = this.$http.getConfig()
      this.$http.getDataByUrl(`${this.itemInfo.ajaxurl}${searchText}`).then(res => {
        let list
        if (res.status == 200 && res.code === config.successCode) {
          list = res.data
        } else if (res instanceof Array) {
          list = res
        }
        if (list) {
          list.forEach((element, index) => {
            let type = Object.prototype.toString.call(element)
            if (type.indexOf('String') !== -1) {
              let info = {}
              info[this.itemInfo.valuename] = element
              info[this.itemInfo.labelname] = element
              list[index] = info
            }
          })
          this.selectList = list
        }
      })
    }
  },
  created () {
    if (this.itemInfo.remote === 1) {
      this.remote = true
    }
    if (this.itemInfo.type === 4) {
      if (!this.itemInfo.labelname) {
        this.itemInfo.labelname = 'lable'
        this.itemInfo.valuename = 'value'
      }
    }
  },
  mounted () {
    this.initData(this.itemInfo.initValue)
  }
}
</script>

<style>
</style>