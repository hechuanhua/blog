# blog

blog在线预览地址：http://112.74.76.57

 前端: react+redux+react-router
 
 后端: node+express+mongoDB提供的API
 
 前后端完全分离

### 开始 
1.安装 nodejs(>=4) 
2.启动mongodb

### 运行
    git clone https://github.com/hechuanhua/blog.git
    npm install
    npm install webpack -g
    
    开发环境===>
    npm run node
    npm run dev
    (上面2个命令开2个窗口同时运行)
    浏览器输入 localhost:7070

    生产环境===>
    npm run node
    npm run dist(linux下是 npm run dist_linux)
    浏览器输入 localhost:8080
