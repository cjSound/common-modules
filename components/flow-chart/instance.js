/*
 * @Author: 曹捷
 * @Date: 2020-08-11 11:27:59
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-13 21:04:38
 * @Description: 初始化实例
 */
import { jsPlumb } from 'jsplumb';
let config = {
    DragOptions: {
        cursor: 'pointer', zIndex: 2000,
    },
    ConnectionOverlays: [ //连线的叠加组件，如箭头、标签
        //叠加组件-箭头参数设置
        ['Arrow', {
            location: 1,
            visible: true,
            width: 8,
            length: 8,
            id: 'ARROW',
        }],
    ],
    // ReattachConnections: true, //是否重新连接使用鼠标分离的线?
    ConnectionsDetachable: true, //连线是否可用鼠标分离
}
export default jsPlumb.getInstance(config);
