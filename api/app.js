var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoConnect = require('connect-mongo')(session)
var multer = require('multer')
var fs = require('fs')
var logger = require('morgan')
var app = express()
var config = require('../config/index')

global.config = config

var router = require('./api')

// var accessLog = fs.createWriteStream('access.log', { flags: 'a' })
// var errorLog = fs.createWriteStream('error.log', { flags: 'a' })
  



app.set('port', config.apiPort)
app.use(logger('short'))
//app.use(logger({ stream: accessLog }))
app.use(function(err, req, res, next) {
    var meta = '[' + new Date() + '] ' + req.url + '\n'
    errorLog.write(meta + err.stack + '\n')
    next()
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(config.cookieName))
// app.use(session({
//     secret: 'myblog', //用来对session数据进行加密的字符串，必须。通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
//     key: 'blog', //字符串,用于指定用来保存session的cookie名称,默认为coomect.sid.
//     cookie: { maxAge: 1000 * 60 * 60 * 24 * 5 },
//     resave: true,
//     saveUninitialized: true,
//     store: new mongoConnect({ //属性值为一个用来保存session数据的第三方存储对象
//         url: 'mongodb://'+config.mongoDbHost+':'+config.mongoDbPort+'/'+config.mongoDbName
//     })
// }))

app.all('*',router)
app.listen(app.get('port'), function() {
    console.log('请打开浏览器localhost: ' + app.get('port'))
})
