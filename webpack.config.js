const path = require('path');

const config = {
	entry: './index.js',

	output: {
		path: __dirname,
		filename: 'bundle.js'
	},

	resolve: {
		modules: ['node_modules']
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/
			}
		]
	}
};


module.exports = config;
