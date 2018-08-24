import React from 'react' // todo 这里并未使用react ， 为什么还要加上这一行
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Bundle from './bundle'

/* 按需加载 开始*/
import Dashboard from 'bundle-loader?lazy&name=Dashboard!pages/dashboard/index'
import Home from 'bundle-loader?lazy&name=home!pages/home/index'
import Counter from 'bundle-loader?lazy&name=counter!pages/counter/index'
import UserInfo from 'bundle-loader?lazy&name=userinfo!pages/userInfo/index'

const Loading = function() {
  return <div>Loading...</div>
}

const createComponent = (component) => (props) => (
  <Bundle load={component}>
    {
      (Component) => Component ? <Component {...props} /> : <Loading/>
    }
  </Bundle>
)
/* 按需加载 结束 */

const getRouter = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to='/Dashboard'>首页</Link></li>
        <li><Link to='/home'>Page1</Link></li>
        <li><Link to='/counter'>counter</Link></li>
        <li><Link to='/userinfo'>UserInfo</Link></li>
      </ul>
      <Switch>
        <Route exact path='/Dashboard' component={createComponent(Dashboard)}/>
        <Route path='/home' component={createComponent(Home)}/>
        <Route path='/counter' component={createComponent(Counter)}/>
        <Route path='/userinfo' component={createComponent(UserInfo)}/>
      </Switch>
    </div>
  </BrowserRouter>
)

export default getRouter
