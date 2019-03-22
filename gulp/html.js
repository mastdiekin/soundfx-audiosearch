var gulp           = require('gulp');
var plumber        = require('gulp-plumber');
var gulpif         = require('gulp-if');
var prettify       = require('gulp-prettify');
var config         = require('./config');
var reportError    = require('./helpers/handle-errors');
var njkRender      = require('gulp-nunjucks-render');
var frontMatter    = require('gulp-front-matter');
var server         = require('./server');

gulp.task('nunjucks', function() {
	return gulp.src(config.source.html +'/**/*.html')
		.pipe(frontMatter({ property: 'data' }).on('error', reportError))
		.pipe(njkRender({
				watch: false,
				trimBlocks: true,
				lstripBlocks: false
			}).on('error', reportError))
		.pipe(prettify({
			indent_size: 2,
			wrap_attributes: 'auto', // 'force'
			preserve_newlines: false,
			indent_char: ' ',
			// unformatted: [],
			end_with_newline: true
		}))
		// .pipe(gulpif('background.html', gulp.dest(config.dist.root)))
		.pipe(gulp.dest(config.dist.html))
		.pipe(server.reload({stream: true}));
});

