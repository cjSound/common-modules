<!--
 * @Author: 曹捷
 * @Date: 2020-04-20 15:22:51
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-24 17:57:46
 * @Description: 地图搜索
 -->
<template>
  <div v-if="visible">
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="addVisible"
      @closed="closeDialog"
      append-to-body
      class="mapDialog"
      fullscreen
      title="地址"
      width="40%"
    >
      <div class="amap-page-container">
        <el-amap-search-box :on-search-result="onSearchResult" :search-option="searchOption" class="search-box" v-if="lock"></el-amap-search-box>
        <el-amap :center="mapCenter" :plugin="plugin" :zoom="12" v-if="lock" vid="amapDemo">
          <el-amap-marker :key="index" :position="marker" v-for="(marker,index) in markers"></el-amap-marker>
        </el-amap>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="onSubmit" type="primary">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>


  <script>
module.exports = {
  props: {
    visible: {
      type: Boolean,
    },
    addType: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  watch: {
    visible(value) {
      this.addVisible = value
    },
  },
  data: function () {
    let self = this
    return {
      markers: [],
      addVisible: this.visible,
      lock: false,
      searchOption: {
        city: '长沙',
        citylimit: false,
      },
      address: '',
      mapCenter: [121.59996, 31.197646],
      loaded: false,
      plugin: [
        {
          pName: 'Geolocation',
          events: {
            init(o) {
              if (self.addType === 'add') {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  console.log('init -> result', result)
                  self.address = result.formattedAddress
                  if (result && result.position) {
                    self.mapCenter = [result.position.lng, result.position.lat]
                    self.markers = [[result.position.lng, result.position.lat]]
                    self.loaded = true
                    self.$nextTick()
                  }
                })
              } else {
                // 组件回显
                if (self.value) {
                  self.mapCenter = self.value.split(',')
                  self.markers = [self.value.split(',')]
                }
              }
            },
          },
        },
      ],
    }
  },
  mounted() {
    setTimeout(() => {
      this.lock = true
    }, 5000)
  },
  methods: {
    onSubmit() {
      this.$emit('change', this.markers, this.address)
      this.closeDialog()
    },
    closeDialog() {
      this.$emit('update:visible', false)
    },
    onSearchResult(pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        let poi = pois[0]
        self.address = poi.address
        this.markers = [[poi.lng, poi.lat]]
        this.mapCenter = [poi.lng, poi.lat]
      }
    },
  },
}
</script>


<style lang="scss">
.mapDialog {
  .el-dialog {
    padding: 0;
    height: 100%;
    .el-dialog__body {
      padding: 0;
      height: calc(100% - 104px);
      .el-vue-amap-container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }
  .el-dialog__footer {
    padding: 0;
    height: 60px;
    line-height: 60px;
  }
  .el-dialog__header {
    padding: 0;
    height: 54px;
    line-height: 54px;
  }
}

.search-box {
  position: absolute;
  top: 25px;
  left: 20px;
}

.amap-page-container {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>