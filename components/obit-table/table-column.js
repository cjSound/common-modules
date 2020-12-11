/*
 * @Author: 曹捷
 * @Date: 2020-07-30 20:59:56
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-12-11 14:39:46
 * @Description: 嵌套table column列 可以合并表头
 */
export default {
    name: 'tableColumn',
    props: {
        tableColumnItem: {
            type: [Array, Object]
        }
    },
    inject: ['align', 'minWidth'],
    methods: {
        cloneObj (obj) {
            var newObj = {}
            if (obj instanceof Array) {
                newObj = []
            }
            for (var key in obj) {
                var val = obj[key]
                newObj[key] =
                    val !== null && typeof val === 'object' ? this.cloneObj(val) : val
            }
            return newObj
        },
        /**
         * https://github.com/ElemeFE/element/issues/2808
         * 关于TableColumn顺序问题 #2808
         * 因为el-table-column的外层一定要是el-table，不能插入其它元素，否则会导致位置计算错误
            渲染出来table 列的顺序会不正确， 第一项永远会跑到最后一个
            暂时改变数组顺序来解决此问题
         * */
        sortArrEnd () {
            let list = this.cloneObj(this.tableColumnItem)
            let end = list.splice(list.length - 1, 1)
            list.unshift(end[0])
            return list
        },
        clickEvent (event, data, item) {
            if (item.click) {
                item.click(event, data, item)
            }
        }
    },
    render (h) {
        if (this.tableColumnItem instanceof Array) {
            let list = this.sortArrEnd()
            return (
                <template>
                    {
                        Object.keys(list).map((column, index) => {
                            return (
                                <tableColumn tableColumnItem={list[index]}></tableColumn>
                            )
                        })
                    }
                </template>
            )
        } else {
            let column = this.tableColumnItem
            let scopedSlots = {
                // scopedSlots 等同模板里面    <div slot-scope="scope">slot: {{scope}}</div>定义和被调用
                // $slots  <div slot="header">slot: header</div>
                // scopedSlots 调用组件内部
                default: scope => {
                    let innerInfo = this.$options.filters['valueType'](column.render ? column.render(scope.row) : scope.row[column.prop], column.filterType)
                    // console.log('render -> innerInfo', scope)
                    if (scope.row[column.prop] && scope.row[column.prop].length > 12) {
                        return (
                            <el-tooltip content={column.render ? column.render(scope.row) + '' : scope.row[column.prop] + ''}
                                class="item" effect="dark" placement="top" >
                                <span domPropsInnerHTML={innerInfo} onClick={(event) => { this.clickEvent(event, scope.row, column) }}>  </span>
                                {/*
                                效果等同
                                 <span domProps={{ innerHTML: innerInfo }}>  </span> */}
                            </el-tooltip>
                        )
                    } else {
                        return (
                            <span domPropsInnerHTML={innerInfo} onClick={(event) => { this.clickEvent(event, scope.row, column) }}>  </span>
                            // column.slot ?
                            //     <span scopedSlots={{ default: column.slot() }}> </span>
                            //     : ''
                        )
                    }
                }
            }
            if (column.type) {
                // 序号
                return (
                    <el-table-column type={column.type} align={this.align} label={column.label} min-width={this.minWidth}
                        width={column.width}  >
                    </el-table-column>
                )
            } else {
                console.log('🚀 ~ file: table-column.js ~ line 89 ~ render ~ column.type', column.type)
                return (
                    <el-table-column sortable={column.sortable} show-overflow-tooltip align={this.align} label={column.label} min-width={this.minWidth} prop={column.prop}
                        width={column.width}
                        {...{ scopedSlots }} >
                        {
                            (this.tableColumnItem.children && this.tableColumnItem.children.length > 0)
                                ?
                                <template>
                                    <tableColumn tableColumnItem={this.tableColumnItem.children}></tableColumn>
                                </template>
                                :
                                ''
                        }
                    </el-table-column>
                )
            }
        }

    }
}
