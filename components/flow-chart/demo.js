/*
 * @Author: 曹捷
 * @Date: 2020-08-12 15:06:32
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-12 15:06:35
 * @Description: file content
 */
this.jsp = jsPlumb.getInstance({
    Anchor: ["Right", "Left"],
    //锚点位置，如left，top，bottom等；对任何没有声明描点的Endpoint设置锚点，
    //用于source或target节点
    //设置为数组可以指定锚点的位置
    Anchors: ["Right", "Left"],  //连线的source和target Anchor
    ConnectionsDetachable: false, //连线是否可用鼠标分离
    ConnectionOverlays: [  //连线的叠加组件，如箭头、标签
        //叠加组件-箭头参数设置
        ["Arrow", {
            location: 1,
            visible: true,
            width: 11,
            length: 11,
            id: "ARROW",
            events: {
                click: function () {
                }
            }
        }],
        //叠加组件-标签参数设置
        ["Label", {
            location: 0.1,
            cssClass: "aLabel", //hover时label的样式名
            events: {
                click: info => {
                    console.log(info);
                }
            },
            visible: true
        }]
    ],
    Connector: "Straight",
    //连线的类型，有直线（Sright），有流程图(Flowchart)、贝塞尔曲线（Bezier)，State machine（状态机）
    Container: "module",
    //父级元素id；假如页面元素所在上层不同，最外层父级一定要设置
    DoNotThrowErrors: false,
    //如果请求不存在的Anchor、Endpoint或Connector，是否抛异常
    DragOptions: {},//用于配置拖拽元素的参数
    DropOptions: {},//用于配置元素的drop行为的参数
    Endpoint: "Dot", //端点（锚点）的样式声明
    Endpoints: [null, null],
    //用jsPlumb.connect创建连接时，source端点和target端点的样式设置
    EndpointOverlays: [], //端点的叠加物
    EndpointStyle: { fill: 'transparent', stroke: '#1565C0', radius: 4, strokeWidth: 1 }, //端点的默认样式
    EndpointStyles: [null, null], //连线的source和target端点的样式
    EndpointHoverStyle: { fill: '#1565C0', stroke: '#1565C0', radius: 4, strokeWidth: 1 }, //端点hover时的样式
    EndpointHoverStyles: [null, null], //连线的source和target端点hover时的样式
    HoverPaintStyle: { stroke: '#1565C0', strokeWidth: 3 }, //连线hover时的样式
    LabelStyle: { color: "black" }, //标签的默认样式，用css写法。
    LogEnabled: false, //是否开启jsPlumb内部日志
    Overlays: [], //连线和端点的叠加物
    MaxConnections: 10, //端点支持的最大连接数
    PaintStyle: { stroke: '#1565C0', strokeWidth: 1, joinstyle: 'round' }, //连线样式
    ReattachConnections: true, //是否重新连接使用鼠标分离的线?
    RenderMode: "svg", //默认渲染模式
    Scope: "jsPlumb_DefaultScope", //范围，具有相同scope的点才可
    reattach: true,
})