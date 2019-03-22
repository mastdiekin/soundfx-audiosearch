var util = require('gulp-util');

var production = util.env.production || util.env.prod || false;
var distPath = 'dist';
var sourcePath = 'app'
var config = {

	env              : 'development',
	production       : production,

	docs: {
		root         : 'docs'
	},
	projectname: {
		name         : 'kpContextMenu'
	},
	source: {
		root         : sourcePath,
		html         : sourcePath + '/html',
		img          : sourcePath + '/img',
		locales      : sourcePath + '/_locales',
		json         : sourcePath + '/json',
		js           : sourcePath + '/js',
		sass         : sourcePath +'/sass',
		fonts        : sourcePath +'/fonts',
		sassRoot     : 'sass',
	},
	dist: {
		root         : distPath,
		html         : distPath,
		img          : distPath + '/img',
		locales      : distPath + '/_locales',
		fonts        : distPath + '/fonts',
		json         : distPath,
		js           : distPath + '/js',
		crx          : 'crx',
		styles       : distPath,
		maps         : 'maps',
	},

	setEnv: function(env) {
		if (typeof env !== 'string') return;
		this.env = env;
		this.production = env === 'production';
		process.env.NODE_ENV = env;
	},

	logEnv: function() {
		util.log(
			'Environment:',
			util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
		);
	},

	errorHandler: require('./helpers/handle-errors')
}

config.setEnv(production ? 'production' : 'development');

module.exports = config;