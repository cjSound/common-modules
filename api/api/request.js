/*
 * @Author: 曹捷
 * @Date: 2019-08-01 14:25:13
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-16 17:25:26
 * @Description: ajax 请求
 */
import axios from 'axios'
import { userRole } from './../../utils/auth'
import { Message } from "element-ui"
import ajax from './../index'
// 创建axios实例
const service = axios.create({
    // baseURL: URL, // api的base_url
    timeout: 60000, // 请求超时时间
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
})

// request拦截器
service.interceptors.request.use(config => {
    // 是否要更改header内容
    if (config.isFile) {
        config.headers['Content-Type'] = 'multipart/form-data'
    }
    if (typeof config.type !== 'undefined' && config.type == 'download') {
        config['responseType'] = 'blob'
    }
    // 用户标识判断
    if (config.params) {
        config.data = {
            ...config.data,
            ...config.params
        }
    }
    let userInfo = userRole.get()
    if (userInfo) {
        let user = JSON.parse(userInfo)
        if (user && user.accessToken) {
            config.headers['Authorization'] = user.accessToken
            config.headers['UserId'] = user.userId
        }
    }
    config.headers['SystemType'] = 'manager'
    // 签名
    if (config.method === 'post' || config.method === 'put') {
        config.headers['Content-Type'] = 'application/json'
        // 设置参数拼接方式
    }
    return config
}, error => {
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            let res = response.data
            if (res.code === '0004') {
                // token 已经过期，重新拉取新的token再重新发送之前请求
                let config = response.config
                var backoff = new Promise(function (resolve) {
                    let userInfo = userRole.get()
                    let user = JSON.parse(userInfo)
                    let params = {
                        userId: user.userId,
                        refleshToken: user.refleshToken
                    }
                    ajax.methods.reflesh(params).then(res => {
                        user.accessToken = res.accessToken
                        // util.cookie.set('user', user)
                        userRole.set(user)
                        resolve()
                    })
                })
                return backoff.then(function () {
                    return service(config)
                })
            } else if (res.code === '0005' || res.code === 'LOGIN.001') {
                // 登陆超时 或者是token异常 ，跳登陆页面
                Message.error(res.errorMsg)
                ajax.router.push({
                    path: '/login'
                })
                // router.push({ path: '/login' })
                Promise.reject()
            } else {
                if (response.headers['content-type'].indexOf('octet-stream') !== -1) {
                    return response
                } else {
                    return response.data
                }

            }
        } else {
            Message({
                type: "error",
                message: response.data.errorMsg
            })
            Promise.reject()
            // return response
        }
    },
    error => {
        // console.log('err1111111111111', error) // for debug
        // Message({
        //     type: "error",
        //     message: error
        // });
        Promise.reject(error)
        return {
            code: '1',
            errorMsg: '请求异常，请稍后重试'
        }
        // Promise.reject(error)
        // // 处理网络异常，重新请求
        // var config = error.config
        // // If config does not exist or the retry option is not set, reject
        // if (!config || !config.retry) return Promise.reject(error)
        // // Set the variable for keeping track of the retry count
        // config.__retryCount = config.__retryCount || 0
        // // Check if we've maxed out the total number of retries
        // if (config.__retryCount >= config.retry) {
        //     // Reject with the error
        //     return Promise.reject(error)
        // }

        // // Increase the retry count
        // config.__retryCount += 1
        // // Create new promise to handle exponential backoff
        // var backoff = new Promise(function (resolve) {
        //     setTimeout(function () {
        //         resolve()
        //     }, config.retryDelay || 1)
        // })
        // // Return the promise in which recalls axios to retry the request
        // return backoff.then(function () {
        //     return axios(config)
        // })
    }
)

export default service