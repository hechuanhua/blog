/**
 * 
 * @authors hechuanhua (you@example.org)
 * @date    2016-06-05 00:58:23
 * @version $Id$
 */
import React,{Component} from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk' 
import {Provider,connect} from 'react-redux'
import {combineReducers, createStore, applyMiddleware} from "redux"
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory,hashHistory } from 'react-router'
import * as actions from './js/actions/index'

import stores from './js/reducers/index'
import Index from './js/components/index'
import Publish from './js/components/publish'
import About from './js/components/about'
import Details from './js/components/details'
import Search from './js/components/search'
import Page404 from './js/components/page404'

import MobBox from './js/containers/mobBox'
import Nav from './js/containers/nav'
import TipsBox from './js/containers/tipsBox'


import "./less/style.less"

let store=createStore(
  stores,
  applyMiddleware(thunkMiddleware)
)
class App extends Component{
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    let WinH=document.documentElement.clientHeight
    let wrap=document.querySelector('.container')
    wrap.style.minHeight=(WinH-270)+"px"
  }
  render(){
   return <div className="page">
        <Nav />
        <div className="container content">{this.props.children}</div>
        <MobBox />
        <Foot/>
        <TipsBox/>
    </div>
  }
}
const Foot=()=>(
  <div className="Footer">联系方式：447503467@qq.com</div>
)
render((
    <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Index}/>
            <Route path="/Publish" component={Publish}/>
            <Route path="/About" component={About}/>
            <Route path="/Search" component={Search}/>
            <Route path="/:name/:date/:title" component={Details}/>
          </Route>
          <Route path="*" component={Page404} />
        </Router>
  </Provider>
),document.getElementById("APP"))