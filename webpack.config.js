var path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var prod = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
    entry: { index: './src/index.js' },
    output: {
        path: path.resolve(__dirname, prod ? "./dist" : "./build"), //静态资源会再这目录下
        filename: prod ? "js/[name].[hash].min.js" : "js/[name].js",
        chunkFilename: prod ? "js/[name].[hash].chunk.js" : "js/[name].js",
        publicPath: prod ? "" : "" //html里面的引用路径会变成这个
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
            filename: 'index.html',
            template: './index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    ],
    devServer: {
        port: 7070,
        hot: true,
        historyApiFallback: true,
        publicPath: "",
        stats: {
            colors: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
}
if (prod) {
    module.exports.plugins = (module.exports.plugins || [])
        .concat([
            //new CleanPlugin(['dist/js']),
            //new webpack.optimize.UglifyJsPlugin({
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
            new CommonsChunkPlugin({
                name: 'common',
                minChunks: Infinity
            }),
        ]);
    //module.exports.devtool = 'source-map';
} else {
    module.exports.devtool = 'source-map';
    module.exports.plugins = (module.exports.plugins || [])
        .concat([ 
            new ExtractTextPlugin('[name].css', {
                allChunks: true
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
        ])
}
