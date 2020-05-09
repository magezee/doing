import React, { Component, createRef } from 'react'

import {Card, Button, Form, Input, DatePicker } from 'antd'
import { UserOutlined, EyeOutlined, FileOutlined } from '@ant-design/icons'
import E from 'wangeditor'
import moment from 'moment'

import { getArticleById } from '../../requests/'

import './edit.less'

export default class Edit extends Component {
    constructor() {
        super()
        this.editorRef = createRef()
        this.formRef=createRef()
    }

    test = () => {
        console.log(this.formRef.current)
    }

    goBack = () => {
        this.props.history.goBack()
    }

          
    onFinishFailed = ({values}) => {
        console.log(values);
        
    };

    onFinish = values => {
      console.log(values);
     
    };

    handleSubmit = (e) => {
        console.log(this.formRef.current.getFieldValue('createAt').valueOf())
        this.formRef.current.setFieldsValue({admin:'11'})
        this.formRef.current.submit()
    }

    initEditor = () => {
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange= (html) => {
            this.formRef.current.setFieldsValue({
                content:html
            })

        }
        this.editor.create()
    }

    componentDidMount() {
        this.initEditor()
        
        getArticleById(this.props.match.params.id)  
        
            .then(resp => {
               
                this.formRef.current.setFieldsValue({
                    title:resp.title,
                    author:resp.author,
                    amount:resp.amount,
                    createAt:moment(resp.createAt),
                    content:this.editor.txt.html(resp.content)
                })
            })

            
            
    }



    render() {
        
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 20 },
          };
        return (
            
            <Card
                title='编辑文章'
                bordered={false}
                extra={<Button onClick={this.goBack}>取消</Button>}
            >                
                <Form onFinishFailed={this.onFinishFailed}  onFinish={this.onFinish} {...layout} initialValues={{title:'标题',admin:'作者',amount:0}} ref={this.formRef}> 
                <Form.Item 
                    name='title'
                    label='标题'
                    rules={[{required: true, message: '标题是必须填的'}]}
                >
                    <Input prefix={<FileOutlined /> }  />
                </Form.Item>
                <Form.Item 
                    name='admin'
                    label='作者'
                    rules={[{required: true, message: '作者是必须填的'}]}
                    
                >
                    <Input prefix={<UserOutlined/> } />
                </Form.Item>
                <Form.Item 
                    name='amount'
                    label='阅读量'
                    rules={[{required: true, message: 'amount'}]}
                >
                    <Input prefix={<EyeOutlined /> } />
                </Form.Item>
                <Form.Item 
                    name='createAt'
                    label='日期'
                    rules={[{required: true, message: 'createAt'}]}
                >
                    <DatePicker/>
                </Form.Item>
                <Form.Item 
                    name='content'
                    label='内容'  
                    
                >
                   <div  className='rich-text-field'  ref={this.editorRef} ></div>
                   
                </Form.Item>
                <Form.Item wrapperCol={ {offset:2}} >
                    <Button  htmlType='button'  onClick={this.handleSubmit} >
                        保存修改
                    </Button>
                </Form.Item>

                </Form >
            </Card>
        )
    }
}
