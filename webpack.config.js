/* eslint-disable */
var webpack = require('webpack');

var config = {
	// webpack options
	entry: './src/pubnub-angular2.js',
	module: {
		loaders: [
			{ test: /\.json/, loader: 'json' },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
		]
	},
	output: {
		filename: 'pubnub-angular2.js',
		library: 'PubNubAngular',
		libraryTarget: 'umd',
	},
	plugins: [
		new webpack.BannerPlugin({ banner: require('./package.json').version, raw: false })
	],
	externals: [],
	profile: true
};

module.exports = config;
