const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
console.log('is dev', isDev)
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if(isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll:  true
      }
    },
    'css-loader'
  ]
  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

// const jsLoaders = () => {
//   const loaders = [{
//     loader: 'babel-loader',
//     // options: babelOptions()
//   }]

//   if(isDev) {
//     loaders.push('eslint-loader')
//   }

//   return loaders
// }

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
          { from: './assets/img/favicon.png', to: '../dist/img' },
          { from: './styles/style.css', to: '../dist/styles' },

          { from: './styles/style.css', to: '../dist/styles' },
          { from: './styles/style.css', to: '../dist/styles' },
          { from: './styles/style.css', to: '../dist/styles' },
          { from: './styles/style.css', to: '../dist/styles' },

      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ]

  if(isProd) {
    base.push(new BundleAnalyzerPlugin())
  }
  return base
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './app/index.js'
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.scss', '.css', '.sass'],
    alias: {
       "@": path.resolve(__dirname, 'src'),
       "@asts": path.resolve(__dirname, './src/assets')
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.png|jpg|svg|gif$/,
        use: ['file-loader']
      },
      {
        test: /\.ttf|woff|woff2|eot$/,
        use: ['file-loader']
      },
      {
        test: /\.pug$/,
        use: ['pug-html-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: jsLoaders()
    //   },
    ]
  }
}
