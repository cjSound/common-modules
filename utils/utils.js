/*
 * @Author: 曹捷
 * @Date: 2020-04-22 17:02:31
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-04 16:16:54
 * @Description: 系统工具类
 */
const util = {}

util.util = {
    /*克隆一个对象*/
    cloneObj (obj) {
        var newObj = {};
        let type = Object.prototype.toString.call(obj)
        if (type.indexOf('Array') !== -1) {
            newObj = [];
        }
        for (var key in obj) {
            var val = obj[key];
            newObj[key] = (val !== null && typeof val === 'object') ? util.util.cloneObj(val) : val;
        }
        return newObj;
    },
    cleanObj (obj) {
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
    },
    getArrayIndexByOptions: function (arry, value, optionList) {
        for (var i = 0; i < arry.length; i++) {
            var res = true;
            for (var it in optionList) {
                if (arry[i][optionList[it]] != value[optionList[it]]) {
                    res = false;
                }
            }
            if (res) {
                return i;
            }
        }
        return -1;
    },
    getArrayObjectByValues: function (arry, value, option) {
        var arr = arguments;
        for (let i = 0; i < arry.length; i++) {
            if (arr.length > 3) {
                var find = true;
                for (var index = 2; index < arr.length; index++) {
                    if (arry[i][arr[index]] != value[arr[index]]) {
                        find = false;
                    }
                }
                if (find) return arry[i];
            } else {
                if (arry[i][option] == value[option]) {
                    return arry[i];
                }
            }

        }
        return null;
    },
    /*对敏感信息 进行*号处理  比如id  身份证号,手机号*/
    infoPrivacy (el) {
        let ht = el.innerHTML;
        let ls = el.innerHTML.length;
        let rep, length = 0;
        if (ls > 10) {
            rep = ht.substring(0, ls - 5);
            length = ls - 5;
        } else if (ls < 4) {
            rep = ht.substring(1, ls - 1);
            length = ls - 2;
        } else {
            rep = ht.substring(2, ls - 2);
            length = ls - 4;
        }
        let repl = '';
        for (let i = 0; i < length; i++) {
            repl += '*';
        }
        ht = ht.replace(rep, repl);
        el.innerHTML = ht;
    },
    /**
     * 保留原对象基础属性，集成新对象里面的所有的属性值，属性值相同的替换成新属性
     * source {a:1,b:1,c:1}  newdata{b:1,c:1,d:1}  = {a:1,b:2,c:2,d:1}
     * @param {*} source 
     * 原数据对象
     * @param {*} newdata 
     * 要赋值给原数据对象的内容
     */
    extendObj (source, newdata) {
        if (source == null) return;
        for (var property in newdata) {
            if (typeof newdata[property] === "object") {
                if (source[property] == null) {
                    if (newdata[property] instanceof Array) {
                        source[property] = [];
                    } else {
                        source[property] = {};
                    }
                }
                this.extendObj(source[property], newdata[property]);
            } else {
                source[property] = newdata[property];
            }

        }
        return source;
    },
    /**
     * 保留原对象基础属性，新对象里面对应的属性值有值的情况下进行更新
     * source {a:1,b:1,c:1}  newdata{b:1,c:1,d:1}  = {a:1,b:2,c:2}
     * @param {*} source 
     * 原数据对象
     * @param {*} newdata 
     * 要赋值给原数据对象的内容
     */
    assignObj (source, newdata) {
        if (source == null) return;
        for (var property in source) {
            if (typeof source[property] === "object" && typeof newdata[property] === "object") {
                this.assignObj(source[property], newdata[property]);
            } else if (newdata[property] !== null && newdata[property] !== '' && newdata[property] !== undefined) {
                source[property] = newdata[property];
            }
        }
        return source;
    },
    /*在传递数据的时候对对象进行中文编码处理*/
    encodeParemt (paremt) {
        var a = {};
        for (var i in paremt) {
            a[i] = encodeURI(paremt[i]);
        }
        return a;
    },
    /**
     * 获取url后面的参数  返回json
     */
    getParams: function () {
        var url = window.location.hash;
        var theRequest = null;
        if (url.indexOf("?") != -1) {
            url = url.split("?")[1];
            theRequest = new Object();
            var str = url.substr(0);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        if (theRequest != null)
            return theRequest;
        else
            return null;
    },
    //数组去重
    ArrayUnique: function (arr) {
        var res = [];
        var json = {};
        for (var i = 0; i < arr.length; i++) {
            if (!json[arr[i]]) {
                res.push(arr[i]);
                json[arr[i]] = 1;
            }
        }
        return res;
    },
    parseParam (queryConfig, baseUrl) { //吧对象转为url字符拼接
        console.log('baseUrl: ', baseUrl);
        var _str = "";
        for (var o in queryConfig) {
            if (queryConfig[o] != -1) {
                _str += o + "=" + queryConfig[o] + "&";
            }
        }
        var _str = _str.substring(0, _str.length - 1);
        if (baseUrl) {
            let icon = baseUrl.indexOf('?') !== -1 ? '' : '?'
            return `${baseUrl}${icon}${_str}`
        }
        return _str;

    },

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
util.array = {
    treeToArray (nodes, childrenName) {
        var r = [];
        if (Array.isArray(nodes)) {
            for (var i = 0, l = nodes.length; i < l; i++) {
                r.push(nodes[i]); // 取每项数据放入一个新数组
                if (Array.isArray(nodes[i][childrenName]) && nodes[i][childrenName].length > 0)
                    // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
                    r = r.concat(util.array.treeToArray(nodes[i][childrenName], childrenName));
                delete nodes[i][childrenName]
            }
        }
        return r;
    },
    clearNull (list) {
        let res = []
        list.forEach(element => {
            if (element)
                res.push(element)
        });
        return res
    },
    /**数组根据数组对象中的某个属性值进行排序的方法 
   * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
   * @param attr 排序的属性 如number属性
   * @param rev true表示升序排列，false降序排序
   * */
    sortBy: function (attr, rev) {
        //第二个参数没有传递 默认升序排列
        if (rev == undefined) {
            rev = 1;
        } else {
            rev = (rev) ? 1 : -1;
        }

        return function (a, b) {
            a = a[attr];
            b = b[attr];
            if (a < b) {
                return rev * -1;
            }
            if (a > b) {
                return rev * 1;
            }
            return 0;
        }
    }
}
export default util;
