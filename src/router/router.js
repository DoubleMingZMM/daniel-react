import React from 'react' // todo 这里并未使用react ， 为什么还要加上这一行
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'

import Dashboard from 'pages/dashboard/index'
import Home from 'pages/home/index'
import Counter from 'pages/counter/index'


const getRouter = () => (
    <BrowserRouter>
        <div>
            <ul>
                <li><Link to="/Dashboard">首页</Link></li>
                <li><Link to="/home">Page1</Link></li>
                <li><Link to="/counter">counter</Link></li>
            </ul>
            <Switch>
                <Route exact path="/Dashboard" component={Dashboard}/>
                <Route path="/home" component={Home}/>
                <Route path="/counter" component={Counter}/>
            </Switch>
        </div>
    </BrowserRouter>
)

export default getRouter