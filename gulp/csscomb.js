
module.exports = function(gulp, $, config) {
	gulp.task('csscomb', function() {
		// FOR gulp-csscomb
		return gulp
			.src([
				config.srcPath + '/css/**/*.scss',
				config.srcPath + '/css/!**/_*.scss',

				'!' + config.srcPath + '/css/**/vendor/**/*.*',
				'!' + config.srcPath + '/css/**/modular-scale/**/*.*',
				'!' + config.srcPath + '/css/**/_debug.scss',
				'!' + config.srcPath + '/css/**/_burger.scss',
				'!' + config.srcPath + '/css/**/_mixins.scss',
				'!' + config.srcPath + '/css/**/_normalize.scss',
				'!' + config.srcPath + '/css/**/_animations.scss',
				'!' + config.srcPath + '/css/**/_cta.scss'
			])
			.pipe($.csscomb())
			.pipe(gulp.dest(config.srcPath + '/css'));

		// // FOR csscomb
		// var Comb = require('csscomb');
		// var comb = new Comb('zen');
		// comb.processPath(config.srcPath + '/css');
		// done();
	});

	gulp.task('stylefmt', function() {
		return gulp.src(config.srcPath + '/css/**/*.scss')
			.pipe($.stylefmt())
			.pipe(gulp.dest(config.srcPath + '/css'));
	});
};
