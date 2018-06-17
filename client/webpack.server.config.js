const webpack = require('webpack');
const { resolve } = require('path');

const ManifestPlugin = require('webpack-manifest-plugin');
const webpackConfigLoader = require('react-on-rails/webpackConfigLoader');

const configPath = resolve('..', 'config');
const { devBuild, manifest, webpackOutputPath, webpackPublicOutputDir } =
  webpackConfigLoader(configPath);

const config = {
  entry: [
    'es5-shim/es5-shim',
    'es5-shim/es5-sham',
    'babel-polyfill',
    './app/bundles/web/startup/server',
  ],

	output: {
    // Name comes from the entry section.
    filename: 'server-bundle.js',

    // Leading slash is necessary
    publicPath: `/${webpackPublicOutputDir}`,
    path: webpackOutputPath,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.ProvidePlugin({
      "React": "react",
    }),
  ],
  module: {
    rules: [
      {
        test: require.resolve('react'),
        use: {
          loader: 'imports-loader',
          options: {
            shim: 'es5-shim/es5-shim',
            sham: 'es5-shim/es5-sham',
          }
        },
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
	resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      actions: resolve(__dirname, './app/bundles/web/actions'),
      components: resolve(__dirname, './app/bundles/web/components'),
      containers: resolve(__dirname, './app/bundles/web/containers'),
      helpers: resolve(__dirname, './app/bundles/web/helpers'),
      reducers: resolve(__dirname, './app/bundles/web/reducers'),
      utils: resolve(__dirname, './app/bundles/web/utils'),
      hocs: resolve(__dirname, './app/bundles/web/hocs'),
      assets: resolve(__dirname, './app/bundles/web/assets'),
      theme: resolve(__dirname, './app/bundles/web/theme')
    }
  }
};

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
