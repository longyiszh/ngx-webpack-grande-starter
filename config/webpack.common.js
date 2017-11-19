const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { root } = require('./helpers');

const appPath = root('src', 'client', 'app');
const globalscss = [
  root('src', 'client', 'styles.scss')
];

module.exports = {
  entry: {
    'polyfills': root('src', 'client', 'polyfills.ts'),
    'vendor': root('src', 'client', 'vendor.ts'),
    'app': [
      root('src', 'client', 'main.ts')
    ],
    'styles': root('src', 'client', 'styles.ts')
  },

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
        use: ['html-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: root('src', 'client', 'app'),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
      },
      {
        test: /\.css$/,
        include: root('src', 'client', 'app'),
        use: ['raw-loader']
      },
      {
        /* Scoped scss */
        test: /\.scss$/,
        exclude: [/node_modules/, globalscss], // exclude scoped styles
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        /* Global scss */
        test: /\.scss$/,
        exclude: appPath, // exclude scoped styles
        use: [
          {
            loader: "style-loader" // global styles needs to get injected as link to css
          },
          {
            loader: "css-loader?sourceMap" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },

  plugins: [

    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      root('src', 'client'), 
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new AngularCompilerPlugin({
      tsConfigPath: root('src', 'client', 'tsconfig.client.json'),
      entryModule: root('src', 'client', 'app', 'app.module#AppModule')
    }),

    new HtmlWebpackPlugin({
      template: root('src', 'client', 'index.html')
    })
  ]
};