const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BowerWebpackPlugin = require('bower-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const packageJSON = require('./package.json');


//=========================================================
//  ENVIRONMENT VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';
const ENV_COPY = NODE_ENV === 'copy';
const ENV_PRODUCTION_EXTENSION = NODE_ENV === 'extension';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 9000;

const API_URL =  'http://46.101.95.245';
// const API_URL =  'http://178.62.6.217';
// const API_URL =  'http://138.68.134.7';
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
      'spin': 'spin.js',
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
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.VERSION_APP': JSON.stringify(packageJSON.version),
      'process.env.VERSION_ANGULAR': JSON.stringify(packageJSON.dependencies.angular),
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
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
      "moment": "moment",
      Raphael: 'raphael',
      io: 'socket.io-client',
      swiper: 'swiper',
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
if (ENV_DEVELOPMENT || ENV_PRODUCTION || ENV_PRODUCTION_EXTENSION) {
  config.entry = {
    index: [
      'bootstrap-loader',
      './src/app/index'
    ],
    vendor: './src/app/vendor'
  };

  if (ENV_PRODUCTION_EXTENSION) {
    config.entry.index[1] = './src/app/plugins-extension';
  }

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
    }),
    new HtmlWebpackPlugin({
      filename: 'ui-kit.html',
      hash: true,
      inject: 'body',
      favicon: './src/favicon.png',
      template: './src/ui-kit.html'
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
if (ENV_PRODUCTION || ENV_PRODUCTION_EXTENSION) {
  config.devtool = 'cheap-inline-module';

  config.module.loaders.push(
    {test: /\.scss$/, loader: 'style!css!postcss!sass'}
  );
  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      exclude: [/bower_components/, /node_modules/],
      parallel: 4,
      compress: {
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
  config.module.preLoaders = [
    { test: /\.js$/, loader: 'isparta', include: path.join(__dirname, 'src/app') }
  ];
}

module.exports = config;
