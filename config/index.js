/**
 * 
 * @authors hechuanhua (you@example.org)
 * @date    2017-04-05 09:05:05
 * @version $Id$
 */
var isDev = process.env.NODE_ENV == 'development'
console.log(isDev,process.env.NODE_ENV)
var devConfig = {
    mongoDbHost : 'localhost',
    mongoDbPort : '27017',
    mongoDbName : 'blog',
    host : 'localhost',
    port : '7070',
    isDev : isDev,
    apiPort:8888,
    requestAPI:'http://localhost:8888/api/',//api地址
    cookieName:'hchBlog',	//cookie名字
    expires:'30',			//cookie失效时间（天）
    jwtSecret:'hechuanhua'	//jwt加密钥匙
}

var proConfig = {
    mongoDbHost : 'localhost',
    mongoDbPort : '27017',
    mongoDbName : 'blog',
    host : 'localhost',
    port : '8080',
    isDev : !isDev,
    apiPort:8888,
    requestAPI:'http://localhost:8888/api/',//api地址
    cookieName:'hchBlog',	//cookie名字
    expires:'30',			//cookie失效时间（天）
    jwtSecret:'hechuanhua'	//jwt加密钥匙
}


module.exports = isDev ? devConfig : proConfig