const
  path = require('path')
  , webpack = require('webpack')
  , packageJson = require('./package.json')

  // webpack plugin
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , TerserPlugin = require('terser-webpack-plugin')
  , {CleanWebpackPlugin} = require('clean-webpack-plugin')

  // config
  , terserConfig = require('@cycjimmy/config-lib/terserWebpackPlugin/2.x/production')
;

const
  IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
  , IS_PRODUCTION = process.env.NODE_ENV === 'production'
;

const OPTIMIZATION_OPTIONS = {
  minimize: true,
  minimizer: [new TerserPlugin(terserConfig)],
};

const config = {
  mode: 'none',
  entry: path.resolve('src', 'index.js'),

  output: {
    path: IS_DEVELOPMENT
      ? path.resolve('dist')
      : path.resolve('build'),
    filename: packageJson.name.replace(/^.+\//g, '') + (() => IS_PRODUCTION
      ? '.min.js'
      : '.js')(),
    library: 'h5Preloader',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('node_modules')
    ],
    'extensions': ['.js']
  },

  module: {
    rules: [
      // Scripts
      {
        test: /\.js$/,
        type: 'javascript/auto',
        include: [
          path.resolve('src'),
        ],
        loader: 'babel-loader'
      },

      // Pug template
      {
        test: /\.pug$/,
        include: [
          path.resolve('src'),
          path.resolve('static')
        ],
        exclude: [
          path.resolve('node_modules')
        ],
        loader: 'pug-loader'
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: packageJson.name + ' v' + packageJson.version +
        '\nHomepage: ' + packageJson.homepage +
        '\nReleased under the ' + packageJson.license + ' License.'
    })
  ]
};

// dev mode
if (IS_DEVELOPMENT) {
  config.mode = 'development';

  // devtool
  config.devtool = 'source-map';

  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./static', 'view', 'index.pug'),
    }),

    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),

    new BrowserSyncPlugin({
      server: {
        baseDir: 'dist',
      },
    }, {
      reload: true,
    })
  );
}

// production mode
if (IS_PRODUCTION) {
  config.mode = 'production';
  config.bail = true;

  config.plugins.push(
    new webpack.HashedModuleIdsPlugin(),

    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    })
  );

  config.optimization = OPTIMIZATION_OPTIONS;
}

module.exports = config;
