var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanPlugin = require('clean-webpack-plugin')
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
var nodeModules = {}

fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod
    })

module.exports = [{
    entry: {
        vendor: ['react','redux','react-redux','react-router'],
        bundle: './src/client'
    },
    output: {
        path: path.resolve(__dirname,  "./dist"), //静态资源会再这目录下
        filename: "js/[name].js",
        chunkFilename: "js/[name].js",
        publicPath: "/" //html里面的引用路径会变成这个
    },
    resolve: {
        extensions: ['', '.js', '.less', '.css', '.png', '.jpg'], //第一个是空字符串! 对应不需要后缀的情况.
        root: './src',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            //loader: 'babel?presets[]=es2015&presets[]=react'
            loader: 'babel-loader',
            query: {
              presets: [["es2015", { "loose": true }],'react','stage-0'],
              // plugins: ["transform-es5-property-mutators","transform-jscript","transform-es3-property-literals","transform-es3-member-expression-literals",]
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            /*loader: "style!css!less",*/
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            /*loader: "style!css!less",*/
            loader: ExtractTextPlugin.extract('style', 'css!less')
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            loader: 'url?limit=10000&name=img/[name].[hash].[ext]'
        }, {
            test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
            exclude: /node_modules/,
            loader: 'url?prefix=font/&limit=10000&name=font/[name].[ext]'
        }],
        // postLoaders: [{ 
        //     test: /\.js$/, 
        //     exclude: /node_modules/,
        //     loaders: ['es3ify-loader'],
        // }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            //favicon:path.join(__dirname,'../src/favicon.ico'),
            title: "贺传华的个人网站",
            template: path.join(__dirname,'./src/index.html'),
            filename: 'index.ejs',
            inject:'body',
            html:'<%- __html__ %>',
            initialData:'window.__INITIAL_STATE__ = <%- __state__ %>',
            hash:false,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:false,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        //new CleanPlugin(['dist/js']),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                //drop_debugger: true,
                drop_console: true
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(), //按引用频度来排序 ID，以便达到减少文件大小的效果
        new ExtractTextPlugin('[name].[hash].css', {
            allChunks: true
        }),
        // new CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks: Infinity
        // }),
    ],

},
{
    target: "node",
    context: path.join(__dirname, "./"),
    entry: { 
        index: [
            './src/server' 
        ]
    },
    externals: nodeModules,
    output: {
        path: path.resolve(__dirname,  "./dist"), //静态资源会再这目录下
        filename: "server.js",
        publicPath: "/", //html里面的引用路径会变成这个
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['', '.js', '.less', '.css', '.png', '.jpg'], //第一个是空字符串! 对应不需要后缀的情况.
        root: './src',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            //exclude: /node_modules/,
            //loader: 'babel?presets[]=es2015&presets[]=react'
            loader: 'babel-loader',
            query: {
              presets: [["es2015", { "loose": true }],'react','stage-0'],
              // plugins: ["transform-es5-property-mutators","transform-jscript","transform-es3-property-literals","transform-es3-member-expression-literals",]
            }
        }, {   
            test: /\.json$/, 
            loader: "json-loader" 
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            /*loader: "style!css!less",*/
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            /*loader: "style!css!less",*/
            loader: ExtractTextPlugin.extract('style', 'css!less')
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            loader: 'url?limit=10000&name=img/[name].[hash].[ext]'
        }, {
            test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
            exclude: /node_modules/,
            loader: 'url?prefix=font/&limit=10000&name=font/[name].[ext]'
        }],
        // postLoaders: [{ 
        //     test: /\.js$/, 
        //     exclude: /node_modules/,
        //     loaders: ['es3ify-loader'],
        // }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        //new CleanPlugin(['dist/js']),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         //drop_debugger: true,
        //         drop_console: true
        //     }
        // }),
        new webpack.IgnorePlugin(/vertx/),
    ],

}]


