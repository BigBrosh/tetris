var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './project/scripts/Tetris.js',

	output: {
		path: __dirname + "/dist/js",
		filename: 'compiled.js'
	},

	module: {
		rules: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: "babel-loader" 
			},

			{ 
				test: /\.css$/, 
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader']
				})
			}
		]
	},

	plugins: [
		new ExtractTextPlugin('../css/main.css')
	]
};