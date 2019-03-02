const path = require('path');
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
  },
  plugins: [
    new HtmlPlugin({
      template: "./src/index.html",
    }),
    new CopyPlugin([
      {
        from: "src",
        to: path.resolve("dist"),
        ignore: [
          "js",
        ]
      },
    ])
  ]
};