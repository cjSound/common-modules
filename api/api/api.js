/*
 * @Author: 曹捷
 * @Date: 2019-08-01 14:25:13
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-17 09:05:43
 * @Description: 系统统一 请求 过滤等
 */
import request from './request'
import { Message, Loading } from "element-ui"
// import config from './../../../config/config'
var instance = function (config = {}) {
    return {
        /**
         * 获取ajax相关参数
         * 不同的系统后端返回code等可能不一致
         */
        getConfig () {
            /**
             * 系统默认的ajax配置参数
             */
            let defaultConfig = {
                // ajax请求成功 状态CODE
                successCode: '0000'
            }
            return Object.assign(defaultConfig, config.ajaxConfig)
        },
        disposeData (response) {
            let config = this.getConfig()
            if (response.code === config.successCode) {
                return response.data
            } else {
                Message({
                    type: "error",
                    message: response.errorMsg
                });
                return Promise.reject()
            }
        },
        get (url, data = {}) {
            return this.toRequestParams(url, data, { method: 'get' })
        },
        post (url, data = {}) {
            return this.toRequest(url, data, { method: 'post' })
        },
        put (url, data = {}) {
            return this.toRequest(url, data, { method: 'put' })
        },
        delete (url, data = {}) {
            return this.toRequestParams(url, data, { method: 'delete' })
        },
        upload (url, data = {}) {
            return this.toRequest(url, data, { method: 'post', isFile: true })
        },
        async tablePost (url, data = {}) {
            const response = await request({
                url: url,
                method: 'post',
                data: data
            })
            return response
        },
        // 适用于 post put  body传参
        async toRequest (url, data = {}, info = {}) {
            const response = await request({
                url: url,
                data: data,
                ...info
            })
            return this.disposeData(response)
        },
        // 适用于 get  delete  ?号拼接
        async toRequestParams (url, data = {}, info = {}) {
            const response = await request({
                url: url,
                params: data,
                ...info
            })
            return this.disposeData(response)
        },
        async download (url, data = {}, config = {}, requestMethod = 'get') {
            let downloadObj = {
                url: url,
                method: requestMethod,
                type: 'download',
                responseType: "blob",
            };
            const loading = Loading.service({
                lock: true,
                text: '下载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            if (requestMethod === 'get') downloadObj.params = data;
            else downloadObj.data = data;
            try {
                const response = await request(downloadObj)
                loading.close();
                let a = document.createElement("a");
                let blob = new Blob([response.data], {
                    type: config.mimeType || ''
                });
                a.href = URL.createObjectURL(blob);
                let filename = response.headers['filename']
                console.log('download -> filename', filename)
                if (filename) {
                    filename = decodeURIComponent(filename)
                }
                a.download = config.fileName || filename
                a.click();
            } catch (error) {
                loading.close();
            }

        }
    }
}
// export default new instance()
export default instance

// export default class {}