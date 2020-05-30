const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    cache: true,
    entry: {
      client: './src/client/client.jsx',
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, 'public'),
    },
    devtool: 'eval',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module) {
          // this assumes your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf('node_modules') !== -1;
        },
      }),
      new CopyWebpackPlugin([
        // {output}/file.txt
        { from: './src/client/assets', to: './' },
      ]),
    ],
};