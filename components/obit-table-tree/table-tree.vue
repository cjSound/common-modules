<template>
  <div style="position: relative;">
    <div class="table-tree-main" ref="table-tree-main">
      <div :style="{width:shadowWidth}" class="box-shadow-right" v-if="shadowWidth"></div>
      <div :class="{'table-tree-fixed-right':widthMax}" :style="{width:widthMax+'px'}" class="table-tree">
        <div class="tab-row table-tree-header" v-if="widthArray.length>0">
          <div :style="{'width':widthArray[0]}" class="row-item">{{title}}</div>
          <div :key="index" :style="{'width':widthArray[index+1]}" class="row-item" v-for="(item,index) in titleArray">{{item}}</div>
        </div>
        <table-body
          :dataList="dataList"
          :id="id"
          :keys="keys"
          :keytokin="keytokin"
          :left="left"
          :pageTotal="dataList.length"
          :parentKey="parentKey"
          :pid="rootKey"
          :slotMap="$scopedSlots"
          :step="left"
          :width-array="widthArray"
          class="tabody"
          v-if="open"
        ></table-body>
      </div>
    </div>
  </div>
</template>

<script>
import store from './store'
import { mapGetters } from 'vuex'
import tableBody from './table-body'
export default {
  components: { tableBody },
  store,
  computed: {
    ...mapGetters(['pageChange', 'plugNum'])
  },
  watch: {
    pageChange: {
      handler: function(newVal) {
        if (newVal.keys.keytokin == this.keytokin) {
          this.$emit('pagechange', newVal.keys)
        }
      },
      deep: true
    }
  },
  props: {
    //key展示的标题
    title: {
      type: String,
      default: ''
    },
    //唯一id
    id: {
      type: String,
      default: 'id'
    },
    //根节点展示的父节点id
    rootKey: {
      type: String,
      default: ''
    },
    left: {
      type: Number,
      default: 5
    },
    page: {
      type: Number,
      default: 10
    },
    //展示的名称
    name: {
      type: String,
      default: 'name'
    },
    //父节点字段名称
    parentKey: {
      type: String,
      default: 'pid'
    },
    childrenNum: {
      type: String,
      default: 'childrenNum'
    },
    childenname: {
      type: String,
      default: 'children'
    },
    //是否有默认展开配置 需要则去查找
    expanded: {
      type: String,
      default: ''
    },
    // 设置表格内容宽度，有几列就要有多少个对应的数据，默认是均等划分
    // 内容可以是数字，数字则按照百分比显示宽度
    // 内容可以是PX，若当前总PX宽度溢出表格实际宽度，则显示溢出设置的固定宽度
    // 若设置的固定宽度小于实际表格宽度，则按照对应设置的固定px实现百分比划分
    widths: {
      type: Array,
      default: function() {
        return []
      }
    },
    closed: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      widthArray: [],
      titleArray: [],
      open: false,
      keytokin: '',
      keys: [],
      widthMax: '', //只有固定px时，内容溢出,才显示溢出的宽度，否则都是按照固定比例
      shadowWidth: '' //只有固定px时，内容溢出，超出总table范围 ，显示右侧阴影宽度
    }
  },
  methods: {
    initConfig() {
      this.$store.commit('setPageNum', this.page)
      this.$store.commit('setLeft', this.left)
      this.$store.commit('setName', this.name)
      this.$store.commit('setChildenname', this.childenname)
      this.$store.commit('setWidths', this.widths)
      this.$store.commit('setExpanded', this.expanded)
      this.$store.commit('setClosed', this.closed)
      this.$store.commit('setChildrenNum', this.childrenNum)
      this.open = true
    }
  },
  mounted() {
    this.keytokin = 'tabletree-' + this.plugNum
    this.$store.commit('setPlugNum')
    var slots = this.$scopedSlots
    this.titleArray = Object.keys(slots)
    this.$nextTick(() => {
      if (this.widths.length == 0) {
        var num = this.titleArray.length + 1
        for (var i = 0; i < num; i++) {
          this.widthArray.push(100 / num + '%')
        }
      } else {
        // 当内容超出100%  采用固定px方式
        let arr = this.widths.concat([])
        // 直接是按照固定比例模式
        arr.forEach((element, index) => {
          arr[index] = typeof element === 'number' ? element + '%' : element
        })
        // 设置了固定的值
        if (arr[0].indexOf('px') !== -1) {
          let width = 0
          arr.forEach(element => {
            width += parseInt(element.replace('px', ''))
          })
          // 设置的宽度溢出 实际宽度 按照溢出的宽度设置
          if (width > this.$refs['table-tree-main'].offsetWidth) {
            this.shadowWidth = arr[arr.length - 1]
            this.widthMax = width
          } else {
            // 没有溢出 还是按照固定比例计算
            arr.forEach((element, index) => {
              arr[index] =
                (parseInt(element.replace('px', '')) * 100) / width + '%'
            })
          }
        }
        this.widthArray = arr
      }
      this.initConfig()
    })
  }
}
</script>

<style lang="scss">
@import './assets/iconfont.css';
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
}
.table-tree-main {
  overflow: auto;
}
.box-shadow-right {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
}
.table-tree-fixed-right {
  .tab-row {
    .row-item:nth-last-child(2) {
      border-right: 0;
    }
    .row-item:last-child {
      position: absolute;
      border-left: 1px solid #ebeef5;
      right: 0;
      z-index: 2;
    }
  }
}
.table-tree {
  table {
    width: 100%;
  }
  .tab-row {
    background: #f5f7fa;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    .row-item {
      height: 47px;
      display: inline-block;
      overflow: hidden;
    }
  }
  .ishidden {
    display: none;
  }
  .table-tree-header {
    color: #909399;
    font-weight: 500;
    .row-item {
      white-space: nowrap;
      overflow: hidden;
      user-select: none;
      padding: 12px 0;
      min-width: 0;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      position: relative;
      text-align: center;
      border-bottom: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      background: #f5f7fa;
      border-top: 1px solid #ebeef5;
    }
    th:first-child {
      border-left: 1px solid #ebeef5;
    }
  }
  .tabody {
    .el-pagination {
      text-align: center;
    }
    .row-item {
      border-bottom: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      padding: 12px 0;
      min-width: 0;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      position: relative;
      text-align: center;
    }
    .tab-row {
      background: #f5f7fa;
    }
    .last-child {
      background: #ffffff;
      .row-item {
        background: #ffffff;
      }
    }
    .row-item:first-child {
      border-left: 1px solid #ebeef5;
      cursor: pointer;
      text-align: left;
    }
  }
}
</style>
