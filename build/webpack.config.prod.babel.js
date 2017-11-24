import merge from 'webpack-merge';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import common from './webpack.config.common';

export default merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('prod')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vender'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ]
});