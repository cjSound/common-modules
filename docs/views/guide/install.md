---
title: '介绍'
---
#  介绍
本项目集成管理系统常用的各种基础组件和API封装 方便开箱即用

# 文档介绍
## 类型介绍
- 类型：`Boolean`
- 默认值：`true` 
- Slot demo：被渲染成示例
- Slot description：被渲染成示例描述信息
```md
- 类型：`Boolean`
- 默认值：`true` 
- Slot demo：被渲染成示例
- Slot description：被渲染成示例描述信息
```
## 字体加粗
**加粗字体**

```md
**加粗字体**
```
## 字体背景
`字体有背景颜色`
```md
`字体有背景颜色`

```

## 区域背景
::: warning 注意
这里是可以添加背景
:::
::: tip 提示
这里是提示效果
:::
```md
::: warning 注意
这里是可以添加背景
:::

::: tip 提示
这里是提示效果
:::
```
## 链接跳转
[点此查看 易比特](http://www.one-bit.cn/)
```md
[点此查看 易比特](http://www.one-bit.cn/)
```

## 表格
| 参数| 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| :------ | ------ | ------ | ------ | ------ | ------ |
| icon-class | 参考如上，全在上面 |  String |- | - | true |
```md
| 参数| 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| :------ | ------ | ------ | ------ | ------ | ------ |
| icon-class | 参考如上，全在上面 |  String |- | - | true |
```

## 代码块
``` js
module.exports = {
  plugins: {
    'demo-container': {
      component: 'CustomDemoBlock'
    }
  }
}
```
``` java
module.exports = {
  
}
```
#  赏花
<ClientOnly>
  <obit-gif/>
</ClientOnly>