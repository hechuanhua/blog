var express = require('express')
var fs = require('fs')
var path = require('path')
var Server = require('mongodb').Server
var multer = require('multer')
var Db = require('mongodb').Db
var mongoDb = new Db(config.mongoDbName, new Server(config.mongoDbHost, config.mongoDbPort, { safe: true }))
var router = express.Router()
var jwt = require('jwt-simple')
var ObjectId = require('mongodb').ObjectID

function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}
if(!fsExistsSync('dist')){
    fs.mkdir(path.join(__dirname, 'dist'))
    if(!fsExistsSync('dist/images')){
        fs.mkdir(path.join(__dirname, 'dist/images'))
    }
}

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './dist/images')
    },
    filename: function(req, file, cb) {
        console.log(file)
        var date = new Date()
        var Month = date.getMonth() + 1,
            Seconds = new Date().getSeconds()
        Month = Month < 10 ? "0" + Month : Month
        var Hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
        var Minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        Seconds = Seconds < 10 ? "0" + Seconds : Seconds
        date = date.getFullYear() + "" + Month + "" + Hours + "" + Minutes + "" + Seconds + ""
        var type = (file.originalname).split(".");
        cb(null, file.fieldname + date + "." + type[type.length - 1])
    }
})
var uploadImg = multer({ storage: storage })
uploadImg = uploadImg.single('upload')

function verification(req, res, next){
    var token = req.cookies[config.cookieName]||req.body.token
}

function encrypt(userId,userName){
    return jwt.encode({
        userId:userId,
        userName:userName,
        expires:new Date().getTime()+(1000*60*60*24*config.expires)
    },config.jwtSecret)
}

function decrypt(str){
    return jwt.decode(str,config.jwtSecret)
}

router.all('*', function(req, res, next) {
    
    res.header('Access-Control-Allow-Origin', 'http://localhost:7070')
    res.header('Access-Control-Allow-Headers', 'Content-Type=application/jsoncharset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true) //支持跨域传cookie
    console.log(req.session,req.cookies,req.originalUrl)
    next()

})

router.get('*', function(req, res, next) {
    
    if(req.url.indexOf('/api')>-1||req.url.indexOf('/images')>-1||req.url.indexOf('favicon.ico')>-1){
        next()
    }else{
        
    }

})

router.post('/api/auth',function(req,res){
    var token = decrypt(req.body.token)
    if( token ){
        auth(token,function(err,user){
            if (err) {
                return res.json({ code: 1009, messgage: err })
            }
            if(user){
                if(user.name == token.userName){
                    var token1 = encrypt(user._id,user.name)
                    var data = {'userName':user.name,'token':token1}
                    res.json({ code: 1000, messgage: "认证成功，token合法", data: data })
                }else{
                    res.json({ code: 1001, messgage: "认证失败，非法的token", data: '' })
                }
            }
        })
    } else {
        return false
    }
})

router.get('/api/getUserInfo', function(req, res) {
    
    if (req.cookies[config.cookieName]) {
        var cookies = JSON.parse(req.cookies[config.cookieName])
        var data = { name: cookies[config.cookieName].name }
        return res.json({ code: 1000, messgage: "已登录", data: data })
    } else {
        return res.json({ code: 1001, messgage: "未登录" })
    }

})

router.post('/api/login', function(req, res) {
    
    var newUser = new User(req.body)
    newUser.get(newUser.name, function(err, user) {
        if (err) {
            res.end(JSON.stringify({ code: 1009, messgage: err }))
        }
        if (user) {

            if (user.password == newUser.password) {
                var token = encrypt(user._id,user.name)
                //res.cookie(config.cookieName,JSON.stringify(user))
                var data = {'userName':user.name,'token':token}

                res.end(JSON.stringify({ code: 1000, messgage: "登录成功", data: data }))
            } else {
                res.end(JSON.stringify({ code: 1001, messgage: "密码错误" }))
            }
        } else {
            res.end(JSON.stringify({ code: 1002, messgage: "用户名不存在" }))
        }
    })

})

router.post('/api/reg', function(req, res) {

    var newUser = new User(req.body)
    newUser.get(newUser.name, function(err, user) {
        if (err) {
            res.end(JSON.stringify({ code: 1009, messgage: err }))
        }
        if (user) {
            res.end(JSON.stringify({ code: 1002, messgage: '用户名已存在' }))
        }
        newUser.save(function(user) {
            res.end(JSON.stringify({ code: 1000, messgage: '注册成功' }))
        })
    })

})

router.get('/api/loginout', function(req, res) {

    return res.json({ code: 1000, messgage: "退出成功" })
})

router.post('/api/publish', checkLogin)
router.post('/api/publish', function(req, res) {
    
    uploadImg(req, res, function(err) {
        
        if (err) {
            return console.log(err)
        }
        Upload.getTitle(req.body.title, function(err, title) {
            if (title) {
                return res.json({ code: 1002, messgage: "标题已存在" })
            }
            var token = decrypt(req.cookies[config.cookieName])
            var newUpload = new Upload({
                name: token.userName,
                title: req.body.title,
                content: req.body.content,
                upload: req.file ? "/images/" + req.file.filename : "",
                category:req.body.category,

            })
            newUpload.save(function(err) {
                return res.json({ code: 1000, messgage: "发布成功" })
            })
        })
    })

})

router.get('/api/newsList', function(req, res) {

    var page = req.query.page || 1
    var category = req.query.category
    var type = category?category:''
    var params = {"type":type,"page":page}
    Upload.getList(params, function(err, list, page) {
        var data = {}
        data["data"] = list
        data["page"] = page
        return res.json(data)
    })

})

router.get('/api/a/:name/:day/:title', function(req, res) {

    var params = req.params
    Upload.getOne(params.name, params.day, params.title, function(err, oneDoc) {
        if(err){
            console.log('err')
        }
        if (oneDoc) {
            console.log('456')
            res.end(JSON.stringify(oneDoc))
        } else {
            console.log('567')
            res.end(JSON.stringify({}))
        }
    })

})

router.post('/api/a/:name/:day/:title', function(req, res) {

    var params = req.params
    var date = new Date()
    var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "   " + date.getHours() + ":" + date.getMinutes()
    var comments = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        time: time
    }
    Comment(params.name, params.day, params.title, comments, function() {
        res.end(JSON.stringify({ code: 1000, message: "留言成功" }))
    })

})

router.get('/api/search', function(req, res) {
    var keywords = ''
    var keyword = req.query.keyword

    if (keyword) {

        keywords = req.query
        Search(keywords, function(doc, page) {
            var searchData = {}
            searchData["data"] = doc
            searchData["page"] = page
            res.json(searchData)
        })
    } else {}

})

router.post('/api/about', function(req, res) {

    if (!req.session.user) {
        return res.json({ code: 1001, messgage: "请先登录" })
    }
    if (req.session.user.name !== "贺传华") {
        return res.json({ code: 1001, messgage: "你不是管理员，无法修改" })
    }
    
    About(req.body.content, function(err) {
        if (err) {
            return res.json({ code: 1001, messgage: err })
        }
        return res.json({ code: 1000, messgage: "修改成功" })
    })

})

router.get('/api/about', function(req, res) {

    About.getInfo(function(err, data) {
        if (err) {
            return res.json({ code: 1001, messgage: err })
        }
        return res.json({ code: 1000, data: data })
    })

})

function checkLogin(req, res, next) {


    var token = req.cookies[config.cookieName] && decrypt(req.cookies[config.cookieName])
    if( token ){
        auth(token,function(err,user){
            if (err) {
                return res.json({ code: 1009, messgage: err })
            }
            if(user){
                if(user.name == token.userName){
                    console.log(77777)
                    next()
                }else{
                    return res.json({ code: 1009, messgage: "您还未登录,请先登录" })
                }
            }
        })
    } else {
        next()
    }
}

function checkNotLogin(req, res, next) {

    if (req.session.user) {
        return res.json({ code: 1000, messgage: "您已登录,不需重新登录" })
    }
    next()

}

var User = function(user) {
    this.name = user.userName
    this.password = user.password
    this.email = user.email
}

/*保存用户密码*/
User.prototype.save = function(callback) {
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    }
    mongoDb.open(function(err, db) {
        if (err) {
            return callback(err)
        }
        db.collection('users', function(err, collection) {
            if (err) {
                mongoDb.close()
                return callback(err)
            }
            collection.insert(user, function(err, user) {
                mongoDb.close()
                if (err) {
                    return callback(err)
                }
                callback(null, user)
            })
        })
    })
}

/*获取用户名，防止用户名相同*/
User.prototype.get = function(name, callback) {
    mongoDb.open(function(err, db) {
        if (err) {
            return callback(err)
        }
        db.collection('users', function(err, collection) {
            if (err) {
                mongoDb.close()
                return callback(err)
            }
            collection.findOne({ name: name }, function(err, user) {
                mongoDb.close()
                if (err) {
                    return callback(err)
                }
                callback(null, user)
            })
        })
    })
}

var Upload = function(uploadlist) {
    this.name = uploadlist.name
    this.title = uploadlist.title
    this.content = uploadlist.content
    this.upload = uploadlist.upload 
    this.category = uploadlist.category
}

/*保存文章内容*/
Upload.prototype.save = function(callback) {
    var date = new Date()
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    var upload = {
        name: this.name,
        title: this.title,
        content: this.content,
        upload: this.upload,
        time: time,
        pv: 0,
        category:this.category
    }
    mongoDb.open(function(err, db) {
        db.collection('upload', function(err, collection) {
            collection.insert(upload, function(err, upload) {
                mongoDb.close()
                callback(null, upload)
            })
        })
    })
}

/*获取文章标题，防止文章标题一样*/
Upload.getTitle = function(title, callback) {
    mongoDb.open(function(err, db) {
        db.collection('upload', function(err, collection) {
            collection.findOne({ title: title }, function(err, upload) {
                //console.log("getTitle.upload======>:",upload)
                mongoDb.close()
                callback(null, upload)
            })
        })
    })
}

/**
 * [Search description]
 * @param {[type]}   keywords [搜索关键字]
 * @param {Function} callback [description]
 * return 返回搜索结果和统计条数以及一次查询几条
 */
function Search(keywords, callback) {
    
    var keyword = keywords.keyword,
        limit = {},
        page = keywords.page || 1
    var keywordRegExp = new RegExp(keyword, "i"),
        num = 5
    var query = {
        $or: [
            { "title": keywordRegExp },
            { "content": keywordRegExp }
        ]
    }
    var limit = {
        limit: num,
        skip: (page - 1) * num
    }
    mongoDb.open(function(err, db) {
        db.collection('upload', function(err, collection) {
            collection.count(query, function(err, count) {
                collection.find(query, limit).toArray(function(err, doc) {
                    mongoDb.close()
                    var page = {}
                    page["count"] = count
                    page["limitNum"] = num
                    callback(doc, page)
                })
            })
        })
    })
}

/*获取文章列表（每次num条）*/
Upload.getList = function(data, callback) {
    var num = 5
    mongoDb.open(function(err, db) {
        db.collection('upload', function(err, collection) {
            if(data.type){
                collection.count({'category':data.type}, function(err, count) {
                    collection.find({'category':data.type}, {
                        limit: num,
                        skip: (data.page - 1) * num
                    }).sort({
                        time: -1
                    }).toArray(function(err, list) {
                        mongoDb.close()
                        var page = {}
                        page["count"] = count
                        page["limitNum"] = num
                        callback(null, list, page)
                    })
                })
            }else{
                collection.count({}, function(err, count) {
                    collection.find({}, {
                        limit: num,
                        skip: (data.page - 1) * num
                    }).sort({
                        time: -1
                    }).toArray(function(err, list) {
                        mongoDb.close()
                        var page = {}
                        page["count"] = count
                        page["limitNum"] = num
                        callback(null, list, page)
                    })
                })
            }
        })

    })
}

/*获取具体的一篇文章*/
Upload.getOne = function(name, day, title, callback) {
    mongoDb.open(function(err, db) {
        db.collection('upload', function(err, collection) {
            collection.findOne({
                "name": name,
                "time.day": day,
                "title": title
            }, function(err, oneDoc) {
                if (oneDoc) {
                    collection.update({
                            "name": name,
                            "time.day": day,
                            "title": title
                        }, {
                            $inc: { "pv": 1 }
                        }, function(err) {
                            mongoDb.close()
                            if (err) {
                                return callback(err)
                            }
                        })
                        //console.log("oneDoc======>:",oneDoc)
                    callback(null, oneDoc)
                }
            })
        })
    })
}

/*插入评论*/
function Comment(name, day, title, comments, callback) {
    var date = new Date()
    mongoDb.open(function(err, db) {
        db.collection('upload', function(err, collection) {
            collection.update({
                "name": name,
                "time.day": day,
                "title": title,
            }, { $push: { "comments": comments } }, function(err) {
                if (err) {
                    return callback(err)
                }
                mongoDb.close()
                callback(null)
            })
        })
    })
}

/*关于网站*/
function About(content, callback) {
    mongoDb.open(function(err, db) {
        db.collection('about', function(err, collection) {
            if (err) {
                return callback(err.toString())
            }
            var date = new Date()
            var time = {
                date: date,
                year: date.getFullYear(),
                month: date.getFullYear() + "-" + (date.getMonth() + 1),
                day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
                minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
                    date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
            }
            collection.findOne({ "title": "about" }, function(err, oneDoc) {
                if (oneDoc) {
                    collection.update({
                        "title": "about"
                    }, { $set: { "content": content, "time": time } }, function(err, doc) {
                        if (err) {
                            return callback(err)
                        }
                        mongoDb.close()
                        callback(null)
                    })
                } else {
                    collection.insert({ "title": "about", "content": content, "time": time }, {
                        safe: true
                    }, function(err) {
                        if (err) {
                            return callback(err)
                        }
                        mongoDb.close()
                        callback(null)
                    })
                }
            })
        })
    })
}

function auth(token,callback){
    mongoDb.open(function(err, db) {
        db.collection('users', function(err, collection) {
            collection.findOne({_id:ObjectId(token.userId)}, function(err, user) {
                mongoDb.close()
                if (err) {
                    return callback(err)
                }
                callback(null,user)
            })
        })
    })
}
About.getInfo = function(callback) {
    mongoDb.open(function(err, db) {
        db.collection('about', function(err, collection) {
            if (err) {
                return callback(err.toString())
            }
            collection.findOne({ "title": "about" }, function(err, oneDoc) {
                if (err) {
                    return callback(err.toString())
                }
                if (oneDoc) {
                    //console.log(oneDoc)
                    mongoDb.close()
                    callback(null, oneDoc)
                }
            })
        })
    })
}

module.exports = router