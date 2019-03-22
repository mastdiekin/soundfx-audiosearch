var gulp               = require('gulp');
var config             = require('../package.json');
var config             = require('./config');
var runSequence        = require('run-sequence');
var package            = require('../package');
var util               = require('gulp-util');
var sass               = require('./sass');
var server             = require('./server');

gulp.task('watch', ['setWatch', 'webpack:watch', 'sass', 'libs', 'nunjucks', 'copy:locales', 'copy:fonts', 'copy:img', 'copy:json', 'copy:js'], function () {
// gulp.task('watch', ['setWatch', 'webpack:watch', 'sass', 'libs', 'nunjucks', 'copy:locales', 'copy:img', 'copy:json'], function () {

	gulp.watch(config.source.sass + '/**/*.{sass,scss}', ['setWatch', 'sass']);

	gulp.watch(config.source.html + '/**/*.html', ['nunjucks']);

	gulp.watch(config.source.locales + '/**/*.*', ['copy:locales']);

	gulp.watch(config.source.img + '/**/*.{png, jpg}', ['copy:img']);

	gulp.watch(config.source.fonts + '/**/*.*', ['copy:fonts']);

	gulp.watch(config.source.json + '/**/*.json', ['copy:json']);

	gulp.watch(config.source.js + '/**/*.js', ['copy:js']);

});

gulp.task('letsgo', function() {
	util.log('\n\n\n\n\n\n\n Понеслась', 'моча по трубам', util.colors.bgRed(' БРАТИИИИШКА '), '\n\n\n\n\n\n', util.colors.white.bgRed(' Project: '),util.colors.white.bgCyan(' '+ package.name +' '), '\n\n', util.colors.black.bgWhite(' '+ package.description +' '), '\n\n\n\n\n\n');
});

gulp.task('default', function(cb) {
	runSequence(
		'build:dev',
		'watch',
		'letsgo',
		'server',
		cb
	);
});