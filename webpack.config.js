const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');


const config = require('./project.config.js');
const pkg = require('./package.json');


const babelConfig = Object.assign({}, pkg.babel, {
  babelrc: false,
  cacheDirectory: true,
});

const webpackConfig = {
  // The base directory for resolving the entry option
  context: config.src,

  // The entry point for the bundle
  entry: config.js.src,

  // Options affecting the output of the compilation
  output: {
    path: config.js.dist,
    publicPath: config.publicPath,
    // filename: config.isDevelopment ? 'bundle.js?[hash]' : 'bundle.[hash].js',
    filename: config.js.concat,
    // chunkFilename: config.isDevelopment ? '[id].js?[chunkhash]' : '[id].[chunkhash].js',
    chunkFilename: '[id].js',
    sourcePrefix: '  ',
  },

  resolve: {
    modules: [
      config.src,
      config.components,
      config.css.dir,
      "node_modules"
    ],
    extensions: [".jsx", ".js", ".json"]
  },

  // Switch loaders to debug or release mode
  // debug: config.isDevelopment,

  // Developer tool to enhance debugging, source maps
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: config.isDevelopment ? 'inline-source-map' : false,

  // What information should be printed to the console
  stats: {
    colors: true,
    reasons: false,
    hash: false,
    version: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false,
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': config.isDevelopment ? '"development"' : '"production"',
      __DEV__: config.isDevelopment,
    }),
    // Emit a JSON file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: config.js.dist,
      filename: 'assets.json',
      prettyPrint: true,
    }),
    new WriteFilePlugin({
      test: /\.css$/,
      force:true
      // useHashIndex: true,
      // log: false
    })
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: [`babel-loader?${JSON.stringify(babelConfig)}`, 'webpack-module-hot-accept'],
        exclude: /node_modules/
      },
      {
        test: /\.(svg|jpg|jpeg|png)$/,
        // loader: "file-loader"
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              // publicPath: 'http://localhost:3000/'
            }
          }
        ]
        // loader: "file-loader?name=[path][name].[ext]"
        // loader: "url-loader?name=img/[name].[ext]"
      }
    ],
  }
};

if (config.isDevelopment) {
  babelConfig.plugins.unshift('react-hot-loader/babel');
  webpackConfig.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client?overlay=false&reload=true&noInfo=true&overlay=false');
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());

  webpackConfig.plugins.push(new ExtractTextPlugin(config.css.webpackStyleName));
  webpackConfig.module.rules.push({
                                    test: /\.css$/,
                                    use: ExtractTextPlugin.extract({
                                            fallback: "style-loader",
                                            use: [
                                              {
                                                loader: 'css-loader',
                                                options: {
                                                  // url:false,
                                                  sourceMap: true,
                                                  importLoaders: 1
                                                }
                                              },
                                              'postcss-loader'
                                            ]
                                          })
                                    
                                  });

  // webpackConfig.module.rules.push({
  //    test: /.css$/,
  //    use: [
  //      'style-loader',
  //      {
  //         loader: 'css-loader',
  //         options: {
  //           // url: false,
  //           // root: 'http://localhost:3000/',
  //           // sourceMap: true,
  //           importLoaders: 1
  //         }
  //      },
  //     //  'css-loader?-url&sourceMap=inline&importLoaders=1',
  //     {
  //       loader: 'postcss-loader'
  //     }
  //    ]
  // });
} else {
  webpackConfig.plugins.push(new webpack.optimize.AggressiveMergingPlugin());

  webpackConfig.plugins.push(new ExtractTextPlugin(config.css.webpackStyleName));
  webpackConfig.module.rules.push({
                                    test: /\.css$/,
                                    use: ExtractTextPlugin.extract({
                                            fallback: "style-loader",
                                            use: [
                                              {
                                                loader: 'css-loader',
                                                options: {
                                                  // root: 'http://localhost:3000/',
                                                  // url:false,
                                                  // sourceMap: true,
                                                  importLoaders: 1
                                                }
                                              },
                                              'postcss-loader'
                                            ]
                                          })
                                    
                                  });

  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: config.isVerbose } }));
}

module.exports = webpackConfig;