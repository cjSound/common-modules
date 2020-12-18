---
title: '过滤器 Filter'
---
##  过滤器
本项目集成管理系统常用的各种基础组件和API封装 方便开箱即用



## 目录结构
```js
├── src
│   ├── filters 
│   │   └── `index.js` 
│   │ 
│   └── common-modules
│ 
└── package.json
```


## 过滤器引入
- 可以额外export function 过滤器，到main.js里面通用引入
```js
/*
 * @Author: 曹捷
 * @Date: 2019-08-02 10:11:43
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-04 10:37:07
 * @Description: 业务引入 通用过滤器  可以额外export function 过滤器，到main.js里面通用引入
 */
import Vue from 'vue'
import * as filters from '@/common-modules/filters/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export function trueFalse(value) {
  return value?'是':'否'
}
```


## 系统过滤器
- 通用过滤器  框架自带
```js
/*
 * @Author: 曹捷
 * @Date: 2020-06-02 10:27:20
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-01 16:46:52
 * @Description: 通用过滤器 
 */
import numeral from 'numeral'
import moment from 'moment'
// 内容转义  多种转义模式
// 暂时有数字转义
export function valueType (value, filterType) {
    if (filterType) {
        if (value !== null) {
            if (filterType === 'numMoney') {
                return numeral(value).format('0.00')
            } else if (filterType === 'num') {
                return value
            } else if (filterType === 'date') {
                if (value) {
                    return moment(value).format('YYYY-MM-DD')
                } else {
                    return value
                }
            } else if (filterType === 'dateM') {
                let m = moment(value)
                if (m._isValid) {
                    return m.format('YYYYMM')
                } else {
                    return value
                }
            } else if (filterType === 'rate') {
                if (value === undefined) {
                    return null
                }
                return numeral(value).format('0.00%')
            } else if (filterType === 'rate1') {
                return `${value}%`
            } else if (filterType === 'rate2') {
                if (isNaN(value)) {
                    return value
                }
                return numeral(value / 100).format('0.00%')
            }
        }
        return value || ''
    } else {
        return value
    }
}
```