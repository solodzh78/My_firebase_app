const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  
  entry: './src/app.js',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  devServer: {
    hot: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}