import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import Logo from './logo.png'
import './frame.less'
import {withRouter} from 'react-router-dom'
const { Header, Content, Sider } = Layout;


@withRouter		// 为了使用路由的api
class Frame extends Component {

	onMenuClick = ( {key }) => {	// 函数对象解构
    this.props.history.push(key)
    
	}

    render() {
        return (
        <Layout style={{minHeight:'100%'}}>
            <Header className="header ge-header">
              <div className="ge-logo" >
                <img src={Logo} alt='gegeda-logo'/>
              </div>
            </Header>
            <Layout>
              <Sider width={200} className="site-layout-background" style={{backgroundColor:'#fefefe'}}>
				<Menu 
					mode='inline'
					onClick={this.onMenuClick}
					selectedKeys={[this.props.location.pathname]}	// 设置进入页面默认高亮
				>
					{this.props.menus.map(item => {
						return (
							<Menu.Item key={item.pathname} icon={<item.icon/>}>
								{item.title}
							</Menu.Item>
						)
					})}
                </Menu>
              </Sider>
              <Layout style={{ padding: '16px '}}>
         

                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        backgroundColor:'white'
                  }}
                >
                    {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        )  
    }
}

export default Frame;