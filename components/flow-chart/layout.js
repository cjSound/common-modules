/*
 * @Author: 曹捷
 * @Date: 2020-08-14 16:32:55
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-20 09:56:30
 * @Description: file content
 */

import util from '@/common-modules/utils/utils'
export default class layout {
    constructor(domId, nodeList) {
        this.el = document.getElementById(domId)
        this.maxWidth = this.el.offsetWidth
        this.maxHeight = this.el.offsetHeight
        this.nodeList = util.util.cloneObj(nodeList)
        this.config = {
            // 模块之间最小宽度
            mixX: 120,
            mixY: 70
        }
        if (this.nodeList && this.nodeList.length > 0) {
            let itemDom = document.getElementById(this.nodeList[0].mainData.uuid)
            this.nodeWidth = Math.ceil(itemDom.offsetWidth / 10) * 10
            this.nodeHeight = Math.ceil(itemDom.offsetHeight / 10) * 10
            // 一行可以放几个元素
            this.rowNum = parseInt((this.maxWidth + this.config.mixX) / (this.nodeWidth + this.config.mixX))
            this.rankLevel()
        }
    }
    rankLevel() {
        let arr = []
        let nodeList = this.nodeList
        let rootList = nodeList.filter(item => {
            return item.prev.length === 0
        })
        this.rootNum = rootList.length
        let _this = this
        this.maxRank = 1
        function getRank(list, level) {
            list.forEach(element => {
                element.rank = level
                _this.maxRank = level > _this.maxRank ? level : _this.maxRank
                if (!_this._hasExist(arr, element)) {
                    arr.push(element)
                    getRank(_this.getNextNodes(element), level + 1)
                }
            });
        }
        getRank(rootList, 1)
        this.nodeList = arr
        console.log('layout -> rankLevel -> arr', arr)
    }
    // 计算每个位置
    judgePostion() {
        let _this = this
        let arr = []
        // 大概做几行
        let row = parseInt(this.nodeList.length / this.rowNum)
        let rootList = nodeList.filter(item => {
            return item.prev.length === 0
        })
        let rootY = this.nodeHeight
        rootList.forEach(element => {
            element.mainData.pageX = 30
            element.mainData.pageY = rootY
            rootY += this.nodeHeight * 3
            arr.push(element)
            setChildPos(element)
        });
        function setChildPos(parentRoot) {
            let nextNode = _this.getNextNodes(parentRoot)
            let nextX = parentRoot.mainData.pageX + _this.config.mixX
            if (nextNode.length === 1) {
                nextNode[0].mainData.pageY = parentRoot.mainData.pageY
                nextNode[0].mainData.pageX = nextX
                arr.push(nextNode[0])
            } else if (nextNode.length === 2) {
                let pageY = parentRoot.pageY - _this.nodeHeight
                nextNode.forEach(element => {
                    element.mainData.pageX = nextX
                    element.mainData.pageY = pageY
                    pageY = parentRoot.pageY + _this.nodeHeight
                });
            } else if (nextNode.length > 2) {
                let pageY = parentRoot.pageY - _this.nodeHeight
                nextNode.forEach(element => {
                    element.mainData.pageX = nextX
                    element.mainData.pageY = pageY
                    pageY += _this.nodeHeight * 2
                })
            }
        }
    }
    /**
     * 是否存在当前节点   当前节点是否已经计算过了
     * @param {*} arr 
     * 缓存数组
     * @param {*} element 
     * 节点对象
     */
    _hasExist(arr, element) {
        let findList = arr.find(item => {
            return item.mainData.uuid === element.mainData.uuid
        })
        return findList && findList.length > 0 ? true : false
    }
    /**
     * 获取  下一级节点 List集合
     * @param {*} parentRoot 
     */
    getNextNodes(parentRoot) {
        if (parentRoot.next && parentRoot.next.length > 0) {
            let nextArr = []
            parentRoot.next.forEach(parentRoot => {
                nextArr.push(parentRoot.uuid)
            });
            return nodeList.filter(item => {
                return nextArr.indexOf(item.mainData.uuid) !== -1
            })
        }
        return []
    }


}