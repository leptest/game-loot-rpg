var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
	pattern: ['*', '!stylelint']
});

// Create browser sync to pass into gulp files
var browserSync = plugins.browserSync.create();

// Current working dir is 'node_modules/gulp-load-plugins/' for some reason.
var tasks = plugins.requireDir('../../gulp');

var config = require('./package.json');

Object.keys(tasks).forEach(function(taskName) {
	require('./gulp/' + taskName)(gulp, plugins, config, browserSync);
});

// Favicons
gulp.task('buildFavicons', gulp.series(
	// 'check-for-favicon-update',
	// If check updates fails, it should run generate favicon data
	'generate-favicon-data',
	'inject-favicon-markup'

	// 'new-fav'
));

// Tests
gulp.task('test-pre', gulp.parallel(
	'sasslint',
	'stylelint',
	'jsonlint',
	'eslint'
));
gulp.task('test-post', gulp.parallel(
	'accessibility',
	'htmlhint',
	'w3cjs'
));

// ==================================================================

// Default
gulp.task('default', gulp.series(
	'clean',
	// 'test-pre',
	gulp.parallel(
		// 'buildPngSprite',
		// 'buildSvgSprite',
		// 'svgstore',
		'svgstore2',
		// 'buildFavicons',
		'media'
	),
	gulp.parallel(
		'assemble',
		'css',
		// 'requirejs',
		// 'js',
		// 'buildEs6',
		'js-webpack', // This is only for the production build. Is there a better way to do this?
		// 'buildJsImages',
		'fonts',
		'images'
		// 'modernizr'
		// 'copyServerConfigs'
	),
	'cachebust',
	'copyDummyData',
	// 'test-post',
	gulp.parallel(
		'browser-sync',
		'watch'
	)
));
