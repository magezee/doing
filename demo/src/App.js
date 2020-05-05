import React,{ Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { adminRouter } from './routes'
import {Frame} from './components'

const menus = adminRouter.filter(route => route.isNav === true)

export default class App extends Component {
    render() {
        
        return(
             // Frame公共组件决定了整个网站的整体框架，用该组件来控制整个网站的路由跳转设定
            <Frame menus={menus}>
                <Switch >
                    {
                        adminRouter.map(route => {
                            return <Route 
                                key={route.pathname} 
                                path={route.pathname}
                                exact={route.exact} 
                                // 往下面传路由的api 如history等
                                render={(routeProps) =>{
                                    return <route.component {...routeProps}/>
                                }} 
                            />
                        })
                    }
                    <Redirect to={adminRouter[0].pathname} from='/admin' exact/>
                    <Redirect to='/404'/>
                </Switch>
            </Frame>

            
        )
    }
}