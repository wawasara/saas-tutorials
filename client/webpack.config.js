const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  //   entry: "./src/index.js",
  //   output: {
  //     filename: "main.js",
  //     path: path.resolve(__dirname, "./dist"),
  //     publicPath: "dist/"
  //   },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: { node: "current" }, // for Node
                  modules: false // for tree-shaking
                }
              ],
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: "style-loader, css-loader"
        // use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      //   {
      //     test: /\.(png|jpg|gif)$/,
      //     use: [
      //       {
      //         loader: "file-loader",
      //         options: {
      //           name: "[name].[ext]?[hash]",
      //           publicPath: "./dist/"
      //         }
      //       }
      //     ]
      //   },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]?[hash]",
              publicPath: "./dist/",
              limit: 10000 // 10kb
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id]css"
    })
  ]
};
