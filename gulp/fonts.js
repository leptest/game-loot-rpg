
module.exports = function(gulp, $, config) {
	gulp.task('fonts', function() {
		return gulp

			.src(config.srcPath + '/fonts/**/*.{eot,ttf,otf,woff,woff2,svg}')

			.pipe($.newer(config.distAssetPath + '/fonts/'))

			.pipe(gulp.dest(config.distAssetPath + '/fonts/'));
	});
};
