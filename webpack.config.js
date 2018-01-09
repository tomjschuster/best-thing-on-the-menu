const webpack = require('webpack')

module.exports = {
  entry: './client/index.js',
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
        exclude: '/node_modules',
        loader: 'babel-loader',
        query: {
          presets: [ 'react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]'
            }
          },
          'postcss-loader' // postcss.config.js
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:
          process.env.NODE_ENV ?
            JSON.stringify(process.env.NODE_ENV) :
            JSON.stringify('production'),
        SOUTH: process.env.SOUTH || 40.734634,
        NORTH: process.env.NORTH || 40.752200,
        WEST: process.env.WEST || -74.002601,
        EAST: process.env.EAST || -73.981465
      }
    })
  ]
}

