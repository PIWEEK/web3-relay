var webpack = require("webpack");

module.exports = {
    entry: './web3_relay_client.js',
    output: {
        filename: './dist/web3_relay_client.js',
        path: __dirname
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".json"]
    },
    plugins: [
        // Activate "fetch" polyfill (http://mts.io/2015/04/08/webpack-shims-polyfills/)
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
}
