module.exports = {
  entry: './app/index.js',
  output: {
    path: __dirname,
    filename: './public/app.js'
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: 'node_modules',
        loader: 'babel-loader',
        query: {
          presets: [ 'react', 'es2015', 'stage-0']
        }
      }
    ]
  }
}
