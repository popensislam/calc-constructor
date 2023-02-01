import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';
import ESlintWebpackPlugin from 'eslint-webpack-plugin';

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {

  return [
    new HtmlWebpackPlugin({ template: options.paths.html }),
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new ESlintWebpackPlugin({
      extensions: [ 'js',
        'jsx',
        'ts',
        'tsx' ]
    })
  ];
}
