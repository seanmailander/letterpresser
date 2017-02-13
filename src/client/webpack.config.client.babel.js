import webpack from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';


export default [
    // Client
  {
    cache: true,
    entry: {
      client: './src/client/client.jsx',
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: './dist/client/js',
    },
    devtool: 'eval',
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: [
            path.join(__dirname, '../..'),
          ],
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'react', 'stage-0'],
          },
        },
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
        { from: './src/client/assets', to: '../' },
      ]),
    ],
  },
];
