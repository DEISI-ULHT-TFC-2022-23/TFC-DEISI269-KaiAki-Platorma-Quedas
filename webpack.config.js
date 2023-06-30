// webpack.config.js
const path = require('path');

module.exports = {
    entry: './mais_informacao.js', // The entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // The directory where the bundle file will be saved
    filename: 'bundle.js' // The name of the bundle file
  },
  module: {
    rules: [
      {
        test: /.m?js$/, // This will match any .js or .mjs files
        exclude: /(node_modules)/, // We don't want to transpile code in the node_modules directory
        use: {
          loader: 'babel-loader', // Use babel-loader to transpile the files
          options: {
            presets: ['@babel/preset-env'] // This will transpile ES6 code to ES5
          }
        }
      }
    ]
  }
};