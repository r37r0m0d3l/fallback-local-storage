const webpack = require('webpack');
const path = require('path');
const assign = require('object-assign');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const LIBRARY_DESC = require('./package.json').library;

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = function getConfig(optionsArg) {
  const options = optionsArg || {};

  const isProd = (options.BUILD_ENV || process.env.BUILD_ENV) === 'PROD';
  const isWeb = (options.TARGET_ENV || process.env.TARGET_ENV) === 'WEB';

  // get library details from JSON config
  const libraryName = LIBRARY_DESC.name;

  // determine output file name
  const outputName = buildLibraryOutputName(LIBRARY_DESC, isWeb, isProd);
  const outputFolder = isWeb ? 'dist' : 'lib';

  // get base config
  let config;

  // for the web
  if (isWeb) {
    config = assign(getBaseConfig(isProd), {
      output: {
        path: path.join(__dirname, outputFolder),
        filename: outputName,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
      },
    });
  } else {
    // for the backend
    config = assign(getBaseConfig(isProd), {
      output: {
        path: path.join(__dirname, outputFolder),
        filename: outputName,
        library: libraryName,
        libraryTarget: 'commonjs2',
      },
      target: 'node',
      node: {
        __dirname: true,
        __filename: true,
      },
      externals: [nodeExternals()],
    });
  }

  config.plugins.push(new CleanWebpackPlugin([outputFolder]));

  return config;
};

/**
 * Build base config
 * @param  {Boolean} isProd [description]
 * @return {[type]}         [description]
 */
function getBaseConfig(isProd) {
  // get library details from JSON config
  const libraryEntryPoint = path.join('src', LIBRARY_DESC.entry);

  // generate webpack base config
  return {
    entry: [
      // "babel-polyfill",
      path.join(__dirname, libraryEntryPoint),
    ],
    output: {
      devtoolLineToLine: true,
      pathinfo: true,
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: "eslint-loader",
        },
      ],
      loaders: [
        {
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          plugins: [
            "transform-runtime",
          ],
          query: {
            presets: [
              "es2015",
              "stage-0",
              "stage-1",
              "stage-2",
            ],
            cacheDirectory: false,
          },
          test: /\.js$/,
        },
      ],
    },
    eslint: {
      configFile: './.eslintrc',
    },
    resolve: {
      root: path.resolve('./src'),
      extensions: ['', '.js'],
    },
    devtool: isProd ? "source-map"/* null*/ : "source-map"/* '#eval-source-map'*/,
    debug: !isProd,
    plugins: isProd ? [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
      new UglifyJsPlugin({
        compress: { warnings: true },
        minimize: true,
        sourceMap: true,
      }),
      // Prod plugins here
    ] : [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"development"' } }),
      new UglifyJsPlugin({
        compress: { warnings: true },
        minimize: true,
        sourceMap: true,
      }),
      // Dev plugins here
    ],
  };
}

function buildLibraryOutputName(libraryDesc, isWeb, isProd) {
  if (isWeb) {
    return libraryDesc["dist-web"] || [libraryDesc.name, 'web', (isProd ? 'min.js' : 'js')].join('.');
  }
  return libraryDesc["dist-node"] || [libraryDesc.name, (isProd ? 'min.js' : 'js')].join('.');
}