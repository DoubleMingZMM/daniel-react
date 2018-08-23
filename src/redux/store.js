import {createStore, applyMiddleware} from 'redux'
import combineReducers from './reducers'
import thunkMiddleware from 'redux-thunk'

// redux有createStore，函数接受另一个函数作为参数，
// 产生一个新的store,applyMiddleware接受来自
// redux-trunk的中间件，处理action到redux，之后
// 的就按照纯函数的方式去处理
const store = createStore(combineReducers, applyMiddleware(thunkMiddleware))

export default store