var express = require('express')
var fs = require('fs')
var path = require('path')
var Server = require('mongodb').Server
var multer = require('multer')
var Db = require('mongodb').Db
var mongoDb = new Db(config.mongoDbName, new Server(config.mongoDbHost, config.mongoDbPort, { safe: true }))
var router = express.Router()
var jwt = require('jwt-simple')

import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import { combineReducers, createStore, applyMiddleware } from "redux"
import { match, RouterContext} from 'react-router'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import stores from './common/reducers/index'
import rootRoute from './common/route'
import * as actions from './common/actions'




function renderFullPage(html, initialState) {
    return `
        <!doctype html>
        <html>
            <head>
                <title>我的个人网站</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
            </head>
            <body>
                <div id="root">${html}</div>
                <script>
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script src="/js/vendor.js"></script><script src="/js/bundle.js"></script>
            </body>
        </html>
    `
}


function handleRender(req, res, next) {
    
    const store = createStore(
        stores,
        applyMiddleware(thunkMiddleware)
    )
    
    if (req.cookies[config.cookieName]) {
        var data = jwt.decode(req.cookies[config.cookieName],config.jwtSecret)
        data = {info:{ name : data.name }}
        store.dispatch(actions.loginTop("loginIn",data))
    } else{
        store.dispatch(actions.loginTop("loginOut"))
    }
    match({ routes:rootRoute, location: req.url }, (error, redirectLocation, renderProps) => {
        
        if (error) {
           res.status(500).end('Internal Server Error');
        } else if (renderProps) {

            let ajaxData = renderProps.components
                .filter(x=>x.ajaxData)
                .reduce((prev,current)=>{
                    return current.ajaxData(renderProps).concat(prev)
                },[])
                .map(x=>{
                    return store.dispatch(x)
                })
               
            Promise.all(ajaxData)
            .then(function(data){

                const html = renderToString(
                    <Provider store={store} >
                      <RouterContext {...renderProps} />
                    </Provider>
                )
                const initialState = store.getState()

                if( config.isDev ){
                    res.set('Content-Type', 'text/html')
                    return res.status(200).send(renderFullPage(html, initialState))
                }else{
                    return res.render('index', {__html__: html,__state__: JSON.stringify(initialState)})
                }

            })
            .catch(function(e) {
                console.error(e);
            });

        } else {
            res.status(404).end('Not found');
        }
        
    })
}


router.all('*', function(req, res, next) {

    handleRender(req, res, next)

})


module.exports = router