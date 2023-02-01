import { ResolveOptions } from 'webpack';


export function buildResolves(): ResolveOptions {

  return {
    extensions: [ '.tsx',
      '.ts',
      '.js' ],
  };
}
