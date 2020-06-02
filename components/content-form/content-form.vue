<!--
 * @Author: 曹捷
 * @Date: 2019-08-19 14:18:42
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-02-26 21:58:36
 * @Description: file content
 -->

<!--
  from表单的容器组件
  接收一个参数，类型为object
  {
    title1: ''  //左侧带颜色背景的标题
    title2：''  //右侧描述文字
  }
-->
<template>
  <div style="padding-top: 12px;">
    <div :class="{paddingSpec: !needPadding}" class="fromTitle">
      <div class="title_box">
        <span>{{ fromtitle.title1 }}</span>
        <span>{{ fromtitle.title2 }}</span>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZlContentForm',
  props: {
    fromtitle: {
      type: Object,
      default() {
        return {
          title1: '模块标题',
          title2: '模块信息说明'
        }
      }
    },
    needPadding: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped lang="scss">
//页面中的from盒子
.fromTitle {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e8e8e8;
  padding: 25px;
  position: relative;
  font-size: 14px;
  &.paddingSpec {
    padding: 10px;
  }
  .title_box {
    height: 25px;
    background-color: #fff;
    position: absolute;
    top: -12px;
    left: 10px;
    span:nth-child(1) {
      display: inline-block;
      min-width: 80px;
      padding: 0 10px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      background-color: #eaebe5;
      border-radius: 13px;
      font-weight: bold;
      color: #606842;
      margin-right: 15px;
    }
    span:nth-child(2) {
      color: #999;
      margin-right: 10px;
    }
  }
}
</style>
