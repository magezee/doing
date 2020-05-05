import React, { Component, createRef } from 'react'
import {Card, Button, Form, Input } from 'antd'
import { UserOutlined, EyeOutlined, FileOutlined } from '@ant-design/icons'
import E from 'wangeditor'


export default class Edit extends Component {
    constructor() {
        super()
        this.editorRef = createRef()
       
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

    initEditor = () => {
        this.editor = new E(this.editorRef)
        this.editor.create()
    }

    componentDidMount() {
        this.initEditor()
        
        
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

                <Form onFinishFailed={this.onFinishFailed}  onFinish={this.onFinish} {...layout}> 
                <Form.Item 
                    name='title'
                    label='标题'
                    rules={[{required: true, message: '标题是必须填的'}]}
                >
                    <Input prefix={<FileOutlined /> } defaultValue='title'/>
                </Form.Item>
                <Form.Item 
                    name='admin'
                    label='作者'
                    rules={[{required: true, message: '作者是必须填的'}]}
                >
                    <Input prefix={<UserOutlined/> } defaultValue='admin'/>
                </Form.Item>
                <Form.Item 
                    name='amount'
                    label='阅读量'
                    rules={[{required: true, message: 'amount'}]}
                >
                    <Input prefix={<EyeOutlined /> } defaultValue='0'/>
                </Form.Item>
                <Form.Item 
                    name='content'
                    label='内容'  
                >
                   <div ref={this.editorRef}></div>
                </Form.Item>
                <Form.Item wrapperCol={ {offset:2}}>
                    <Button    type="primary" htmlType="summit" >
                        Submit
                        </Button>
                </Form.Item>

                </Form >
            </Card>
        )
    }
}
