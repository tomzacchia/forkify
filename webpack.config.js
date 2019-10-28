// path mode module
const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    // join current absolute path with dist/js
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  }
}