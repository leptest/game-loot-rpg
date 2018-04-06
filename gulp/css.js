module.exports = function(gulp, $, config, browserSync) {
	var isProduction = !!$.minimist(process.argv.slice(2)).prod;

	gulp.task('css', function() {
		return gulp

			.src([
				config.srcPath + '/css/**/*.scss',
				config.srcPath + '/css/!**/_*.scss'
			])

			// TODO: should this go into a seperate "tests" task?
			// .pipe($.stylelint({
			// 	reporters: [{
			// 		formatter: 'string',
			// 		console: true
			// 	}],
			// 	debug: true
			// }))

			// .pipe($.sassLint())

			.pipe($.sassGlob())

			.pipe($.if(!isProduction, $.sourcemaps.init()))

			.pipe($.sass({
				precision: 6
			}))

			.pipe($.stripCssComments({
				preserve: false
			}))

			.pipe($.postcss([
				$.autoprefixer(),
				$.cssMqpacker()
			]))

			// .pipe($.if(isProduction, $.cssnano()))
			.pipe($.if(isProduction, $.csso({
				restructure: false,
				debug: true
			})))

			// .pipe($.cssbeautify())

			.pipe($.if(!isProduction, $.sourcemaps.write()))

			.pipe(gulp.dest(config.distAssetPath + '/css/'))

			.pipe(browserSync.stream());
	});
};
