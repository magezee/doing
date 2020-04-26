// index.js
import React from 'react'
import { render } from 'react-dom'
import App from './App'
import store from './store'
import {Provider} from 'react-redux'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {mainRouter} from './routes'


console.log(store.getState())
render(
        
    <Provider store={store}>
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
    </Provider>,   
    
    document.querySelector('#root')
)