/*
 * @Author: 曹捷
 * @Date: 2019-08-01 14:25:13
 * @LastEditors: 徐生延
 * @LastEditTime: 2020-08-18 19:54:11
 * @Description: file content
 */
import request from './request'
import { Message } from "element-ui"
var instance = function () {
    return {
        disposeData(response) {
            if (response.code === '0000') {
                return response.data
            } else {
                Message({
                    type: "error",
                    message: response.errorMsg
                });
                return Promise.reject()
            }
        },
        get(url, data = {}) {
            return this.toRequestParams(url, data, { method: 'get' })
        },
        post(url, data = {}) {
            return this.toRequest(url, data, { method: 'post' })
        },
        put(url, data = {}) {
            return this.toRequest(url, data, { method: 'put' })
        },
        delete(url, data = {}) {
            return this.toRequestParams(url, data, { method: 'delete' })
        },
        upload(url, data = {}) {
            return this.toRequest(url, data, { method: 'post', isFile: true })
        },
        async tablePost(url, data = {}) {
            const response = await request({
                url: url,
                method: 'post',
                data: data
            })
            return response
        },
        // 适用于 post put  body传参
        async toRequest(url, data = {}, info = {}) {
            const response = await request({
                url: url,
                data: data,
                ...info
            })
            return this.disposeData(response)
        },
        // 适用于 get  delete  ?号拼接
        async toRequestParams(url, data = {}, info = {}) {
            const response = await request({
                url: url,
                params: data,
                ...info
            })
            return this.disposeData(response)
        },
        async download(url, data = {}, config = {},requestMethod='get') {
            let downloadObj = {
                url: url,
                method: requestMethod,
                type: 'download',
                responseType: "blob",
            };
            if(requestMethod === 'get') downloadObj.params = data;
            else downloadObj.data = data;
            
            const response = await request(downloadObj)
            let a = document.createElement("a");
            let blob = new Blob([response.data], {
                type: config.mimeType || ''
            });
            a.href = URL.createObjectURL(blob);
            let filename = response.headers['filename']
            if (filename) {
                filename = decodeURIComponent(filename)
            }
            a.download = config.fileName || filename
            a.click();
        }
    }
}
export default new instance()

// export default class {}