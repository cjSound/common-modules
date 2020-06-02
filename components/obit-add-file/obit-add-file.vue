<!--
 * @Author: 曹捷
 * @Date: 2019-09-02 09:48:37
 * @LastEditors: 曹捷
 * @LastEditTime: 2019-12-17 11:34:01
 * @Description: file content
 -->
<template>
  <div v-if="visible">
    <el-dialog :title="title" :visible.sync="addVisible" @closed="closeDialog" class="operatorLog" width="50%">
      <p>
        按照模板格式填写后上传，
        <a @click="downTemple" class="obit-link">下载Excel模板</a>
      </p>
      <el-form :inline="true">
        <el-form-item label="上传模板：">
          <obitUpload :action="action" :multiple="false" :size="10" :success="success" accept="xls, xlsx">
            <el-button size="small" type="primary">
              <i class="el-icon-upload el-icon--left"></i>上传文件
            </el-button>
          </obitUpload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean
    },
    title: {
      type: String,
      default: '批量上传新增'
    },
    // 下载的模板类型
    fileType: {
      type: Number
    },
    // 上传文件路径地址
    action: {
      type: String,
      required: true
    },
    downUrl: {
      type: String
    }
  },
  watch: {
    visible(value) {
      this.addVisible = value
    }
  },
  data() {
    return {
      addVisible: this.visible
    }
  },
  created() {},
  methods: {
    success(data) {
      this.$emit('success', data)
    },
    closeDialog() {
      this.$emit('update:visible', false)
    },
    downTemple(item) {
      window.open(this.downUrl)
      // this.$http.downloadAddFileTemple({ fileType: this.fileType })
    }
  }
}
</script>
<style lang="less">
</style>