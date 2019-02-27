var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: 'none',
  // entry: './src/index.js',
  // output: {
  //   path: path.resolve(__dirname, './dist'),
  //   publicPath: 'dist/',
  //   filename: 'build.js'
  // },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.vue?$/,
        exclude: /(node_modules)/,
        use: 'vue-loader'
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: 'index.html'
      }
    )
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true
  },
  externals: {
      // global app config object
      config: JSON.stringify({
          // apiUrl: 'http://localhost:4000'
      })
  }
}
