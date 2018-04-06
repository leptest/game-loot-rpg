
module.exports = function(gulp, $, config) {
	gulp.task('copyDummyData', function() {
		return gulp
			.src([
				config.srcPath + '/js/data/**/*.*'
			])
			.pipe(gulp.dest(config.distAssetPath + '/js/data/'));
	});

	gulp.task('copyServerConfigs', function() {
		return gulp
			.src([
				config.srcPath + '/robots.txt',
				config.srcPath + '/Web.config'
			])
			.pipe(gulp.dest(config.distPath));
	});
};
