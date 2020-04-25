import React,{ Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { adminRouter } from './routes'

export default class App extends Component {
    render() {
        return(
            
            <>
                <div>公共服务部分</div>
                <Switch>
                    {
                        adminRouter.map(route => {
                            return <Route 
                                key={route.pathname} 
                                path={route.pathname}
                                exact={route.exact} 
                                render={(routeProps) =>{
                                    return <route.component {...routeProps}/>
                                }} 
                            />
                        })
                    }
                </Switch>

            </>
            
            
            
        )
    }
}