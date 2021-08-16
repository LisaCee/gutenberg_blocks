const { config } = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
	function isDevelopment(){
		return argv.mode === 'development';
	};
	var config = {
		entry: {
			editor: './src/editor.js',
			script: './src/script.js',
		},
		output: {
			filename: '[name].js'
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					terserOptions: {sourceMap: true}
				}),
				new OptimizeCSSAssetsPlugin({
					cssProcessorOptions: {
						map: {
							inline: false,
							annotation: true
						}
					}
				}),
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCSSExtractPlugin({
				chunkFilename: "[id].css",
				filename: chunkData => {
					return chunkData.chunk.name == 'script' ? 'style.css' : '[name].css'
				}
			})
		],
		// webpack devtool: https://webpack.js.org/configuration/devtool/
		devtool: isDevelopment() ? 'cheap-module-source-map' : 'source-map',
		module: {
			rules: [
				{
					// look for js files
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							//Babel presets: https://babeljs.io/docs/en/presets
							plugins: ["@babel/plugin-proposal-class-properties"],
							presets: [
								'@babel/preset-env',
								[
									'@babel/preset-react', 
									{
										"pragma": "wp.element.createElement",
										"pragmaFrag":"wp.element.Fragment",
										"development": isDevelopment()
									}
								]
							]
						}
					}
				},
				{
					// look for scss/sass/css files
					test: /\.(sa|sc|c)ss$/,
					use: [
						// adds <style> tag
						// 'style-loader',
						MiniCSSExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugin: [autoprefixer()],
								}
							}
						},
						'sass-loader'
					]
				}
			]
		},
		externals: {
			jquery: "jQuery",
			lodash: "lodash",
			"@wordpress/blocks": ["wp", "blocks"],
			"@wordpress/i18n": ["wp", "i18n"],
			"@wordpress/editor": ["wp", "editor"],
			"@wordpress/components": ["wp", "components"],
			"@wordpress/block-editor": ["wp", "blockEditor"],
			"@wordpress/element": ["wp", "element"]
		}
	}
	return config;
}
