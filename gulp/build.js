var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('./config');
var package     = require('../package.json');
var zip         = require('gulp-zip');
var del         = require('del');
var rename      = require('gulp-rename');
var notify      = require('gulp-notify');
var nameProj    = package.name;
var versionProj = package.version;
var package     = require('../package');
var util        = require('gulp-util');

var buildTemp = nameProj;
var buildInclude = [ '**/*', '!*.zip', '!.git/', '!' + config.dist.root + '/sftp-config.json', '!sftp-config.json', '!node_modules*/**/' ];

function build(cb) {
	runSequence(
		'clean',
		'sass',
		'nunjucks',
		'webpack',
		'libs',
		'copy',
		// 'gh-pages',

		// 'buildZip',
		// 'renameZip',
		// 'cleanZip',
		'cleanUseless',
		'cleanCRX',
		'buildCRX',
		'CRXend',
		cb
	);
}

function build_zip(cb) {
	runSequence(
		'buildZip',
		'renameZip',
		'cleanUseless',
		'cleanCRX',
		'buildCRX',
		cb
	);
}

gulp.task('buildZip', function () {
	return gulp.src(buildInclude)
		.pipe(zip(nameProj + '.zip'))
		.pipe(gulp.dest("./"))
		.pipe(notify({message: 'Zip task complete', onLast: true}));
});

gulp.task('renameZip', function () {
	return gulp.src("./" + nameProj + '.zip')
		.pipe(rename(nameProj + '-' + versionProj + '.zip'))
		.pipe(gulp.dest("./"))
		.pipe(notify({message: 'Zip renamed and moved up', onLast: true}));
});

// gulp.task('buildCRX', function () {
// 	return gulp.src(config.dist.root + '/**/*.*')
// 		.pipe(zip(nameProj + '.zip'))
// 		.pipe(rename(nameProj + '-' + versionProj + '.crx'))
// 		.pipe(gulp.dest("./"))
// 		.pipe(gulp.dest(config.dist.crx))
// 		// .pipe(notify({message: 'Zip renamed to CRX and moved up', onLast: true}));
// });

gulp.task('buildCRX', function () {
	return gulp.src(config.dist.root + '/**/*.*')
		.pipe(zip("dist.zip"))
		.pipe(gulp.dest(config.dist.root))
		.pipe(rename(nameProj + '-' + versionProj + '.crx'))
		.pipe(gulp.dest("./"))
		.pipe(gulp.dest(config.dist.crx))
		// .pipe(notify({message: 'Zip renamed to CRX and moved up', onLast: true}));
});

gulp.task('CRXend', function () {
	return util.log(
			'\n\n\n\n\n\n', 
			util.colors.white.bgCyan(' '+ package.name +'.crx '),
			util.colors.white.bgRed(' упакован '),
			'\n\n\n\n\n\n'
		);
});

gulp.task('cleanUseless', function(cb) {
	return del([
		"./" + config.dist.root + '/' + config.dist.maps,
		"./" + config.dist.root + '/' + 'style.css',
		"./" + config.dist.root + '/' + 'options.css',
		"./" + config.dist.root + '/' + 'manual.css',
		"./" + config.dist.js + '/' + 'report.html',
		"./" + config.dist.js + '/' + 'index.js',
		"./" + config.dist.root + '/' + '.sass-cache',
	]);
});

// gulp.task('cleanCssLibs', function(cb) {
// 	return del([
// 		"./" + config.dist.root + '/' + '.sass-cache',
// 	]);
// });

gulp.task('cleanZip', function(cb) {
	return del([
		"./" + nameProj + '.zip'
	]);
});

gulp.task('cleanCRX', function(cb) {
	return del(config.dist.crx);
});

gulp.task('build', function(cb) {
	config.setEnv('production');
	config.logEnv();
	build(cb);
});

gulp.task('build:dev', function(cb) {
	config.setEnv('development');
	config.logEnv();
	build(cb);
});

gulp.task('build:zip', function(cb) {
	config.setEnv('development');
	config.logEnv();
	// build_zip(cb);
	build(cb);
});