const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const webpack = require('webpack');

const packagePaths = glob.sync('packages/*');

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

function getLoaderForStyle(cssOptions) {
  return [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  ];
}

module.exports = {
  core: { builder: 'webpack5' },
  stories: ['../packages/**/stories/*.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (config) => {
    // 为 storybook 添加 packages 中项目的 alias
    packagePaths.forEach((_path) => {
      const packageJson = fs.readJsonSync(path.resolve(_path, 'package.json'));
      const dirSourceFile =
        packageJson.arcoMeta && packageJson.arcoMeta.type === 'vue-library'
          ? 'components'
          : 'src';
      config.resolve.alias[`${packageJson.name}$`] = path.resolve(
        _path,
        dirSourceFile
      );
    });

    // less
    config.module.rules.push({
      test: lessRegex,
      exclude: lessModuleRegex,
      use: getLoaderForStyle(),
    });

    // less css modules
    config.module.rules.push({
      test: lessModuleRegex,
      use: getLoaderForStyle({ modules: true }),
    });

    // svg modules
    config.module.rules.push({
      test: /\.svg$/,
      use: ['vue-loader', 'vue-svg-loader'],
    });

    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      })
    );

    return config;
  },
};
