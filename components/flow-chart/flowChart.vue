<!--
 * @Author: 曹捷
 * @Date: 2020-08-11 11:33:38
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-14 11:52:34
 * @Description: file content
-->
<template>
  <div @dragover="dragoverHandle" @drop="dropHandle" class="mainContainer scrollBar">
    <div :id="flowID" :style="{width:panelOption.width}" @click="clickBgHandle" class="flow-main flow-main-content">
      <div :style="{left:moveInfo.x +'px'}" class="line-x" v-if="moveInfo.x"></div>
      <div :style="{top:moveInfo.y +'px'}" class="line-y" v-if="moveInfo.y"></div>
      <flowNode
        :index="index"
        :itemInfo="item"
        :key="item.mainData.uuid"
        :ref="item.mainData.uuid"
        :type="flowType"
        @remove="removeNode"
        v-for="(item,index) in nodeList"
      ></flowNode>
    </div>
  </div>
</template>

<script>
import flowNode from './flowNode'
import { targetEndpoint, sourceEndpoint } from './style'
import instance from './instance'
export default {
  components: { flowNode },
  props: {
    initData: {
      type: Array,
    },
  },
  provide() {
    return { panelOption: this.panelOption }
  },
  data() {
    return {
      isShowNode: false,
      nodeList: [],
      panelOption: {
        width: '100%',
        movePos: [],
      },
      moveInfo: {},
      flowType: 'add',
      flowID: 'flowMain-' + new Date().getTime(),
    }
  },
  watch: {
    'panelOption.movePos'(value, oldVal) {
      let res = {}
      let x = this.panelOption.movePos[0]
      let y = this.panelOption.movePos[1]
      let xInfo = this.nodeList.find((item) => {
        return item.mainData.pageX.indexOf(x) !== -1
      })
      let yInfo = this.nodeList.find((item) => {
        return item.mainData.pageY.indexOf(y) !== -1
      })
      if (xInfo) {
        res.x = x
      }
      if (yInfo) res.y = y
      this.moveInfo = res
      console.log('res', res)
    },
  },
  computed: {},
  methods: {
    init() {
      instance.setContainer(this.flowID)
      this.initShowFlow()
      this.bindEvent()
    },
    // 流程图回显
    initShowFlow() {
      if (this.initData) {
        this.flowType = 'show'
        this.nodeList = this.initData
        instance.Defaults.ReattachConnections = true
      } else {
        // panZoom.init()
      }
    },
    // 同步坐标
    sysnChartPostion() {
      this.nodeList.forEach((element) => {
        let dom = document.getElementById(element.mainData.uuid).style
        element.mainData.pageX = dom.left
        element.mainData.pageY = dom.top
      })
    },
    // 保存位置连线信息
    getFlowLine() {
      this.sysnChartPostion()
      let lines = instance.getAllConnections()
      // let dataList = this.$util.util.cloneObj(this.nodeList)
      this.nodeList.forEach((element) => {
        // 当前节点是否有上级
        let prev = this.$util.array.clearNull(
          lines.map((item) => {
            if (item.targetId === element.mainData.uuid) {
              return item.sourceId
            }
          })
        )
        let next = this.$util.array.clearNull(
          lines.map((item) => {
            if (item.sourceId === element.mainData.uuid) {
              return {
                uuid: item.targetId,
                souceType: item.endpoints[0].anchor.type,
                targetType: item.endpoints[1].anchor.type,
              }
            }
          })
        )
        Object.assign(element, { prev, next })
        // let info = { mainData, prev, next }
        // lineList.push(info)
      })
    },
    dragoverHandle(ev) {
      ev.preventDefault()
    },
    // 拖拽组件进入面板
    dropHandle(ev) {
      let comptId = ev.dataTransfer.getData('id')
      if (comptId) {
        let defultConfig = {
          //   被连接点
          targetAnchors: ['TopCenter', 'LeftMiddle'],
          // 连接点
          sourceAnchors: ['BottomCenter', 'RightMiddle'],
        }
        let pagex = ev.pageX - this.$el.offsetLeft

        pagex = Math.round(pagex / 10) * 10
        let pageY = ev.pageY - this.$el.offsetTop
        pageY = Math.round(pageY / 10) * 10
        this.nodeList.push({
          mainData: Object.assign(defultConfig, {
            pageX: `${pagex}px`,
            pageY: `${pageY}px`,
            comptId,
            name: ev.dataTransfer.getData('text'),
            uuid: 'item-' + new Date().getTime(),
          }),
        })
      }
    },
    bindEvent() {},
    clickBgHandle() {
      this.isShowNode = false
    },
    removeNode(index) {
      this.nodeList.splice(index, 1)
    },
    // 开始执行
    startMove() {
      this.getFlowLine()
      let list = this.nodeList
      let item = list.find((item) => {
        return item.prev.length === 0 && item.next.length > 0
      })
      let lines = instance.getAllConnections()
      let _this = this
      return new Promise((rej, fail) => {
        let startNum = 0
        startCompont(item)
        function startCompont(cptItem) {
          startNum++
          _this.$refs[cptItem.mainData.uuid][0].activeStart()
          // 模拟数据进行请求
          // 也可以将请求放在node组件里面执行
          setTimeout(() => {
            _this.$refs[cptItem.mainData.uuid][0].activeEnd()
            let hasKeys = {}
            cptItem.next.forEach((element) => {
              hasKeys[element.uuid] = element.uuid
            })
            Object.keys(hasKeys).forEach((element) => {
              startCompont(
                list.find((item) => {
                  return item.mainData.uuid === element
                })
              )
            })
            startNum--
            if (startNum === 0) {
              rej()
            }
          }, 5000)
        }
      })
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="scss">
.flow-main-content {
  background-image: linear-gradient(
      90deg,
      rgba(180, 180, 180, 0.15) 10%,
      rgba(0, 0, 0, 0) 10%
    ),
    linear-gradient(rgba(180, 180, 180, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 10px 10px;

  .line-x {
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    bottom: 0;
    background: #29d5cdd6;
  }
  .line-y {
    position: absolute;
    height: 1px;
    left: 0;
    right: 0;
    background: #29d5cdd6;
  }
}
.flow-main {
  .sourcePoint .tooltip {
    .tooltip-arrow {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 8px solid black;
      margin: 0 auto;
    }
    .tooltip-inner {
      background: black;
      color: #fff;
      padding: 8px;
      border-radius: 4px;
      white-space: nowrap;
      font-size: 12px;
    }
  }
}

.flow-main .targetPoint .tooltip {
  .tooltip-arrow {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid black;
    margin: 0 auto;
    position: absolute;
    bottom: 2px;
  }
  .tooltip-inner {
    background: black;
    color: #fff;
    padding: 8px;
    border-radius: 4px;
    white-space: nowrap;
    font-size: 12px;
    position: relative;
    top: -10px;
  }
}

.fy_node {
  position: absolute;
  border: 1px solid #289de9;
  width: 170px;
  height: 34px;
  line-height: 32px;
  border-radius: 4px;
  font-size: 14px;
  cursor: move;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
}
.fy_node.fy_node_selected {
  background: #e2f2ff;
}
.fy_node:hover {
  border-width: 2px;
  line-height: 30px;
  z-index: 10;
}

.fy_node:hover + .jtk-endpoint {
  z-index: 10;
}

.fy_node:hover + .jtk-endpoint + .jtk-endpoint {
  z-index: 10;
}

.fy_node:hover + .jtk-endpoint + .jtk-endpoint + .jtk-endpoint {
  z-index: 10;
}

.fy_node:hover + .jtk-endpoint + .jtk-endpoint + .jtk-endpoint + .jtk-endpoint {
  z-index: 10;
}

.fy_node:hover
  + .jtk-endpoint
  + .jtk-endpoint
  + .jtk-endpoint
  + .jtk-endpoint
  + .jtk-endpoint {
  z-index: 10;
}

.fy_node:hover
  + .jtk-endpoint
  + .jtk-endpoint
  + .jtk-endpoint
  + .jtk-endpoint
  + .jtk-endpoint
  + .jtk-endpoint {
  z-index: 10;
}

.fy_node .blue_line {
  position: absolute;
  top: 2px;
  left: 3px;
  border-radius: 2px;
  padding: 14px 2px;
  background: #1c9bec;
}
.fy_node:hover .blue_line {
  top: 1px;
  left: 2px;
}
.fy_node .content i {
  position: relative;
  top: -10px;
  color: rgb(0, 205, 234);
  margin-left: 15px;
  margin-right: 15px;
}
.fy_node .content span {
  display: inline-block;
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fy_node:hover .content i {
  margin-left: 14px;
  margin-right: 15px;
  top: -9px;
}
.node-state {
  top: -8px !important;
  font-size: 20px;
  margin-left: 8px !important;
}
.fy_node:hover .node-state {
  top: -7px !important;
  font-size: 20px;
}
.fy_contextMenu {
  margin: 0;
  padding: 5px 0;
  min-width: 170px;
  position: absolute;
  list-style: none;
  background-color: hsla(0, 0%, 100%, 0.98);
  border: 1px solid #eee;
  -webkit-box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 9999;
}
.fy_contextMenu li {
  font-size: 12px;
  color: #333;
  height: 26px;
  line-height: 26px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  -webkit-transition: background-color 0.1s ease;
  -o-transition: background-color 0.1s ease;
  transition: background-color 0.1s ease;
}
.fy_contextMenu li:hover {
  background-color: #e8f6ff;
  color: black;
}
.fy_contextMenu li span {
  margin-left: 10px;
}
.jtk-drag-select * {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.jtk-endpoint.sourcePoint {
  z-index: 9;
  cursor: crosshair;
}
.jtk-connector {
  cursor: default;
}
.targetPoint.active:not(.jtk-endpoint-connected) svg circle {
  fill: #00cdea;
}
.jtk-connector.active path {
  animation-name: ring;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  stroke-dasharray: 5;
}
@keyframes ring {
  from {
    stroke-dashoffset: 50;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>