import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions) {

  return {
    static: options.paths.build,
    port: options.port,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
}
