import type { Configuration } from 'webpack';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolves } from './buildResolves';
import { BuildOptions } from './types/config';
import { buildDevServer } from './buildDevServer';

import 'webpack-dev-server';

export function buildWebpackConfig(options: BuildOptions): Configuration {

  const { mode, paths, isDev } = options;

  return {
    mode: mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
      publicPath: '/'
    },
    plugins: buildPlugins(options),
    module: { rules: buildLoaders(options) },
    resolve: buildResolves(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    //   maxEntrypointSize: 512000,
    //   maxAssetSize: 512000
    // },
    performance: { hints: false }
  };
}
