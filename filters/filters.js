/*
 * @Author: 曹捷
 * @Date: 2020-06-02 10:27:20
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-28 15:52:24
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
        return value === undefined ? '' : value
    }
}
