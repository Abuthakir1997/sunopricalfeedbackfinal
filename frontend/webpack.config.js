const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Entry point of your application
    output: {
        path: path.resolve(__dirname, './build'), // Output directory
        filename: 'bundle.js', // Output filename
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ["@babel/plugin-proposal-private-property-in-object"]
                    },
                },
            },
        ],
    },
    plugins: [
        new CompressionPlugin({
            test: /\.(js|css)$/, // Specify the file types you want to gzip
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            threshold: 10240, // Only compress files larger than 10 KB
            minRatio: 0.8, // Only compress files if the compression ratio is at least 0.8
        }),
    ],

    // Other webpack configuration options can be added here
};