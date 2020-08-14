<!--
 * @Author: 曹捷
 * @Date: 2020-08-10 21:28:07
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-14 11:53:06
 * @Description: file content
-->
<template>
  <div :id="itemInfo.mainData.uuid" :style="{left:itemInfo.mainData.pageX,top:itemInfo.mainData.pageY}" class="flowNode">
    <el-card shadow="hover">
      <div class="clearfix header" slot="header">
        <span>
          {{itemInfo.mainData.name}}
          <i class="el-icon-loading m-l-5" v-if="actived"></i>
        </span>
        <span class="f-r operation" v-if="!actived">
          <i @click="activeStart" class="pointer el-icon-video-play m-r-10"></i>
          <i @click="remove" class="pointer el-icon-delete"></i>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import instance from './instance'
import { targetEndpoint, sourceEndpoint } from './style'
import { jsPlumb } from 'jsPlumb'
export default {
  props: {
    itemInfo: {
      type: Object,
    },
    // 新增或者只是查看 add  show
    type: {
      type: String,
      default: 'add',
    },
    index: {
      type: Number,
    },
  },
  inject: ['panelOption'],
  data() {
    return {
      targetEndpoint: '',
      sourceEndpoint: '',
      actived: false,
    }
  },
  methods: {
    /**
     * 初始化样式  是否可以编辑等
     */
    initStyle() {
      this.targetEndpoint = targetEndpoint
      this.sourceEndpoint = sourceEndpoint
      if (this.type == 'show') {
        this.sourceEndpoint.isSource = false
        this.targetEndpoint.isTarget = false
      }
    },
    // 组件瞄点
    initChart() {
      let _this = this
      this.itemInfo.mainData.sourceAnchors.forEach((element) => {
        let uuid = this.itemInfo.mainData.uuid + element
        instance.addEndpoint(this.itemInfo.mainData.uuid, this.sourceEndpoint, {
          anchors: element,
          uuid: uuid,
        })
      })
      this.itemInfo.mainData.targetAnchors.forEach((element) => {
        let uuid = this.itemInfo.mainData.uuid + element
        instance.addEndpoint(this.itemInfo.mainData.uuid, this.targetEndpoint, {
          anchors: element,
          uuid: uuid,
        })
      })
      if (this.type !== 'show') {
        let drag = instance.draggable(this.itemInfo.mainData.uuid, {
          // containment: 'parent',
          grid: [10, 10],
          drag: function (event, ui) {
            let info = _this.panelOption.movePos
            if (info[0] != event.pos[0] || info[1] != event.pos[1]) {
              _this.panelOption.movePos = event.pos
            }
          },
          stop: function (event, ui) {
            let parant = event.el.parentNode
            let rightPostion = event.el.offsetWidth + event.pos[0]
            if (rightPostion > parant.offsetWidth) {
              _this.panelOption.width = `${rightPostion + 20}px`
            }
            _this.panelOption.movePos = [0, 0]
            _this.itemInfo.mainData.pageX = `${event.pos[0]}px`
            _this.itemInfo.mainData.pageY = `${event.pos[1]}px`
            parant.parentNode.scrollLeft = rightPostion + 20
          },
        })
      }
      //  instance.repaintEverything(); // 重绘
      this.$nextTick(() => {
        this.initConnect()
      })
    },
    // 初始化连线
    initConnect() {
      this.itemInfo.next &&
        this.itemInfo.next.forEach((element) => {
          instance.connect({
            uuids: [
              this.itemInfo.mainData.uuid + element.souceType,
              element.uuid + element.targetType,
            ],
            editable: false,
          })
        })
    },
    remove() {
      this.$confirm('是否删除当前组件', '提示').then((res) => {
        this.$emit('remove', this.index)
        instance.remove(this.itemInfo.mainData.uuid)
        this.$nextTick(() => {})
      })
    },

    getNextConnects() {
      let lines = instance.getAllConnections()
      let next = this.$util.array.clearNull(
        lines.map((item) => {
          if (item.sourceId === this.itemInfo.mainData.uuid) {
            return item
          }
        })
      )
      return next
    },
    // 开始动画
    activeStart() {
      let next = this.getNextConnects()
      this.actived = true
      next.forEach((edge) => {
        edge.canvas.classList.add('active')
      })
      // setTimeout(() => {
      //   this.activeEnd()
      // }, 5000)
    },
    // 结束动画
    activeEnd() {
      let next = this.getNextConnects()
      this.actived = false
      next.forEach((edge) => {
        edge.canvas.classList.remove('active')
      })
    },
  },
  mounted() {
    this.initStyle()
    this.initChart()
  },
}
</script>

<style lang="scss">
.flowNode {
  width: 200px;
  position: absolute;
  .header {
    .operation {
      display: none;
    }
  }
  .header:hover {
    .operation {
      display: block;
    }
  }
  .el-card {
    border: 0;
    border: 1px solid #289de9;
  }
  .el-card__header {
    background: #1c9bec;
    color: #fff;
    font-size: 14px;
    padding: 15px 10px;
  }
}
</style>