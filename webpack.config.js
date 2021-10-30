const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const sourceDir = path.resolve(__dirname);
const DEFAULT_WEBPACK_PORT = 3001;

module.exports = {
    mode: "development",
    entry: './src/index.js',

    output: {
      filename: "index.js",
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: "index.html",
        filename: "index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].bundle.[hash].css"
      })
    ],

    devtool: "source-map",

    module: {
      rules: [
        {
          test: /.(js)$/,
          include: [sourceDir],
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
                ["@babel/preset-env", {
                  "useBuiltIns": "entry",
                  "corejs": 3
                }]
            ]
          }
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            // inserts <link/> tag to generated CSS file, inside the generated index.html
            {loader: MiniCssExtractPlugin.loader},
            "css-loader",
            "resolve-url-loader",
            // Compiles Sass to CSS
            {
              loader: "sass-loader",
              options: {
                sourceMap: true // resolve-url-loader needs sourcemaps, regardless of devtool (cf. resolve-url-loader's README)
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [
            {loader: MiniCssExtractPlugin.loader},
            "style-loader",
            "css-loader",
          ]
        },
        {
          test: /\.html$/i,
          loader: "html-loader"
        },
        { // loader for fonts
          test: /\.(eot|woff|woff2|otf|ttf|svg)$/,
          use: [{
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          }]
        },
        {
          test: /\.(png|gif|jpg)$/,
          use: [{
            loader: "file-loader",
            options: {
              name: "images/[name].[contenthash].[ext]"
            }
          }]
        }
      ],
    },
    optimization: {
      minimizer: [new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
            ecma: undefined,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            module: false,
            // Deprecated
            output: null,
            format: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false,
          },
        exclude: []
      })]
    },
    devServer: {
      hot: true,
      open: true,
      openPage: "",
      port: DEFAULT_WEBPACK_PORT
    }
  
};
