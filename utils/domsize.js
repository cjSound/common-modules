/*
 * @Author: 曹捷
 * @Date: 2020-12-08 09:22:26
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-08 11:52:50
 * @Description: 监听  多个 dom 宽度变化
 */
export default (function () {
    const elList = [];
    let timer = 0;
    function bind (el, next) {
        let obj = {
            el,
            callback: next,
            style: {
                width: getStyle(el, 'width'),
                height: getStyle(el, 'height'),
            }
        }
        elList.push(obj);
    }
    function remove (el) {
        elList.splice(elList.indexOf(el))
        if (elList.indexOf(el) !== -1) {
            elList.splice(elList.indexOf(el), 1);
        }
    }
    timer = setInterval(() => {
        for (let i = 0; i < elList.length; i++) {
            let dom = elList[i].el
            const style = {
                width: getStyle(dom, 'width'),
                height: getStyle(dom, 'height'),
            }
            if (!isEqul(style, elList[i].style)) {
                elList[i].style = {
                    width: style.width,
                    height: style.height,
                }
                elList[i].callback && elList[i].callback();
            }
        }
    }, 200)
    function getStyle (ele, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(ele, null)[attr];
        }
        return ele.currentStyle[attr];
    }
    function isEqul (obj1, obj2) {
        let isEqul = true;
        for (var i in obj1) {
            if (obj1[i] !== obj2[i]) {
                isEqul = false;
            }
        }
        return isEqul;
    }
    return {
        bind,
        remove,
    }
})();