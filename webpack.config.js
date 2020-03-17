const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: './src/js/main.js',
	mode: isDevelopment ? 'development' : 'production',
	output: {
    	filename: isDevelopment ? '[name].js' : '[name].[hash].js'
  	},
  	output: {
		path: path.resolve(__dirname, './dist/'),
		filename: isDevelopment ? '[name].js' : '[name].[hash].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: !isDevelopment }
					}
				]
			},
			{
				test: /\.css$/,
				loader: [
					isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader',
				]
			},
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.css']
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: isDevelopment ? '[name].css' : '[name].[hash].css',
			chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
		})
	]
}