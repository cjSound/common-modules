/*
 * @Author: 曹捷
 * @Date: 2019-07-19 09:19:35
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-22 21:56:33
 * @Description: table分页  抽取相关mix
 */
import util from '@/common-modules/utils/utils'
import { aesEncode } from '@/common-modules/utils/secret'
export default {
    data() {
        return {
            loading: false,
            searchParams: {
                pageNum: 1,
                pageSize: 20,
                orderBy: ''
            },
            pageSizeList: [20, 30, 50],
            total: 0,
            // 自定义查询参数
            params: {},
            // 分页list集合
            dataList: [],
            // 请求方法 url
            tableRequest: '',
            // 默认请求返回list的key
            pageItemsKey: 'data',
            // 新增编辑相关
            addVisable: false,
            addType: 'add',
            detailsInfo: {},
            // 新增或者修改面包屑名称
            crumbName: '',
            // 多选选择的列表
            handleSelectionList: [],
            handleSelectionKey: ''
        }
    },
    watch: {
        // params: {
        //     handler(nValue, oValue) {
        //         this.queryDataList()
        //     },
        //     deep: true
        // }
    },
    methods: {
        async queryDataList(init) {
            try {
                if (init) {
                    this.searchParams.pageNum = 1
                    this.total = 0
                }
                const params = Object.assign(util.util.cloneObj(this.params), (this.getQueryParam && this.getQueryParam()) || this.queryParams)
                let param = util.util.cloneObj(this.searchParams)
                // 自定义查询组件 前端拼接字符串，AES加密传输
                if (params.strSql) {
                    params.strSql = aesEncode(params.strSql)
                }
                param.param = params
                param.total = this.total
                this.loading = true
                const data = await this.$http[this.tableRequest](param)
                this.loading = false
                if (data.code === '0000') {
                    // 自定义处理后台数据
                    if (this.beforeSuccess) {
                        this.beforeSuccess(data)
                    }
                    this.total = data.total
                    this.dataList = data[this.pageItemsKey]
                    // 自定义处理后台list data
                    this.afterSuccess && this.afterSuccess(this.dataList)
                } else if (this.errorBack) {
                    // 处理特定异常
                    this.errorBack(data)
                } else {
                    this.$message({
                        message: data.errorMsg,
                        type: 'warning'
                    });
                }
            } catch (error) {
                console.log('queryDataList -> error', error)
                this.loading = false
            }
        },
        // 分页组件，翻页
        handleCurrentChange(val) {
            this.searchParams.pageNum = val
            this.queryDataList()
        },
        // 分页组件改变每页显示的条数
        handleSizeChange(val) {
            this.searchParams.pageSize = val
            this.searchParams.pageNum = 1
            this.queryDataList()
        },
        //处理分页数据  空数据 占位符
        dealDataList(list) {
            list.forEach(element => {
                for (const i in element) {
                    if (element[i] === null || element[i] === '') {
                        element[i] = '-'
                    }
                }
            })
            return list
        },
        // 新增组件
        addDialog() {
            this.addVisable = true
            this.addType = 'add'
            if (this.crumbName !== '') {
                let crumbInfo = { type: 'show', menuName: this.crumbName, path: '' }
                this.$store.commit('app/setLastBreadcrumb', crumbInfo)
            }
        },
        // 编辑组件
        editDialog(item) {
            this.detailsInfo = item
            this.addVisable = true
            this.addType = 'edit'
        },
        // 重置form标单内容  初始化
        resetForm(name) {
            this.$refs[name].resetFields()
        },
        // 多选 将id 存入handleSelectionList 集合
        handleSelectionChange(item) {
            console.log('handleSelectionChange -> item', item)
            let arr = []
            item.forEach(element => {
                arr.push(element[this.handleSelectionKey])
            })
            this.handleSelectionList = arr
        },
        // 多选删除 只需要传入Ajax key
        deleteAll(key) {
            if (this.handleSelectionList.length === 0) {
                this.$message.error('请至少选择一条要操作的数据')
                return
            }
            let param = {
                ids: this.handleSelectionList
            }
            this.$confirm('是否删除', '提示')
                .then(() => {
                    this.$http[key](param).then(res => {
                        this.$message.success('删除成功')
                        this.reload()
                    })
                })
                .catch(() => { })
        },
        deleteInfo(key, item) {
            let param = {
                ids: [item[this.handleSelectionKey]]
            }
            this.$confirm('是否删除', '提示')
                .then(() => {
                    this.$http[key](param).then(res => {
                        this.$message.success('删除成功')
                        this.reload()
                    })
                })
                .catch(() => { })
        }
    }
}