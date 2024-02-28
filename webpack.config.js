const path = require('path')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // Set the mode to development or production
    entry: {
        login: './src/ts/login.ts',
        register: './src/ts/register.ts',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        library: 'app',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname, 'old'),
                
                ],
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            }
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: "public", to: ""}]
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/index.html',
            filename: 'index.html',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/register.html',
            filename: 'register.html',
            chunks: ['register']
        })
    ]
}