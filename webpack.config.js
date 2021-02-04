const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './assets/js/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    port: 8090
	},
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              //URL の解決を無効に
              url: false,
              // ソースマップを有効に
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              // dart-sass を優先
              implementation: require('sass'),
              // ソースマップを有効に
              sourceMap: true,
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    })
  ]
};