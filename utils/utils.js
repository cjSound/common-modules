/*
 * @Author: 曹捷
 * @Date: 2020-04-22 17:02:31
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-02 13:30:27
 * @Description: 系统工具类
 */
const util = {}

util.util = {
    /*克隆一个对象*/
    cloneObj(obj) {
        var newObj = {};
        if (obj instanceof Array) {
            newObj = [];
        }
        for (var key in obj) {
            var val = obj[key];
            newObj[key] = (val !== null && typeof val === 'object') ? util.util.cloneObj(val) : val;
        }
        return newObj;
    },
    cleanObj(obj) {
        for (var key in obj) {
            if (obj[key] instanceof Array) {
                obj[key] = [];
            } else if (obj[key] instanceof Number) {
                obj[key] = 0;
            } else {
                obj[key] = '';
            }

        }
    },
    /**
     * 数组删除指定的内容
     */
    removeByValue: function (arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
        return arr;
    }
}
/**
 * @description cookie模块
 */
util.cookie = {
    set: function (c_name, value, expiredays) {
        var exdate = new Date()
        if (!expiredays) {
            document.cookie = c_name + "=" + escape(JSON.stringify(value)) + ";path=/;";
        } else {
            exdate.setDate(exdate.getDate() + expiredays * 1);
            document.cookie = c_name + "=" + escape(JSON.stringify(value)) +
                ";expires=" + exdate.toGMTString()
        }
    },
    get: function (c_name) {
        var res = "";
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                res = unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return res;
    },
    del: function (c_name) {
        var exp = new Date();
        exp.setDate(exp.getDate() - 1);
        var cval = this.get(c_name);
        if (cval != null) {
            document.cookie = c_name + "=" + escape(cval) + ";expires=" + exp.toGMTString() + ";path=/;";
        }
    },
    clear: function () {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                this.del(keys[i]);
            }
        }
    }
};
util.localstorage = {
    getStarage: function () {
        return localStorage;
    },
    /**
     * @description 存储key-value
     * @param {String} key 存储的键值
     * @param {String} value 存储的内容
     */
    put: function (key, value) {
        this.getStarage().removeItem(key);
        var curTime = new Date().getTime();
        this.getStarage().setItem(key, JSON.stringify({ data: value, time: curTime }));
    },
    /**
     * @description 通过key值检索键值
     * @param {String} key 存储的键值
     * @return {String}
     */
    get: function (key, exp, callback) {
        var data = this.getStarage().getItem(key);
        if (data == null) {
            return null;
        }
        var dataObj = JSON.parse(data);
        if (exp == null) {
            exp = 365;
        }

        if (dataObj != null && dataObj != '') {
            var time = new Date().getTime() - dataObj.time;
            var data = time / 1000 / 60 / 60;
            if (data > exp) {
                console.log('信息已过期');
                if (callback != null) {
                    callback();
                }
                util.localstorage.remove(key)
                return null;
            } else {
                return dataObj.data;
            }
        } else {
            return null;
        }

    },
    /**
     * @description 通过key值删除键值对
     * @param {String} key 存储的键值
     */
    remove: function (key) {
        this.getStarage().removeItem(key);
    },
    /**
     * @description 获取storage中保存的键值对的数量
     * @return {Number}
     */
    getItemCount: function () {
        return this.getStarage().getLength();
    },
    /**
     * @description 获取键值对中指定索引值的key值
     * @return {String}
     */
    key: function (index) {
        return this.getStarage().key(index);
    },
    /**
     * @description 清除应用所有的键值对,不建议使用
     */
    clearAll: function () {
        var user = util.User.getUser();
        this.getStarage().clear();
        if (user != null) {
            util.User.setUser(user);
        }
    }
};
/**
 * 
 */
util.export = {
    exportPdf: function (domId) {
        return new Promise(function (resolve, reject) {
            var targetDom = $(`#${domId}`)
            console.log('targetDom', targetDom)
            let swidth = 1000
            targetDom[0].style.width = `${swidth}px`
            setTimeout(() => {
                var copyDom = targetDom.clone()
                let dom = copyDom[0]
                copyDom.width(targetDom.width() + 'px')
                copyDom.height(targetDom.height() + 'px')
                $('body').append(copyDom)
                html2canvas(dom, {
                    scale: 2,
                    type: 'view',
                    width: swidth,
                    height: dom.scrollHeight,
                    useCORS: true
                }).then(canvas => {
                    var contentWidth = canvas.width
                    var contentHeight = canvas.height
                    var pageHeight = (contentWidth / 592.28) * 841.89
                    var leftHeight = contentHeight
                    //页面偏移
                    var position = 0
                    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                    var imgWidth = 595.28
                    var imgHeight = (595.28 / contentWidth) * contentHeight
                    var pageData = canvas.toDataURL('image/jpeg', 1.0)
                    var pdf = new jsPDF('', 'pt', 'a4')

                    //放大会清晰一点
                    pdf.internal.scaleFactor = 1.33
                    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                    //当内容未超过pdf一页显示的范围，无需分页
                    if (leftHeight < pageHeight) {
                        pdf.addImage(pageData, 'JPEG', 5, 0, imgWidth, imgHeight)
                    } else {
                        while (leftHeight > 0) {
                            pdf.addImage(
                                pageData,
                                'JPEG',
                                5,
                                position + 0,
                                imgWidth,
                                imgHeight
                            )
                            leftHeight -= pageHeight
                            position -= 841.89
                            //避免添加空白页
                            if (leftHeight > 0) {
                                pdf.addPage()
                            }
                        }
                    }
                    copyDom.remove()
                    targetDom[0].style.width = ''
                    resolve(pdf);
                })
            }, 200)
        });
    }
}
export default util;
