/*
 * @Author: 曹捷
 * @Date: 2019-08-01 14:25:13
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-04-16 16:10:48
 * @Description: file content
 */
import api from './api'
let URL = 'http://rap2.taobao.org:38080/app/mock/228700'
export default {
    // 根据code查询子字典
    getCommonDictValueList(data) {
        return api.get(`${URL}/getCommonDictValue`, data)
    },
    // 地区 懒加载
    getCommonDictByParentId(data) {
        return api.get(`${URL}/getDictByPid`, data)
    },
    // 地区组件 数据回显
    getCommonDictParents(data) {
        return api.get(`${URL}/getDictParentListById`, data)
    },
    getCommonTest(data) {
        console.log('TCL: getCommonTest -> 原始版本', data)
        return api.get(`${URL}manage/codeValue/findByCodeFiled`, data)
    },
    // 获取所有机构接口
    getAllOrgTree(data = {}) {
        return api.post(`${URL}/getAllOrgTree`, data)
    }
}