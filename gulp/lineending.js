
module.exports = function(gulp, $, config) {
	gulp.task('lineending', function() {
		return gulp
			.src([
				'**/*.{scss,hbs,md,txt,js,json,yml}',
				'!node_modules/**',
				'.csslintrc',
				'.eslintignore',
				'.eslintrc',
				'.jsbeautifyrc',
				'.prettifyrc',
				'.snyk',
				'.stylelintrc',
				'Web.config'
			])
			.pipe($.lineEndingCorrector({
				verbose: true,
				eolc: 'CRLF',
				encoding: 'utf8'
			}))
			.pipe(gulp.dest('./'));
	});
};
