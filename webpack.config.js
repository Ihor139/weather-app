
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      minify: {
        collapseWhitespace: isProd
      },
      inject: true,
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/html/pages')

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }
  if (isProd) {
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config
}

module.exports = {
  mode: 'deve;lopment',
  experiments: {
    asset: true
  },
  target: 'web', // setting for working HMR
  context: path.resolve(__dirname, 'src'),
  mode: 'development',

  entry: {
    main: [
      '@babel/polyfill',
      './index.js'
    ],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },

  devServer: {
    before(app, server) {
      chokidar.watch([
        './src/**/*.html'
      ]).on('all', function () {
        server.sockWrite(server.sockets, 'content-changed');
      })
    },

    contentBase: './dist',
    hot: isDev,
    host: 'localhost',
  },

  // devtool: 'inline-source-map',
  devtool: 'source-map' ? isDev : false,

  // resolve: {
  //   //extensions: ['.js', '.json', '.png'],
  //   alias: {
  //     '@views': path.resolve(__dirname, 'src/html/views'),
  //     '@includes': path.resolve(__dirname, 'src/html/includes'),
  //     '@scss': path.resolve(__dirname, 'src/scss'),
  //     '@': path.resolve(__dirname, 'src'),
  //   }
  // },

  plugins: [
    new MiniCssExtractPlugin({
      linkType: "text/css"
    }),

    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 55
        }
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true
    }),
  ].concat(htmlPlugins),

  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.html$/i,
        include: path.resolve(__dirname, 'src/html/includes'),
        loader: 'html-loader',
        options: {
          minimize: false,
          esModule: false,
        },
      },
      {
        test: /\.(s[ac]ss)$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(css)$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties'
            ],
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: "asset",
        generator: {
          filename: 'assets/images/[name][ext]'
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/icons/[name][ext]'
        },
        use: "svgo-loader",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        },
      },
    ],
  },
}
