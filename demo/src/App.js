import React,{ Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { adminRouter } from './routes'

export default class App extends Component {
    render() {
        return(
            
            <Fragment>
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
                    <Redirect to={adminRouter[0].pathname} from='/admin' exact/>
                    <Redirect to='/404'/>
                </Switch>
            </Fragment>

            
        )
    }
}