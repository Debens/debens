const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

const SWAGGER_UI_DIST = path.dirname(require.resolve('swagger-ui-dist'));

module.exports = {
    mode: 'development',
    target: 'node',
    devtool: 'source-map',
    entry: './src/api/server.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: { projectReferences: true },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TSConfigPathsPlugin()],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                path.resolve(SWAGGER_UI_DIST, 'swagger-ui.css'),
                path.resolve(SWAGGER_UI_DIST, 'swagger-ui-bundle.js'),
                path.resolve(SWAGGER_UI_DIST, 'swagger-ui-standalone-preset.js'),
                path.resolve(SWAGGER_UI_DIST, 'favicon-16x16.png'),
                path.resolve(SWAGGER_UI_DIST, 'favicon-32x32.png'),
            ],
        }),
    ],
};
