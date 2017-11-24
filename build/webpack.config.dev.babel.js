import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.config.common';

export default merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ]
});