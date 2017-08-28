/* eslint-disable no-console */
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const publicPath = process.env.PUBLIC_PATH || '/';
const dist = path.resolve(__dirname, 'dist');
const src = path.resolve(__dirname, 'src');
const isProd = !!process.env.ENV;

// 设置上下文路径 为entry使用
const context = src;
// sourcemap
const devtool = isProd ? 'hidden-source-map' : 'source-map';
const cache = !isProd;
const bail = isProd;
const target = 'web';
const resolve = {
  modules: [
    'src',
    'node_modules',
  ],
  extensions: ['.js', '.jsx', '.json', '.css', '.sass', '.scss', '.html'],
};
const performance = {
  hints: isProd ? 'warning' : false,
};
const stats = {
  colors: true,
  children: false,
  chunks: false,
  assetsSort: 'name',
};
const externals = {
  jquery: 'jQuery',
};
const entry = {
  editor: './EditorManager/js/main/main',
  main: './ImEditor/js/index',
};
// 输出
const output = {
  filename: isProd ? '[name].js' : '[name].js',
  chunkFilename: isProd ? '[name].chunk.js' : '[name].chunk.js',
  path: dist,
  publicPath,
  pathinfo: !isProd,
  devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
  library: 'ImEditor',
  libraryTarget: 'umd',
};
// 模块
// See: https://github.com/rstacruz/webpack-tricks/blob/master/recipes/css.md
// See: https://github.com/rstacruz/webpack-starter-kit
const cssRules = !isProd ? [{
  // Enables HMR. Inlines CSS in html head style tag
  test: /\.css|\.scss$/,
  include: [
    src,
    path.resolve(__dirname, 'node_modules'),
  ],
  exclude: [/lib/],
  use: [
    'style-loader',
    {
      loader: 'css-loader',
    },
  ],
}] : [{
  test: /\.css|\.scss$/,
  exclude: [/lib/],
  include: [
    src,
    path.resolve(__dirname, 'node_modules'),
  ],
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: !isProd ? {
        url: true,
        sourceMap: true,
        importLoaders: 1,
      } : {
        url: true,
      },
    }],
  }),
}];

const modulex = {
  rules: [
    {
      test: /\.js[x]?$/,
      include: [src],
      exclude: [/node_modules/, /lib/],
      loader: 'babel-loader',
    }, {
      // Enables HMR. Extra step is needed in './src/index.js'
      test: /\.html$/,
      exclude: [/EditorManager/],
      loader: 'html-loader', // loader: 'html', // loader: 'raw' // html vs raw: what's the difference??
    }, {
      test: /.*EditorManager.*editor\.html/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
        {
          loader: 'extract-loader',
        },
        {
          loader: 'html-loader',
          options: {
            interpolate: true,
          },
        },
      ],
    }, {
      test: /\.(jpg|jpeg)$/,
      loader: 'url-loader?name=[name].[ext]&limit=8192&mimetype=image/jpg',
    }, {
      test: /\.gif$/,
      loader: 'url-loader?name=[name].[ext]&limit=8192&mimetype=image/gif',
    }, {
      test: /\.png$/,
      exclude: [/lib/],
      use: 'url-loader?name=[name].[ext]&limit=8192&mimetype=image/png',
    }, {
      test: /lib.*\.png$/,
      use: 'url-loader?name=lib/img/[name].[ext]&limit=8192&mimetype=image/png',
    }, {
      test: /\.svg$/,
      loader: 'url-loader?name=[name].[ext]&limit=8192&mimetype=image/svg+xml',
    }, {
      test: /\.woff?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: ['url-loader?name=[name].[ext]&limit=100000&mimetype=application/font-woff'],
    }, {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: ['url-loader?name=[name].[ext]&limit=100000&mimetype=application/font-woff2'],
    },
    {
      test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: ['file-loader?name=[name].[ext]&limit=100000&mimetype=application/octet-stream'],
    }, {
      test: /\.otf(\?.*)?$/,
      loader: 'file-loader?name=[name].[ext]&limit=10000&mimetype=font/opentype',
    },
  ].concat(cssRules),
};
// 插件
const prodPlug = isProd ? [
  // Note: do not use '-p' in "build:prod" script
  // CommonsChunk analyzes everything in your bundles, extracts common bits into files together.
  // See: https://webpack.js.org/plugins/commons-chunk-plugin/
  // See: https://webpack.js.org/guides/code-splitting-libraries/
  //  new webpack.optimize.CommonsChunkPlugin({
  //    names: ['vendor', 'manifest'],
  //  }),
  // Minify and optimize the index.html
  new HtmlWebpackPlugin({
    filename: 'demo.html',
    template: 'demo.html',
    inject: 'head',
    chunksSortMode: 'dependency',
    xhtml: true,
    excludeChunks: ['editor'],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
  // Merge all duplicate modules
  // No longer needed; default in webpack2
  // new webpack.optimize.DedupePlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    quiet: true,
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused: true, // Enables tree shaking
      dead_code: true, // Enables tree shaking
      pure_getters: true,
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      comparisons: true,
      sequences: true,
      evaluate: true,
      join_vars: true,
      if_return: true,
    },
    output: {
      comments: false,
    },
    sourceMap: true,
  }),
] : [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    filename: 'demo.html',
    template: 'demo.html',
    inject: 'head',
    excludeChunks: ['editor'],
    xhtml: true,
  }),
];

const plugins = [
  // Expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  new webpack.DefinePlugin({
    'process.env.ENV': JSON.stringify(process.env.ENV),
    'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
    __DEV__: !isProd,
  }),
  // Hook into the compiler to extract progress information.
  // new webpack.ProgressPlugin(),
  new webpack.LoaderOptionsPlugin({
    // See: https://github.com/postcss/postcss-loader/issues/125
    // See: http://pastebin.com/Lmka3rju
    minimize: isProd,
    debug: !isProd,
    stats: {
      colors: true,
    },
    options: {
      context: src,
      output: {
        path: dist,
      },
    },
    eslint: {
      failOnWarning: false,
      failOnError: true,
    },
  }),
  // Avoid publishing files when compilation fails
  // Note: NoErrorsPlugin is renamed to NoEmitOnErrorsPlugin
  new webpack.NoEmitOnErrorsPlugin(),
  // No longer needed in Webpack2, on by default
  // new webpack.optimize.OccurrenceOrderPlugin(),
  // Generate an external css file with a hash in the filename
  // allChunks: true -> preserve source maps
  new ExtractTextPlugin({
    filename: isProd ? '[name].styles.css' : '[name].styles.css',
    disable: false,
    allChunks: true,
  }),
  //  new StyleLintPlugin({
  //    // https://github.com/vieron/stylelint-webpack-plugin
  //    // http://stylelint.io/user-guide/example-config/
  //    configFile: '.stylelintrc',
  //    context: src,
  //    files: '**/*.s?(a|c)ss',
  //    syntax: 'scss',
  //    failOnError: false,
  //  }),
  new CopyWebpackPlugin([
    // { from: 'favicon.png' },
    {
      from: 'lib',
      to: 'lib',
    },
  ]),
  // Module ids are full names
  // Outputs more readable module names in the browser console on HMR updates
  new webpack.NamedModulesPlugin(),

].concat(prodPlug);
// 开发服务器
const devServer = {
  host,
  port,
  publicPath,
  contentBase: context,
  hot: !isProd,
  compress: true,
  open: true,
  openPage: 'demo.html',
  noInfo: true,
  stats: 'errors-only',
  inline: true,
  lazy: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  historyApiFallback: {
    verbose: !isProd,
    disableDotRule: false,
  },
  proxy: {
    '/api': 'http://localhost:8080',
  },
};

const config = {
  context,
  devtool,
  bail,
  cache,
  target,
  resolve,
  stats,
  performance,
  externals,
  entry,
  output,
  module: modulex, // 不能使用modul作为变量
  plugins,
  devServer,
};
export default [config];
