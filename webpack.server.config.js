var path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = [{
    entry: { 
        index: [
            './src/client/index' 
        ]
    },
    output: {
        path: path.resolve(__dirname, "./dist" ), //静态资源会再这目录下
        filename: "js/[name].[hash].min.js",
        chunkFilename:"js/[name].[hash].chunk.js" ,
        publicPath:"/" //html里面的引用路径会变成这个
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
        new CleanPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                //drop_debugger: true,
                drop_console: true
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(), //按引用频度来排序 ID，以便达到减少文件大小的效果
        // new ExtractTextPlugin('[name].[hash].css', {
        //     allChunks: true
        // }),
        new CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    ],
    devtool : 'source-map'
}, {
    name: "server-side rendering",
    context: path.join(__dirname, "./"),
    target: "node",
    entry: {
        server: ['babel-polyfill', '.app.js']
    },
    output: {
        path: './dist',
        filename: "app.js",
        publicPath: "/",
        libraryTarget: "commonjs2"
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(), new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }), 
        new webpack.DefinePlugin({
            __DEVCLIENT__: false,
            __DEVSERVER__: false,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.IgnorePlugin(/vertx/)
    ],
    module: {
        preLoaders: [{
            test: /\.js$|\.jsx$/,
            loader: "eslint-loader",
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.js$|\.jsx$/,
            loader: 'babel',
            query: {
                "presets": ["es2015", "react", "stage-0"],
                "plugins": ["transform-es5-property-mutators","transform-jscript","transform-es3-property-literals","transform-es3-member-expression-literals"]
            },
            include: path.join(__dirname, '..', 'src'),
            exclude: /node_modules/,
        },
        {
            test: /\.(jpe?g|png|gif)$/i,
            loaders: ['url?limit=10000&name=images/[hash:8].[name].[ext]', 'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}']
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: ["src", "node_modules"]
    }
}]
