// index.js
import React from 'react'
import { render } from 'react-dom'
import App from './App'
import store from './store'
import {Provider} from 'react-redux'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {mainRouter} from './routes'
import './index.less'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
render(
        
    <Provider store={store}>
         <ConfigProvider locale ={zhCN}>
            <Router>
                <Switch>
                    <Route  path='/admin' render={(routerProps)=>{
                        // 权限，需要登入才能访问/admin
                        return <App {...routerProps}/>
                    }}/>  
                    {
                        mainRouter.map(route => {
                            return <Route key={route.pathname} path={route.pathname} component={route.component}/>
                        })
                    }
                    
                    
                    <Redirect to='/admin' from='/' exact   />
                    <Redirect to='/404' from='/' />
                    
                    
                </Switch>

            </Router>
        </ConfigProvider>
    </Provider>,   
    
    document.querySelector('#root')
)