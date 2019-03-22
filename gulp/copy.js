var gulp         = require('gulp');
var config       = require('./config.js');
var cache        = require('gulp-cache');


gulp.task('copy:locales', function() {
	return gulp
		.src(config.source.locales + '/**/*.*')
		.pipe(gulp.dest(config.dist.locales));
});

gulp.task('copy:fonts', function() {
	return gulp
		.src(config.source.fonts + '/**/*.*')
		.pipe(gulp.dest(config.dist.fonts));
});

gulp.task('copy:img', function() {
	return gulp
		.src(config.source.img + '/**/*.*')
		.pipe(gulp.dest(config.dist.img));
});

gulp.task('copy:json', function() {
	return gulp
		.src(config.source.json + '/**/*.json')
		.pipe(gulp.dest(config.dist.json));
});

gulp.task('copy:js', function() {
	return gulp
		.src([config.source.js + '/**/*.js'])
		.pipe(gulp.dest(config.dist.js));
});

gulp.task('gh-pages', function() {
	return gulp
		.src([
			config.dist.root +'/**/**.*',
			config.dist.root +'/images/svg/dest/**.*',
			// '!' + config.dist.root +'/libs/**/**.*',
			'!' + config.dist.root +'/images/svg/**.*',
			'!' + config.dist.root +'/layout/**/**.*',
			'!' + config.dist.root +'/js/report.html',
			'!' + config.dist.root +'/js/lib/hello.js'
		])
		.pipe(gulp.dest(config.docs.root));
});

gulp.task('copy', [
	'copy:locales',
	'copy:fonts',
	'copy:img',
	'copy:json',
	'copy:js',
]);