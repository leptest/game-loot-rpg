
module.exports = function(gulp, $, config) {
	//  Check environment
	var isProduction = !!$.minimist(process.argv.slice(2)).prod;

	gulp.task('cachebust', function(done) {
		if (isProduction) {
			return gulp
				.src(config.distPath + '/styleguide/*.html')
				.pipe($.cacheBust({
					type: 'timestamp'
				}))
				.pipe(gulp.dest(config.distPath + '/styleguide'));
		} else {
			done();
		}
	});
};
