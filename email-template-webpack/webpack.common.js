const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    experiments: {
        asset: true
    },
    entry: {
        main: "./src/index.js",
        vendor: "./src/vendor.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[contenthash].bundle.js",
        assetModuleFilename: 'assets/[name][ext]'
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext][query]'
                }
            },
            {
                test: /\.svg/,
                type: 'asset/resource',
                generator: {
                    filename: 'icon/[name][ext][query]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/template.html" }),
    ]
}

