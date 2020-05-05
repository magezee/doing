import React, { Component } from 'react';
import { Card,Button, Table, Tag, Modal, Typography, message, Tooltip} from 'antd';
import {getArticles, deleteArticleById} from '../../requests/'
import dayjs from 'dayjs'
import ButtonGroup from 'antd/lib/button/button-group';
import XLSX from 'xlsx'

const { Text } = Typography

const titleDisplayMap = {
    id: 'id',
    title: '标题',
    author: '作者',
    amount: '阅读量',
    createAt: '创建时间',
}



class Article extends Component {

    constructor() {
        super()
        this.state = {
            total:0,                // 请求数据量
            dataSource : [],        // 列数据
            columns : [],           // 列
            isLoading : false,      // 请勿文章列表等待状态，请求过程中true
            offset: 0,              // 通过offset和limited来影响表格的当前页数
            limited: 10,
            isShowArticleModal:false,   // 删除框是否显示
            deleteArticleTitle: '',     // 删除框标题
            deleteArticleConfirmLoading: false,   // 删除框请求过程等待状态
            deleteArticleId: null   // 文章id放在state达到共享功能
        }
     
    }

    createColumns = (columnKeys) => {
        // 对amount和createAt进行特殊处理
        const columns =  columnKeys.map(item => {
            if(item === 'amount') {
                return {
                    title: titleDisplayMap[item],   // 对象里使用变量的格式 
                    key: item,
                    // 这里实际上是在<Table>组件内生成<Column title={titleDisplayMap[item]} key={item} render={()=>{...}} > 组件
                    // 该组件使用render渲染组件时，会回调传回数据被方法形参text、record、index接收
                    render : (text) => {        
                        const {amount} = text
                        return (
                            <Tooltip title={amount > 300 ? '高阅读量' : '一般'}>
                                <Tag color={amount > 300 ? 'success' : 'warning'}>{amount}</Tag>
                            </Tooltip>
                        )
                    }

                }
            }
            if(item === 'createAt') {
                return {
                    title: titleDisplayMap[item],  
                    key: item,
                    render : (text) => {
                        const {createAt} = text
                        return dayjs(createAt).format('YYYY年MM月DD日')
                    }

                }
            }
            return {
                title: titleDisplayMap[item],   
                key: item,
                dataIndex:item
            }



        })
        // 另手动添加action列（因为不是从axios传回来的因此只能手动加上）
        columns.push({
            title: '操作',
            key: 'action',
            render: (text) => {
                return (
                    <ButtonGroup>
                        {/*点击事件中有形参，需要添加形参时，使用bind()this再加参数*/} 
                        <Button size='small' type='primary' onClick={this.toEdit.bind(this,text)}>编辑</Button>
                        <Button size='small' type='danger'onClick={this.showDeleteArticleModal.bind(this,text)}>删除</Button>
                    </ButtonGroup>
                )
            }
        })
        return columns
    }

    
    toEdit = (text) => {
        
        this.props.history.push({
            pathname: `/admin/article/edit/${text.id}`,
            state: {
                title: text.title
            }
        })
    }

    showDeleteArticleModal = (text) => {

        this.setState({
            isShowArticleModal:true,
            deleteArticleTitle:text.title,
            deleteArticleId:text.id
        })
    }
    

    // 点击确定，请求开始，开始等待异步执行，异步执行未结束时确定图标状态loading表示，请求结束消息框消失（良好的视觉观感）
    deleteArticle = () => {
        this.setState({
            deleteArticleConfirmLoading: true,  
        })
        deleteArticleById(this.state.deleteArticleId)
            .then(resp => {
                message.success(resp.msg)
                this.setState({
                    offset:0        // 删除后将文章页数返回第一页然后再请求数据
                },() => {
                    this.getdata()  
                })
            })
            .finally(() => {
                this.setState({
                    deleteArticleConfirmLoading:false,
                    isShowArticleModal:false
                })
            })
    }


    hideDeleteModal = () => {
        this.setState({
            isShowArticleModal:false,
            deleteArticleTitle: ''
        })
    }

    getdata = () => {
        this.setState({
            isLoading:true
        })
        getArticles(this.state.offset, this.state.limited)
            .then( resp => { 
                const columnKeys = Object.keys(resp.list[0])
                const columns = this.createColumns(columnKeys)

                this.setState({
                    total: resp.total,
                    dataSource: resp.list,
                    columns: columns,                    
                })
                
            })
            .catch(err => {

            })
            .finally(() => {
                this.setState({
                    isLoading:false
                })
            })
    }

    onPageChange = (page,pageSize) =>{
        
        this.setState({
            offset:pageSize * (page -1),    
            limited:pageSize
        } ,() => {
            
            this.getdata()  // 更改页面时再次执行请求数据操作，因为要用到异步数据因此在setState里设置回调函数，虽然写在setState()方法外面执行也可以，但是一般需要更换state并立即执行的方法时都写在setState方法里面
            } 
        )
        
    }
    

    onShowSizeChange = (current, size) => {
       
        this.setState({
            offset:0,
            limited:size
        },() => {
            console.log(current,size)
            this.getdata()
        })
    }

    

    toExcel = () => {
        const data = [Object.keys(this.state.dataSource[0])]    // Object.keys返回的是一个数组，即这里已经是[[key1,key2,...]]的嵌套数组结构
        for (let i = 0; i < this.state.dataSource.length; i++) {

           // data.push(Object.values(this.state.dataSource[i]))
           // 针对无序的数据，这样做更好
           data.push([
               this.state.dataSource[i].id,
               this.state.dataSource[i].title,
               this.state.dataSource[i].author,
               this.state.dataSource[i].amount,
               dayjs(this.state.dataSource[i].createAt).format('YYYY年MM月DD日')
           ])
        
        }        
        const ws = XLSX.utils.aoa_to_sheet(data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb,ws,'SheetJS')
        XLSX.writeFile(wb, 'sheetjs.xlsx')
    }


    componentDidMount() {
        this.getdata()
    }


    render() {
        
        return (
            <div>
                <div className="site-card-border-less-wrapper">
                    <Card 
                        title="文章列表" 
                        bordered={false} 
                        extra={<Button onClick={this.toExcel}>导出Excel</Button>} // 右上角显示的组件
                        >
                    <Table  
                        dataSource={this.state.dataSource} 
                        columns={this.state.columns}  
                        pagination={{
                            current: this.state.offset / this.state.limited +1,
                            total:this.state.total,
                            hideOnSinglePage: true,
                            showQuickJumper: true,
                            onChange:this.onPageChange,
                            onShowSizeChange: this.onShowSizeChange
                        }} 
                        rowKey={ record => record.id } 
                        loading={ this.state.isLoading }
                    />    
                    <Modal
                        title='此操作不可逆，请慎重！'                      
                        visible={this.state.isShowArticleModal}
                        onCancel={this.hideDeleteModal}
                        confirmLoading={this.state.deleteArticleConfirmLoading}
                        onOk={this.deleteArticle}
                    >
                    <span>确定要删除<Text type='danger'>《{this.state.deleteArticleTitle}》</Text>吗？</span>
                    </Modal>
                    </Card>
                </div>,
            </div>
        );
    }
}

export default Article;