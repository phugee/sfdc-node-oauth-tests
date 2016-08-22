var path = require("path");

module.exports = {
    context: path.join(__dirname, "client-es6"),
    entry: "./js/client.js",
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /(node_modules | client)/,
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'add-module-exports']
                }
            }
        ]
    },
    output: {
        filename: "./client-es6/client.min.js"
    }

}
