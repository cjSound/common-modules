/*
 * @Author: 曹捷
 * @Date: 2020-08-14 16:32:55
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-19 16:46:33
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
            this.nodeWidth = itemDom.offsetWidth
            this.nodeHeight = itemDom.offsetHeight
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
                let findList = arr.find(item => {
                    return item.mainData.uuid === element.mainData.uuid
                })
                if (!findList || findList.length === 0) {
                    arr.push(element)
                    if (element.next && element.next.length > 0) {
                        let nextArr = []
                        element.next.forEach(element => {
                            nextArr.push(element.uuid)
                        });
                        getRank(nodeList.filter(item => {
                            return nextArr.indexOf(item.mainData.uuid) !== -1
                        }), level + 1)
                    }
                }
            });
        }
        getRank(rootList, 1)
        this.nodeList = arr
        console.log('layout -> rankLevel -> arr', arr)
    }
    // 计算每个位置
    judgePostion() {
        // 大概做几行
        let row = parseInt(this.nodeList.length / this.rowNum)
        let rootList = nodeList.filter(item => {
            return item.prev.length === 0
        })

        function getRank(list, level) {

        }
    }



}