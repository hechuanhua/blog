# blog

blog在线预览地址：http://www.hechuanhua.cn

 前端: react+redux+react-router
 
 后端: node+express+mongoDB提供的API
 
 前后端完全分离

### 开始 
修改mondoDb.sh路径为自己本机上的mongo路径

### 运行
    git clone https://github.com/hechuanhua/blog.git
    npm install
    npm install webpack babel babel-cli -g
    启动mongo：  ./mongoDb.sh


##### 开发环境
    npm start
    浏览器输入 localhost:8080

##### 生产环境
    npm run dist(npm run dist_linux)
    浏览器输入 localhost:8080

### 2017-03-30
    支持服务端渲染
### 2017-01-11
    增加文章分类，兼容ie9及以上
### 2016-12-4
    修复页码显示错乱问题
    优化webpack开发环境下打包流程

