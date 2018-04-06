const path = require('path');
var config = require('./package.json');
var webpack = require('webpack');
var WriteFilePlugin = require('write-file-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// const production = process.env.NODE_ENV === 'production';
// console.log(production);

module.exports = {
	// watch: false,
	cache: true,
	devtool: '#eval-source-map',
	// entry: [
	// 	// 'webpack/hot/dev-server',
	// 	// 'webpack-hot-middleware/client',
	// 	'./int-src/js/main.js'
	// ],
	entry: {
		// 'vendor': ['jquery'],
		// 'vendor': ['jquery', 'lodash', 'moment'],
		'app': './int-src/js/main.js'
		// 'validation': './int-src/js/validation.js'
		// 'images': './int-src/js/images.js' // This was causing issues on iOS9
	},
	output: {
		path: path.resolve(__dirname, config.distPath + '/assets/js/'),
		publicPath: '/assets/js/',
		// filename: 'main.js'
		filename: '[name].bundle.js'
	},
	// devServer: {
	// 	// contentBase: './dist',
	// 	hot: true
	// },
	resolve: {
		alias: {
			'picker': 'pickadate/lib/picker',
			'picker.date': 'pickadate/lib/picker.date',
			modernizr$: path.resolve(__dirname, '.modernizr-autorc')
		}
	},
	module: {
		rules: [
			// {
			// 	test: /pickadate/,
			// 	parser: { amd: false }
			// },
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				// loader: 'babel-loader',
				// loaders: [
				// 	'babel-loader'
				// 	// 'webpack-module-hot-accept'
				// ],
				use: [
					{
						loader: 'babel-loader',
						options: {
							// cacheDirectory: true
						}
					}
				]
			},
			{
				test: /\.modernizr-autorc$/,
				loader: 'modernizr-auto-loader'
			}
			// {
			// 	test: /\.js$/,
			// 	loader: 'babel-loader',
			// 	exclude: /node_modules/
			// },
			// {
			// 	test: /\.html$/,
			// 	loader: 'html-loader'
			// },
			// {
			// 	test: /\.css$/,
			// 	use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
			// },
			// {
			// 	test: /\.(png|gif|jpg)$/,
			// 	loader: 'url-loader',
			// 	options: { limit: '25000' }
			// },
			// {
			// 	test: /\.(ttf|eot|svg)$/,
			// 	loader: 'file-loader'
			// }
		]
	},
	plugins: [
		// Ignore all locale files of moment.js
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'lodash',
		// 	minChunks: (m) => /node_modules\/(?:lodash|moment)/.test(m.context)
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'moment',
		// 	minChunks: (m) => /node_modules\/(?:moment)/.test(m.context)
		// }),

		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery',
			'window.jQuery': 'jquery'
		}),

		// new UglifyJSPlugin({
		// 	sourceMap: false,
		// 	uglifyOptions: {
		// 		mangle: true,
		// 		output: {
		// 			comments: false,
		// 			beautify: false
		// 		}
		// 	}
		// })
		// new FriendlyErrorsWebpackPlugin()
		// new webpack.NamedModulesPlugin(),
		// new webpack.HotModuleReplacementPlugin()

		new WriteFilePlugin({
			// Write only files that have ".js" extension.
			test: /\.js$/,
			useHashIndex: true
		})

		// new Visualizer({
		// 	filename: '../../styleguide/webpack-stats.html'
		// })
	]
};
