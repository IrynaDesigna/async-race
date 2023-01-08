const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        dependency: { not: ['url'] },
         use: [
           {
             loader: 'url-loader',
             options: {
               limit: 8192,
             },
           },
         ],
      // type: 'javascript/auto'
     },
    ]
  }
};
