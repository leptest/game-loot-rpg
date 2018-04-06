
module.exports = function(gulp, $, config) {
	//  Check environment
	var isProduction = !!$.minimist(process.argv.slice(2)).prod;

	gulp.task('images', function() {
		return gulp

			// TODO: I think we need to handle SVGs differantly
			.src([
				config.srcPath + '/images/**/*.{jpg,jpeg,png,gif,svg}',
				'!' + config.srcPath + '/images/favicon/**/*.{jpg,jpeg,png,gif,svg}',
				'!' + config.srcPath + '/images/sprite/**/*.{jpg,jpeg,png,gif,svg}',
				'!' + config.srcPath + '/images/svg-sprite/**/*.{jpg,jpeg,png,gif,svg}',
				'!' + config.srcPath + '/images/icon-font/**/*.{jpg,jpeg,png,gif,svg}'
			])

			// TODO: Need to check the prod flag here because the clean distAssetPath task isn't working
			.pipe($.if(!isProduction, $.newer(config.distAssetPath + '/images/')))

			.pipe($.if(isProduction,
				$.imagemin([
					$.imagemin.gifsicle(),
					$.imagemin.jpegtran(),
					$.imagemin.optipng(),
					$.imagemin.svgo()
				], {
					'verbose': true
				})
			))
			.pipe(gulp.dest(config.distAssetPath + '/images/'));
	});
};
