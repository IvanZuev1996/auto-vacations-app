import webpack from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack']
    };

    const cssLoader = buildCssLoader(isDev);

    const fontsLoader = {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff|pdf)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    };

    return [
        svgLoader,
        fileLoader,
        fontsLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        cssLoader
    ];
}
