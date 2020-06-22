/*
 * @Author: 曹捷
 * @Date: 2019-08-01 14:25:13
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-22 21:25:54
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
        return api.get(`${URL}manage/codeValue/findByCodeFiled`, data)
    },
    // 获取所有机构接口
    getAllOrgTree(data = {}) {
        return api.post(`${URL}/getAllOrgTree`, data)
    },
    //获取用户菜单权限
    getSystemMenuList(data = {}) {
        return api.get(`${URL}manage/menu/getList`, data)
    },
    //获取用户按钮权限
    getSystemButtonList(data = {}) {
        return api.get(`${URL}manage/menu/getButtonList`, data)
    },
    // 自定义查询组件相关
    getDataByUrl(url) {
        return api.get(`${URL}${url} `, {})
    },
    getQuerySetting(data) {
        let param = { business: data }
        return api.get(`${URL}querySetting/getByBusiness`, param)
    }
}