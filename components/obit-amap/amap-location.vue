<!--
 * @Author: 曹捷
 * @Date: 2020-11-12 16:46:51
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-11-12 17:20:44
 * @Description: 点定位
-->
<template>
  <div class="map">
    <el-amap :center="center" :zoom="zoom" class="amap-demo" vid="amapDemo">
      <el-amap-marker :events="marker.events" :key="index+'mark'" :position="marker.position" :vid="index"
        v-for="(marker, index) in markers" visible></el-amap-marker>
      <el-amap-info-window :content="marker.content" :key="index+'infowindow'" :position="marker.windowPostion"
        :visible="true" v-for="(marker, index) in markers"></el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
export default {
  name: 'amap-page',
  props: {
    // 经纬度坐标 lon lat
    locations: {
      type: Array
    },
    showInfo: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      detailsInfo: {},
      zoom: 14,
      center: [],
      markers: [
        {
          position: [],
          windowPostion: [],
          content: ''
        }
      ]
    }
  },
  methods: {
    initDetail () {
      this.center.push(this.locations[0])
      this.center.push(this.locations[1])

      let position = this.markers[0].position
      position.push(this.locations[0])
      position.push(this.locations[1])
      this.markers[0].content = this.showInfo
      this.initPostion()
    },
    initPostion () {
      this.markers.forEach(element => {
        element.windowPostion = [
          Number(element.position[0]) - 0.0003,
          Number(element.position[1]) + 0.0024
        ]
      })
    }
  },
  mounted () {
    this.initDetail()
  }
}
</script>

<style lang="scss">
.map {
  width: 100%;
  height: 100%;
}
</style>