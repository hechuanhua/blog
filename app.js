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
var config = require('./config/index')

var accessLog = fs.createWriteStream('access.log', { flags: 'a' })
var errorLog = fs.createWriteStream('error.log', { flags: 'a' })
  

function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK)
    } catch (e) {
        return false
    }
    return true
}

if (!fsExistsSync(path.join(__dirname, './dist'))) {
    fs.mkdir(path.join(__dirname, './dist'))
}
if (!fsExistsSync(path.join(__dirname, './dist/images'))) {
    fs.mkdir(path.join(__dirname, './dist/images'))
}

global.config = config

if ( config.isDev ) {
    var webpack = require('webpack')
    var webpackDevMiddleware = require('webpack-dev-middleware')
    var webpackHotMiddleware = require('webpack-hot-middleware')
    var WebpackConfig = require('./webpack.dev.config')
    var compiler = webpack(WebpackConfig)
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
    app.set('views', path.join(__dirname, 'dist'))
    app.set('view engine', 'ejs')
}
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(config.cookieName))
app.use(express.static(path.join(__dirname, 'dist'), { maxAge: 0 }))
app.set('port', config.port)


app.use('/',router)
app.listen(app.get('port'), function() {
    console.log('请打开浏览器localhost: ' + app.get('port'))
})
