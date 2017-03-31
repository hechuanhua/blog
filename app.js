var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoConnect = require('connect-mongo')(session)
var multer = require('multer')
var fs = require('fs')
var logger = require('morgan')
var Server = require('mongodb').Server
var Db = require('mongodb').Db
var mongoDb = new Db('blog', new Server('localhost', 27017, { safe: true }))
var app = express()

var accessLog = fs.createWriteStream('access.log', { flags: 'a' })
var errorLog = fs.createWriteStream('error.log', { flags: 'a' })

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var WebpackConfig = require('./webpack.dev.config')
var compiler = webpack(WebpackConfig)

global.isDev = process.env.NODE_ENV == 'production' ? false : true
var port = isDev ? '8080' : '8080'
console.log('process.env.NODE_ENV',process.env.NODE_ENV)
if ( isDev ) {
    var router = require('./src/server')
    app.use(webpackHotMiddleware(compiler))
    app.use(webpackDevMiddleware(compiler, {
        publicPath: '',
        stats: {
            colors: true
        }
    })) 
} else {
    var router = require('./dist/server')
}

app.set('port', port)
app.use(logger('short'))
app.use(logger({ stream: accessLog }))
app.use(function(err, req, res, next) {
    var meta = '[' + new Date() + '] ' + req.url + '\n'
    errorLog.write(meta + err.stack + '\n')
    next()
})
app.use(express.static(path.join(__dirname, 'dist'), { maxAge: 0 }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: 'myblog', //用来对session数据进行加密的字符串，必须。通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    key: 'blog', //字符串,用于指定用来保存session的cookie名称,默认为coomect.sid.
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 5 }
}))
app.all('*',router)
app.listen(app.get('port'), function() {
    console.log('请打开浏览器localhost: ' + app.get('port'))
})
