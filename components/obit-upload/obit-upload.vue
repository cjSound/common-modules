<!--
 * @Author: 曹捷
 * @Date: 2019-08-21 15:16:37
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-09 19:22:23
 * @Description: file content
 -->
<template>
  <span>
    <el-upload
      :accept="accept"
      :action="action"
      :auto-upload="autoUpload"
      :before-remove="handleRemove"
      :before-upload="beforeUpload"
      :drag="drag"
      :file-list="fileList"
      :http-request="customUpload"
      :limit="limit"
      :list-type="listType"
      :multiple="multiple"
      :on-change="onChange"
      :on-exceed="onExceed"
      :on-preview="handlePictureCardPreview"
      :on-success="success"
      :show-file-list="showFileList"
      class="avatar-uploader"
      ref="upload"
    >
      <slot></slot>
      <!-- <span slot="file" slot-scope="{file}" v-if="listType !==''">
        <img :src="file.url" alt class="el-upload-list__item-thumbnail" />
        <span class="el-upload-list__item-actions">
          <span @click="handlePictureCardPreview(file)" class="el-upload-list__item-preview">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span @click="handleRemove(file)" class="el-upload-list__item-delete">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </span>-->
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body v-if="listType !==''">
      <img :src="dialogImageUrl" alt width="100%" />
    </el-dialog>
  </span>
</template>

<script>
import { Upload, Loading } from 'element-ui'

export default {
  components: {
    ElUpload: Upload
  },
  props: {
    //   是否允许拖拽上传
    drag: {
      type: Boolean,
      default: false
    },
    // 上传文件地址 必填
    action: {
      type: String,
      required: true
    },
    // 上传的文件类型限制 比如  jpg,png
    accept: {
      type: String
    },
    // 成功回调
    success: {
      type: Function
    },
    // 是否允许多文件上传
    multiple: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 10
    },
    limit: {
      type: Number,
      default: 10
    },
    // 自定义参数
    params: {
      type: Object
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    listType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      uploadNum: 0,
      uploadSuccessNum: 0,
      loading: '',
      dialogVisible: false,
      dialogImageUrl: '',
      fileList: []
    }
  },
  methods: {
    submit() {
      this.$refs.upload.submit()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      let fileIndex
      fileList.forEach((element, index) => {
        if (file.name === element.name) {
          fileIndex = index
        }
      })
      this.$emit('remove', fileIndex, this.params)
    },
    onExceed() {
      this.$message.error(`上传数量一次不能超过${this.limit}个`)
    },
    beforeUpload(file) {
      var fileType = file.name
        .substring(file.name.lastIndexOf('.') + 1)
        .toLowerCase()
      if (this.size) {
        if (file.size / 1024 / 1024 > this.size) {
          this.$message.error(`上传的文件大小不能超过${this.size}M`)
          return false
        }
      }
      if (this.accept) {
        if (this.accept.indexOf(fileType) === -1) {
          this.$message.error(`上传类型只支持${this.accept}的类型`)
          return false
        }
      }
      return true
    },
    customUpload(fileobj) {
      let param = new FormData()
      param.append('file', fileobj.file)
      //上传压缩裁剪
      let defult = Object.assign({}, this.params)
      for (var i in defult) {
        param.append(i, defult[i])
      }
      this.uploadNum++
      this.loading = Loading.service({
        lock: true,
        text: '文件上传中，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$http
        .upload(this.action, param)
        .then(res => {
          this.endLoading()
          this.success && this.success(res, this.params)
        })
        .catch(() => {
          this.endLoading()
        })
    },
    endLoading() {
      this.uploadSuccessNum++
      if (this.uploadNum === this.uploadSuccessNum) {
        // this.$refs.upload.clearFiles()
        this.loading.close()
      }
    },
    onRemove(file, fileList) {
      this.$emit('onRemove', file, fileList)
    },
    onChange(fileobj) {
      if (!this.autoUpload) {
        console.log('TCL: onChange -> fileobj', fileobj)
      }
    }
  }
}
</script>

<style lang="scss"  >
.avatar-uploader {
  .el-upload {
    // border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 200px;
    line-height: 178px;
    text-align: center;
  }
  .el-upload-list__item:hover .el-icon-close {
    display: none;
  }
  .avatar {
    width: 300px;
    height: 200px;
    display: block;
  }
}
</style>