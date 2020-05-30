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
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/client/assets', to: './' },
      ],
    }),
  ],
};
