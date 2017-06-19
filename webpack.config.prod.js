import webpack from 'webpack';
import path from 'path';

export default {
  context: `${__dirname}/client`,
  entry: {
    javascript: path.resolve(__dirname, 'client/Index.jsx'),
    html: path.resolve(__dirname, 'client/index.html'),
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/lib/client`,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        exclude: /node_modules/,
        use: ['react-hot-loader', 'babel-loader'],
      },
      {
        test: /\.scss?$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.json$/,
        loader: ['json-loader'],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: ['url-loader']
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss']
  },
  devtool: 'cheap-source-map',
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        pure_funcs: ['console.log', 'window.console.log.apply']
      },
      comments: false
    })
  ],
  node: {
    net: 'empty',
    dns: 'empty',
  },
};