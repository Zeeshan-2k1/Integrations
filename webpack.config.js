const path = require('path');
const glob = require('glob');
module.exports = {
  mode: 'production',
  entry: glob.sync('./src/**/index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, './src')],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: '[name]/[name].main.js',
    path: path.resolve(__dirname, './dist'),
  },
};

// module.exports = {
//   mode: 'production',
//   entry: {
//     bundle: './src/**/index.js',
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].min.js',
//   },
// };
