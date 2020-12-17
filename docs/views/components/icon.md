---
title: '图标'
---

# 快速上手

::: demo **图标组件，支持直接导入SVG**

```vue
<template>
	<ul class="icon-list">
    <li :key="index" v-for="(item,index) in iconList">
      <svg-icon :icon-class="item.name" class="obit-link" />
      <br />
      <span>{{item.plug}}</span>
    </li>
  </ul>
</template>
<script>
	export default {
		data() {
			return {
				iconList:[]
			}
		},
		 mounted() {
    const req = require.context('./../../../icons/svg', false, /\.svg$/)
    this.iconList = req.keys().map(res => {
      let name = res.replace('./', '').replace('.svg', '')
      return { name: name, plug: `<svg-icon icon-class="${name}" />` }
    })
  }
	}
</script>
<style >
	.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  margin: 0;
  border-radius: 4px;
}

.icon-list li {
    float: left;
    width: 16.66%;
    height: 120px;
    color: #666;
    padding-top: 30px;
    font-size: 13px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
    text-align: center;
    
	}
.icon-list	.svg-icon {
      font-size: 34px;
    }
 .icon-list   span {
      display: inline-block;
      height: 1em;
      padding-top: 20px;
    }
 .icon-list li:hover {
    color: #5cb6ff;
  }
</style>
```
:::

## 参数说明

| 参数| 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| :------ | ------ | ------ | ------ | ------ | ------ |
| icon-class | 参考如上，全在上面 |  String |- | - | true |

## 赏花

<obit-gif />