/**
 * 
 * @authors hechuanhua (you@example.org)
 * @date    2017-04-05 09:05:05
 * @version $Id$
 */

/*mongoDB*/
const mongoDbHost = 'localhost' 
const mongoDbPort = '27017'
const mongoDbName = 'blog'

/*WEB*/
const host = 'localhost'
const isDev = process.env.NODE_ENV == 'production' ? false : true
const port = isDev ? '7070' : '8080'

if(process.env.NODE_ENV == 'hechuanhua' ){
	const requestAPI = "http://"+config.host+":"+config.port+"/api/"
}else{
	const requestAPI = "http://"+config.host+"/api/"
}


var config = {
    mongoDbHost : mongoDbHost,
    mongoDbPort : mongoDbPort,
    mongoDbName : mongoDbName,
    isDev : isDev,
    host : host,
    port : port,
    requestAPI:requestAPI
}



//export default host
module.exports = config