const path = require('path');

module.exports = {
  mode: 'development',
  entry: './code.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  watch: true
};
