const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');


module.exports = merge(common, {
    mode: "development",
    devtool: "eval",
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ["style-loader", 'css-loader', 'sass-loader'],
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080
    }
});
