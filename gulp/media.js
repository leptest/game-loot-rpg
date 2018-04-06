
module.exports = function(gulp, $, config) {
	gulp.task('media', function() {
		return gulp

			.src(config.srcPath + '/media/**/*.*')

			.pipe($.newer(config.distAssetPath + '/media/'))

			.pipe(gulp.dest(config.distAssetPath + '/media/'));
	});
};
