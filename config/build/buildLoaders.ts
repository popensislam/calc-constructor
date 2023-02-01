import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {

  const styleLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: options.isDev
              ? '[path][name]__[local]--[hash:base64:4]'
              : '[hash:base64:8]',
          }
        }
      },
      'sass-loader',
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  // const tsEslintLoader = {
  //   test: /\.(ts|tsx)$/,
  //   use: [
  //     {
  //       options: { eslintPath: require.resolve('eslint'), },
  //       loader: require.resolve('eslint-loader'),
  //     },
  //   ],
  //   exclude: /node_modules/,
  // };

  return [ tsLoader, styleLoader, ];
}
