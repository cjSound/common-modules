/*
 * @Author: 曹捷
 * @Date: 2020-08-14 16:32:55
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-14 17:11:03
 * @Description: file content
 */

var nodes = [
    { value: "66666666", type: "home", index: "0" },
    { value: "11111111111", type: "phone", index: "1" },
    { value: "22222222222", type: "phone", index: "2" },
    { value: "33333333333", type: "phone", index: "3" },
    { value: "44444444444", type: "phone", index: "4" },
    { value: "55555555555", type: "phone", index: "5" },
    { value: "aaa", type: "weixin", index: "6" },
    { value: "bbb", type: "weixin", index: "7" },
    { value: "ccc", type: "weixin", index: "8" },
    { value: "ddd", type: "weixin", index: "9" },
    { value: "eee", type: "weixin", index: "10" },
    { value: "fff", type: "weixin", index: "11" },
];
var links = [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 0, target: 4 },
    { source: 0, target: 5 },
    { source: 2, target: 6 },
    { source: 2, target: 7 },
    { source: 2, target: 8 },
    { source: 3, target: 9 },
    { source: 3, target: 10 },
    { source: 3, target: 11 },
]
export default class layout {
    constructor() {
        this.nodes = nodes
        this.links = links
    }
    force() {
        let force = d3.layout.force()
            .nodes(this.nodes)
            .links(this.links).size([1300, 430])
            .linkStrength(0.1)
            .friction(0.9)
            .linkDistance(300)
            .charge(-400) //负值导致节点排斥，而正值导致节点吸引。对于图形布局，应使用负值
            .gravity(0.1)
            .theta(0.8)
            .alpha(0.1)
            .start();
        console.log('layout -> force -> this.nodes', this.nodes)

        return force
    }
}