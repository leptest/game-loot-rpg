// var commonShake = require('common-shakeify');
const webpackConfig = require('../webpack.config.prod.js');

module.exports = function(gulp, $, config) {
	//  Check environment
	var isProduction = !!$.minimist(process.argv.slice(2)).prod;

	// ===============================
	// DEFAULT CONCAT
	// ===============================
	gulp.task('js', function() {
		return gulp
			.src(config.js.src)
			.pipe($.if(!isProduction, $.sourcemaps.init()))
			// ES6 stuff would go here
			.pipe($.concat(config.js.outputName))
			.pipe($.if(isProduction, $.uglify()))
			.pipe($.if(!isProduction, $.sourcemaps.write()))
			.pipe(gulp.dest(config.distAssetPath + '/js'));
	});

	// ===============================
	// BROWSERIFY
	// ===============================
	// TODO: crashes if import path in component file is incorrect
	gulp.task('buildEs6', function() {
		return $
			.browserify({
				entries: config.srcPath + '/js/main.js',
				debug: true
			})
			// .plugin(commonShake, {
			// 	verbose: true
			// })
			.transform($.babelify)
			.bundle()
			.pipe($.vinylSourceStream('main.js'))
			.pipe($.vinylBuffer())
			.pipe($.if(isProduction, $.uglify()))
			.pipe(gulp.dest(config.distAssetPath + '/js/'));
	});
	gulp.task('buildJsImages', function() {
		return $
			.browserify({
				entries: config.srcPath + '/js/images.js',
				debug: true
			})
			// .plugin(commonShake, {
			// 	verbose: true
			// })
			.transform($.babelify)
			.bundle()
			.pipe($.vinylSourceStream('images.js'))
			.pipe($.vinylBuffer())
			.pipe($.if(isProduction, $.uglify()))
			.pipe(gulp.dest(config.distAssetPath + '/js/'));
	});

	// ===============================
	// WEBPACK
	// ===============================
	gulp.task('js-webpack', function(done) {
		if (isProduction) {
			return gulp
				.src(config.srcPath + '/js/main.js')
				.pipe($.webpackStream(webpackConfig), $.webpack)
				.pipe(gulp.dest(config.distAssetPath + '/js/'));
		} else {
			done();
		}
	});
};
