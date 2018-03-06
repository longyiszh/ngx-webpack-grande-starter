const webpack = require('webpack');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const { root } = require('../lib/helpers');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: '@ngtools/webpack',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false // workaround for ng2
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'null-loader'
      },
      {
        test: /\.css$/,
        exclude: root('src/app'),
        use: 'null-loader'
      },
      {
        test: /\.css$/,
        include: root('src/app'),
        use: 'raw-loader'
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      root('./src/client'), // location of your src
      {} // a map of your routes
    ),
    new AngularCompilerPlugin({
      tsConfigPath: root('src/client/tsconfig.client.json'),
      skipCodeGeneration: true, // workaround for issue @angular/angular-cli#8626
      entryModule: root('src/client/app/app.module#AppModule')
    })

  ]
}