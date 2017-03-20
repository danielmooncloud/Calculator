var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
	context: __dirname + "/app/js",
	entry: "./calculator.js",
	output: {
		path: __dirname + "/public",
		filename: "app.bundle.js"
	},

	module: {
		loaders: [
			{
				test: /\.scss$/,
				exclude: "/node_modules/",
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader", 
					use: "css-loader!sass-loader"
				})
			},
			{
				test: /\.js$/,
				exclude: "/node_modules/",
				loader: "babel-loader"
			}
		]
	},

	plugins: [
				
		new webpack.ProvidePlugin({
			$: "jquery",
 				jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		new ExtractTextPlugin("[name].css")
	]
}