import webpack from 'webpack';
import path from 'path';

import nodeExternals from 'webpack-node-externals';

export default [
    // Server
  {
    entry: {
      server: './src/server/server.js',
    },
    target: 'node',
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: './dist/server/js',
    },
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

    externals: [nodeExternals()],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
  },
];
