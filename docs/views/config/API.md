---
title: '请求 Api'
---
##  Request 请求
- 系统已经封装基础请求包括 `系统管理相关API` `通用业务组件API` `基础API`

## 目录结构
```js
├── src
│   ├── config 
│   │   ├── ajax 
│   │   │   ├── api           //系统所有业务API 分模块
│   │   │   │   └── common.js //公共模块API
│   │   │   │   └── demo.js 
│   │   │   └── index.js      //Request 入口
│   │   ├── `config.js`       //配置文件
│   │   └── `url.js`          //系统URL基础参数配置文件
│   │ 
│   └── common-modules
│ 
└── package.json
```
## Request入口 配置
- **config/ajax/index.js**
```js
import router from '@/router/adminRouter'
import { ObitAjax } from './../../common-modules/api'
import config from '../../config/config'
let ajaxInfo = new ObitAjax(router, config)
const modulesFiles = require.context("./api", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath);
    return Object.assign(modules, value.default(ajaxInfo.api));
}, {});

ajaxInfo.init(modules)
export default ajaxInfo.methods
```

## URL  路径配置
- url.js
```js
var URL = process.env.VUE_APP_BASE_URL
let baseUrl = `${URL}water`
export { URL, baseUrl }

```


## API Demo
- common.js
```js  
import { URL } from './../../url'
export default function (api) {
    return {
        // 根据code查询子字典 字典组件
        getCommonDictValueList (data) {
            return api.get(`${URL}system/codeValue/findByCodeFiled`, data)
        },
        // 地区 懒加载
        getCommonDictByParentId (data) {
            return api.get(`${URL}system/org/getDictByPid`, data)
        },
        // 地区组件 数据回显
        getCommonDictParents (data) {
            return api.get(`${URL}system/org/getDictParentListById`, data)
        },
        //刷新 登录超时刷新
        reflesh (data = {}) {
            return api.post(`${URL}user/reflesh`, data)
        },
        // 获取所有机构接口
        getAllOrgTree (data = {}) {
            return api.post(`${URL}system/org/getOrgTree`, data)
        },
        // 自定义查询组件相关
        getDataByUrl (url) {
            return api.get(`${URL}${url} `, {})
        },
        getQuerySetting (data) {
            let param = { business: data }
            return api.get(`${URL}water/querySetting/getByBusiness`, param)
        }

    }
}
```

- demo.js
```js 
import { URL } from './../../url'
export default function (api) {
    return {
        testTableList(data = {}) {
            return api.tablePost(`${URL}/tt/user/pageList`, data)
        },
        // 下载导入生成的错误文件
        testDownloadWrongFile(data, config = {}) {
            return api.download(`${URL}manage/fileImprot/downloadWorngFile`, data, config)
        },
    }
}
```


#  接着舞
<ClientOnly>
  <obit-gif/>
</ClientOnly>