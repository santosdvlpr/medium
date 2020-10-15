import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = {

  entry: ['@babel/polyfill', path.join(__dirname,'src','index.js')],
  output: {
    path: path.join(__dirname,'build'),
    filename: 'index.bundle.js'
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 8080
  },  
  module: {
      rules: [
          {
              // Isto é para que seja possível compilar qualquer código React,
              // ES6 e acima para a sintaxe normal ES5
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ['babel-loader']
          },
          {
              test: /\.(css|scss)$/,
              use: [
                  "style-loader", //cria estilo node apartir de js
                  "css-loader", // transpila CSS em commonJS
                  "sass-loader" // compila Sass para CSS, usando Node Sasspor default 
              ]
          },
          {
              test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
              loaders: ['file-loader'] 
          }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'src','index.html')
    })
  ]
};