/**
 * 
 * @authors hechuanhua (you@example.org)
 * @date    2016-09-05 00:58:23
 * @version $Id$
 */
//import 'babel-polyfill'
//import 'fetch-ie8';
import 'es5-shim';
import 'es5-shim/es5-sham'
import 'es6-shim';
// import 'es6-shim/es6-sham'
// import 'es6-promise'
require('es6-promise').polyfill();
require('isomorphic-fetch');
import React, { Component } from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from "redux"
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory, match } from 'react-router'
import * as actions from '../common/actions/index'

import stores from '../common/reducers/index'
import Index from '../common/components/index'
import MobBox from '../common/containers/mobBox'
import Nav from '../common/containers/nav'
import TipsBox from '../common/containers/tipsBox'
//import Footer from '../common/containers/footer'

const Footer = require('../common/components/footer')
const About = require('../common/components/about')
const Search = require('../common/components/search')
const Details = require('../common/components/details')
const Publish = require('../common/components/publish')
const ReactForm = require('../form/containers/App')
const Page404 =  require('../common/components/page404')

class App extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        let WinH = document.documentElement.clientHeight
        let wrap = document.querySelector('.container')
        wrap.style.minHeight = (WinH - 270) + "px"
    }
    render(){
        return <div className="page">
            <Nav/>
            <div className="navBox">
                <ul className="nav content">
                    <li><IndexLink to="/" activeClassName="active">首页</IndexLink></li>
                    <li><Link to="/publish" activeClassName="active">发布文章</Link></li>
                    <li><Link to="/about" activeClassName="active">关于网站架构</Link></li>
                    <li><Link to="/ReactForm" activeClassName="active">DIY表单</Link></li>
                </ul>
            </div>
            <div className="container content">{this.props.children || <Index location={ this.props.location } />}</div>
            <MobBox />
            <Footer/>
            <TipsBox/>
        </div>
    }
}

export default (
    <Route path="/" component={App}>
        <IndexRoute  component={Index} />
        <Route path="Publish" component={Publish} />
        <Route path="About" component={About} />
        <Route path="Search" component={Search} />
        <Route path="/:name/:date/:title" component={Details} />
        <Route path="/ReactForm" component={ReactForm} />
        <Route path="*" component={Page404}/>
    </Route>
)


