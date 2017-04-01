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
import route from '../common/route'

import "../less/style.less"
import '../form/css/form.css'


let store = createStore(
    stores,
    applyMiddleware(thunkMiddleware)
)

const About = require('../common/components/about')
const Search = require('../common/components/search')
const Details = require('../common/components/details')
const Publish = require('../common/components/publish')
const ReactForm = require('../form/containers/App')
const Page404 =  require('../common/components/page404')



render(( 
    < Provider store = { store } >
        < Router  history = { browserHistory } >
            {route}
        < /Router> 
    < /Provider>
), document.getElementById("root"))
