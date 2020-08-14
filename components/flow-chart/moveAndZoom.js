/*
 * @Author: 曹捷
 * @Date: 2020-08-11 15:39:43
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-13 09:31:14
 * @Description: file content
 */
import instance from './instance';

const panzoom = require('panzoom');

// 初始化panzoom插件
function init() {
  const mainContainer = instance.getContainer();
  const mainContainerWrap = mainContainer.parentNode;
  const pan = panzoom(mainContainer, {
    smoothScroll: false,
    autocenter: true,
    zoomDoubleClickSpeed: 1,
    minZoom: 0.5,
    maxZoom: 2,
    bounds: true,
    boundsPadding: 0.1
  });
  instance.mainContainerWrap = mainContainerWrap;
  instance.pan = pan;
  // 缩放时设置jsPlumb的缩放比率
  pan.on('zoom', (e) => {
    const { scale } = e.getTransform();
    console.log('init -> scale', scale)
    instance.setZoom(scale);
  });

  // 平移时设置鼠标样式
  // mainContainerWrap.style.cursor = 'grab';
  // mainContainerWrap.addEventListener('mousedown', function wrapMousedown() {
  //   this.style.cursor = 'grabbing';
  //   mainContainerWrap.addEventListener('mouseout', function wrapMouseout() {
  //     this.style.cursor = 'grab';
  //   });
  // });
  // mainContainerWrap.addEventListener('mouseup', function wrapMouseup() {
  //   this.style.cursor = 'grab';
  // });
}
const panZoom = {
  init,
};

export default panZoom;


// /**
//      * @description  缩小画布
//      */
//   zoomIn() {
//     const x = instance.mainContainerWrap.clientWidth / 2
//     const y = instance.mainContainerWrap.clientHeight / 2
//     instance.pan.smoothZoom(x, y, 0.8)
//   },

//   /**
//    * @description 放大画布
//    */
//   zoomOut() {
//     const x = instance.mainContainerWrap.clientWidth / 2
//     const y = instance.mainContainerWrap.clientHeight / 2
//     instance.pan.smoothZoom(x, y, 1.2)
//   },
//   // 面板重置
//   zoomReset() {
//     let trans = instance.pan.getTransform()
//     instance.pan.zoomTo(0, 0, 1 / trans.scale)
//     instance.pan.moveTo(0, 0)
//   },