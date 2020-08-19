/*
 * @Author: 曹捷
 * @Date: 2020-08-11 11:29:00
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-18 19:34:37
 * @Description: 基础样式
 */

const connectorPaintStyle = {
  strokeWidth: 2,
  stroke: '#b4bdc5',
  joinstyle: 'round',
  outlineStroke: 'transparent',
  outlineWidth: 2,
};

const connectorHoverStyle = {
  strokeWidth: 2,
  stroke: '#216477',
};
const endpointHoverStyle = {
  stroke: '#00cdea',
  fill: '#00cdea',
};

export const targetEndpoint = {
  cssClass: 'targetPoint',
  isTarget: true,
  endpoint: 'Dot',
  paintStyle: { fill: '#27c8df', radius: 6 },
  hoverPaintStyle: endpointHoverStyle,
  connector: [
    //连线的类型，有直线（Sright），有流程图(Flowchart)、贝塞尔曲线(Bezier)，State machine（状态机）
    'Flowchart',
    {
      curviness: 70,
      stub: [40, 60],
      gap: 8,
      cornerRadius: 5,
      alwaysRespectStubs: true,
    },
  ],
  maxConnections: -1,
  dropOptions: { hoverClass: 'hover', activeClass: 'active' },

};

export const sourceEndpoint = {
  cssClass: 'sourcePoint',
  isSource: true,
  endpoint: 'Dot',
  maxConnections: -1,
  paintStyle: {
    stroke: '#00cdea',
    fill: '#FFF',
    radius: 4,
    strokeWidth: 2,
  },
  connector: [
    //连线的类型，有直线（Sright），有流程图(Flowchart)、贝塞尔曲线(Bezier)，State machine（状态机）
    'Flowchart',
    {
      curviness: 70,
      stub: [40, 60],
      gap: 8,
      cornerRadius: 5,
      alwaysRespectStubs: true,
    },
  ],
  connectorStyle: connectorPaintStyle,
  hoverPaintStyle: endpointHoverStyle,
  connectorHoverStyle,
  dragOptions: {},
};
