import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import webpack from 'webpack';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import paths from './paths';
import getClientEnvironment from './env';

const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const cssFilename = 'static/css/[name].[contenthash:8].css';

const extractTextPluginOptions = shouldUseRelativeAssetPaths ?
  // Making sure that the publicPath goes back to to build folder.
  { publicPath: Array(cssFilename.split('/').length).join('../') } : {};

export default {
  context: paths.appRoot,
  bail: true,
  devtool: shouldUseSourceMap ? 'source-map' : false,
  entry: {
    vender: [
      './src/polyfill.js',
      `${paths.appVender}/nim-sdk/NIM_Web_NIM_v3.8.0.js`,
      'eventemitter3',
      'redux',
      'redux-thunk',
    ],
    main: './src/main/main.js',
  },
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath,
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    library: 'JjsIm',
    libraryTarget: 'umd',
  },
  resolve: {
    modules: ['node_modules', paths.appSrc, paths.appVender],
    extensions: ['.js', '.json'],
  },
  externals: {
    jquery: 'window.jQuery',
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: [/node_modules/, /vender/],
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
            },
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(Object.assign({
              fallback: {
                loader: require.resolve('style-loader'),
                options: {
                  hmr: false,
                },
              },
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: shouldUseSourceMap,
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      postcssFlexbugsFixes,
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9',
                        ],
                        flexbox: 'no-2009',
                      }),
                    ],
                  },
                },
              ],
            }, extractTextPluginOptions)),
          },
          {
            test: /\.html$/,
            loader: require.resolve('html-loader'),
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([paths.appBuild], {
      root: paths.appRoot,
      verbose: true,
      dry: false,
    }),
    new InterpolateHtmlPlugin(env.raw),
    // Generates an `index.html` file with the <script> injected.
    //    new HtmlWebpackPlugin({
    //      inject: true,
    //      template: paths.appHtml,
    //      minify: {
    //        removeComments: true,
    //        collapseWhitespace: true,
    //        removeRedundantAttributes: true,
    //        useShortDoctype: true,
    //        removeEmptyAttributes: true,
    //        removeStyleLinkTypeAttributes: true,
    //        keepClosingSlash: true,
    //        minifyJS: true,
    //        minifyCSS: true,
    //        minifyURLs: true,
    //      },
    //    }),
    new webpack.DefinePlugin(env.stringified),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true,
      },
      sourceMap: shouldUseSourceMap,
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vender',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),
  ],
};
