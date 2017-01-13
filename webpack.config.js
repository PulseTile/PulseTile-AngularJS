const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BowerWebpackPlugin = require('bower-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


//=========================================================
//  ENVIRONMENT VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';
const ENV_COPY = NODE_ENV === 'copy';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 9000;

// const API_URL = process.env.API_URL || 'http://localhost:19191';
const API_URL =  'http://138.68.134.7';
// const API_URL =  'http://139.59.187.100';


//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ["node_modules", "bower_components"],
    
    root: path.resolve('./src'),
    alias: {
      'morrisjs': '../../bower_components/morrisjs/morris.js',
      'spin': 'spin.js'
    }
  },

  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'ng-annotate!babel'},
      {test: /\.html$/, loader: 'html'},
      {test: /\.(woff|woff2)/, loader: 'url?prefix=fonts/&limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'},
      {test: /\.(ttf|eot|svg)/, loader: 'file?name=assets/fonts/[name].[ext]'},
      {test: /\.(jpg|png|jpeg|gif)$/, loader: 'url-loader?limit=25000/&name=assets/images/[name].[ext]' },
      {test: /\.css$/, loader: "style-loader!css-loader!"}
      /*{test: /\.woff(\?.*)?$/,loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'},
      {test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
      {test: /\.otf(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
      {test: /\.ttf(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
      {test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
      {test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
      {test: /\.(png|jpg)$/, loader: 'url?limit=8192'}*/
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new BowerWebpackPlugin({
      excludes: ['node_modules'],
      modulesDirectories: ['bower_components']
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    ),
    new webpack.ProvidePlugin({
      angularSpinner: 'angular-spinner',
      _: 'underscore',
      $: "jquery",
      "window.jQuery": "jquery",
      jQuery: "jquery",
      "moment": "moment",
      Raphael: 'raphael'
    })
  ],

  postcss: [
    autoprefixer({ browsers: ['last 3 versions'] })
  ],

  sassLoader: {
    outputStyle: 'compressed',
    precision: 10,
    sourceComments: false,
    includePaths: [
      './src/app/scss'
    ]
  }
};


//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = {
    index: [
      'bootstrap-loader',
      './src/app/index'
    ],
    vendor: './src/app/vendor'
  };

  config.output = {
    filename: '[name].js',
    path: path.resolve('./dist'),
    publicPath: ''
  };

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
      inject: 'body',
      favicon: './src/favicon.png',
      template: './src/index.html'
    })
  );
}


//=====================================
//  DEVELOPMENT
//-------------------------------------
if (ENV_DEVELOPMENT) {
  config.devtool = 'cheap-module-source-map';

  config.entry.index.unshift(`webpack-dev-server/client?http://${HOST}:${PORT}`);

  config.module.loaders.push(
    {test: /\.scss$/, loader: 'style!css!postcss!sass'}
  );

  config.devServer = {
    contentBase: './src',
    host: HOST,
    port: PORT,
    publicPath: config.output.publicPath,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    },
    proxy: {
      '/api/*': {
        target: API_URL
      }
    },
    historyApiFallback: true
  };
}


//=====================================
//  PRODUCTION
//-------------------------------------
if (ENV_PRODUCTION) {
  config.devtool = 'source-map';

  config.module.loaders.push(
    {test: /\.scss$/, loader: 'style!css!postcss!sass'}
  );

  config.plugins.push(
    // new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      beautify: true,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false
      }
    })
  );
}

//=====================================
//  COPY FILES
//-------------------------------------
if (ENV_COPY) {
  config.output = {
    filename: '[name].[ext]',
    publicPath: ''
  };
  
  config.module.loaders.push(
    {test: /\.scss$/, loader: 'style!css!postcss!sass'}
  );

  config.plugins.push(
    new CopyWebpackPlugin([
      { from: './bower_components/moment', to: './build' }
    ])
  );
}


//=====================================
//  TEST
//-------------------------------------
if (ENV_TEST) {
  config.devtool = 'inline-source-map';

  config.module.loaders.push(
    {test: /\.scss$/, loader: 'style!css!postcss!sass'}
  );
}

module.exports = config;
