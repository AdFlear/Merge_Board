const path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/app.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|webp|json|fnt|mp3|wav)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
