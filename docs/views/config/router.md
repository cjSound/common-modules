---
title: '路由 Router'
---
##  路由
本项目集成管理系统常用的各种基础组件和API封装 方便开箱即用

## 路由配置
## createRouter
**路由基础实例，包括404,401等**

- createRouter参数 
```js
let options ={
  // 系统默认模板 暂时有第一版的system模板，可以将对应模板直接链入现有系统
  template: ['system']
}
```
- 路由调用 `router/index.js`

```js
import createRouter from "@/common-modules/router";
let router = createRouter({
  template: ['system']
})
// 引入adminModuls 目录下所有子模块路由文件  通配引入路由文件
const modulesFiles = require.context("./adminModuls", true, /\.js$/);
modulesFiles.keys().forEach((modulePath) => {
  const value = modulesFiles(modulePath);
  router.options.routes.push(...value.default);
  router.addRoutes(value.default);
});
export default router;
```

##  小酌一杯
<ClientOnly>
  <obit-gif/>
</ClientOnly>