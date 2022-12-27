const postcssPresetEnv = require('postcss-preset-env');

const config = {
	plugins: [
		require('postcss-simple-vars'),
		require('autoprefixer'),
		require('postcss-nested'),
		postcssPresetEnv({
			features: {
				'custom-media-queries': true,
				'media-query-ranges': true,
				'has-pseudo-class': true
			}
		})
	]
};

module.exports = config;
