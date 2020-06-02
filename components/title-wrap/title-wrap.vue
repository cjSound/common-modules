<!--
 * @Author: 曹捷
 * @Date: 2019-08-19 10:52:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-27 17:45:58
 * @Description: file content
 -->
<template>
  <div class="title-wrap">
    <!-- 左侧的盒子 -->
    <div class="title_left">
      <div :class="{hasDetail: !isDetailPage }" class="title_left_top">
        <span />
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
        <span v-if="isDetailPage && detailInfor.stadus">{{ detailInfor.stadus }}</span>
        <div class="title-child" style="display: inline-block; margin-left: 10px;">
          <slot name="left"></slot>
        </div>
      </div>
      <div class="title_left_bottom" v-if="isDetailPage">
        <slot name="desc">
          <div v-if="isDetailPage">
            <span v-if="isDetailPage && detailInfor.desc1">{{ detailInfor.desc1 }}</span>
            <span v-if="isDetailPage && detailInfor.desc2">{{ detailInfor.desc2 }}</span>
          </div>
        </slot>
      </div>
    </div>
    <!-- 右侧的盒子里面是槽口，自己配置需要的按钮或元素 -->
    <div class="title_right">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    // 当页的标签
    title: {
      type: String,
      default: ''
    },
    // 是否是详情页面
    isDetailPage: {
      type: Boolean,
      default: false
    },
    // 详情页面需要传的数据
    detailInfor: {
      type: Object,
      default() {
        return {
          stadus: '',
          desc1: '',
          desc2: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title-wrap {
  width: 100%;
  min-height: 50px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  .title_left {
    flex: 1;
    .title_left_top {
      margin: 0;
      font-size: 16px;
      color: #333;
      span:nth-child(1) {
        display: inline-block;
        width: 6px;
        height: 14px;
        background-color: #ff6a00;
        border-radius: 3px;
        margin-right: 10px;
        position: relative;
        top: 1px;
      }
      span:nth-child(3) {
        display: inline-block;
        font-size: 12px;
        color: #ff6a00;
        border: 1px solid #ff6a00;
        border-radius: 3px;
        margin-left: 10px;
        padding: 3px 5px;
      }
    }
    .title_left_bottom {
      margin: 0;
      font-size: 12px;
      color: #999;
      position: relative;
      top: 7px;
      padding-left: 15px;
      padding-top: 5px;
      padding-bottom: 15px;
      span:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
  .title_right {
    /*flex: 1;*/
    text-align: right;
  }
  .hasDetail {
    line-height: 30px;
  }
}
</style>
