import webpack from 'webpack';
import path from 'path';

// webpack hotness from stackoverflow
// http://stackoverflow.com/questions/37369053/webpack-babel-config-for-both-server-and-client-javascript

// import CleanPlugin from 'clean-webpack-plugin';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import AssetsPlugin from 'assets-webpack-plugin';

import ClientConfig from './src/client/webpack.config.client.babel';
import ServerConfig from './src/server/webpack.config.server.babel';

const PATHS = {
    build: path.resolve(__dirname, '..', 'build'),
    sourcemaps: path.resolve(__dirname, '..', 'build', 'sourcemaps'),
    browserSource: path.resolve(__dirname, '..', 'src', 'browser', 'index.js'),
    browserBuild: path.resolve(__dirname, '..', 'build', 'browser'),
    serverSource: path.resolve(__dirname, '..', 'src', 'server', 'index.js'),
    serverAssetsSource: path.resolve(__dirname, '..', 'src', 'server', 'assets', 'index.js'),
    serverBuild: path.resolve(__dirname, '..', 'build', 'server'),
};

export default [].concat(ClientConfig, ServerConfig);