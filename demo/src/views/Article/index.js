import React, { Component } from 'react';
import { Card,Button, Table, Tag} from 'antd';
import {getArticles} from '../../requests/'
import dayjs from 'dayjs'
import ButtonGroup from 'antd/lib/button/button-group';
import XLSX from 'xlsx'


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
            total:0,
            dataSource : [],
            columns : [],
            isLoading : false,
            offset: 0,
            limited: 10
        }
     
    }

    createColumns = (columnKeys) => {
        // 对amount和createAt进行特殊处理
        const columns =  columnKeys.map(item => {
            if(item === 'amount') {
                return {
                    title: titleDisplayMap[item],   // 对象里使用变量的格式 
                    key: item,
                    render : (text) => {
                        const {amount} = text
                        return (
                            <Tag color={amount > 300 ? 'success' : 'warning'}>{amount}</Tag>
                        )
                    }

                }
            }
            if(item === 'createAt') {
                return {
                    title: titleDisplayMap[item],   // 对象里使用变量的格式 
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
            render: () => {
                return (
                    <ButtonGroup>
                        <Button size='small' type='primary'>编辑</Button>
                        <Button size='small' type='danger'>删除</Button>
                    </ButtonGroup>
                )
            }
        })
        return columns
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
                    >    
                    </Table>
                    </Card>
                </div>,
            </div>
        );
    }
}

export default Article;