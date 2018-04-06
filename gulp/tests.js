module.exports = function(gulp, $, config) {
	//  Check environment
	var isProduction = !!$.minimist(process.argv.slice(2)).prod;
	var isFixFiles = !!$.minimist(process.argv.slice(2)).fix;

	gulp.task('jsonlint', function() {
		return gulp
			.src([
				config.srcPath + '/**/*.json',
				'.csslintrc',
				'.eslintrc',
				'.jsbeautifyrc',
				'.prettifyrc',
				'.stylelintrc',
				'*.json'
			])

			// These options don't work yet,
			// but they don't break anything either..
			.pipe($.jsonlint({
				// format: false,
				// indent: 2
			}))
			.pipe($.jsonlint.failOnError())
			.pipe($.jsonlint.reporter());
	});

	gulp.task('eslint', function() {
		function isFixed(file) {
			// Has ESLint fixed the file contents?
			return file.eslint != null && file.eslint.fixed;
		}

		return gulp
			.src([
				// Correct way to do it, but gulp-eslint doesn't
				// respect the .eslintignore file.
				// '**/*.js'

				// See above.
				config.srcPath + '/js/**/*.js',
				'!' + config.srcPath + '/js/libraries/**/*.js',
				'!' + config.srcPath + '/js/static/**/*.js',
				config.srcPath + '/js/**/*.js',
				'!' + config.srcPath + '/js/libraries/**/*.js',
				'!' + config.srcPath + '/js/static/**/*.js',
				'gulp/*.js',
				'*.js'
			], {

				// Needed when writing fixed files back to disk
				base: './'
			})

			.pipe($.eslint({
				'fix': isFixFiles
			}))

			// Log results to console
			.pipe($.eslint.format())

			// Stop on error but finish all files first
			.pipe($.eslint.failAfterError())

			// If --fix flag passed in and fixable files, write them to disk.
			.pipe($.if(isFixed, gulp.dest('./')));
	});

	gulp.task('sasslint', function() {
		return gulp
			.src([
				config.srcPath + '/css/**/*.scss',
				'!' + config.srcPath + '/css/vendor/**/*.scss',
				'!' + config.srcPath + '/css/core/modular-scale/**/*.scss'
			])
			.pipe($.sassLint())
			.pipe($.sassLint.format())
			.pipe($.sassLint.failOnError());
	});

	gulp.task('stylelint', function() {
		return gulp
			.src([
				config.srcPath + '/css/**/*.scss',
				'!' + config.srcPath + '/css/vendor/**/*.scss',
				'!' + config.srcPath + '/css/core/modular-scale/**/*.scss'
			])

			.pipe($.stylelint({
				reporters: [{
					formatter: 'string',
					console: true
				}],
				debug: true
			}));
	});

	// https://github.com/yargalot/gulp-accessibility
	gulp.task('accessibility', function(done) {
		$.del([
			'logs/'
		]);

		if (isProduction) {
			return gulp

				.src([
					config.distPath + '/styleguide/**/*.html'
				])

				.pipe($.accessibility({
					'force': true
				}))
				.on('error', console.log)

				.pipe($.accessibility.report({
					'reportType': 'txt'
				}))

				.pipe($.rename({
					'extname': '.txt'
				}))

				.pipe(gulp.dest('logs'));
		} else {
			done();
		}
	});

	// https://github.com/bezoerb/gulp-htmlhint
	gulp.task('htmlhint', function(done) {
		if (isProduction) {
			return gulp
				.src([
					config.distPath + '/styleguide/**/*.html'
				])
				.pipe($.htmlhint('.htmlhintrc'))
				.pipe($.htmlhint.reporter());
		} else {
			done();
		}
	});

	// https://github.com/callumacrae/gulp-w3cjs
	gulp.task('w3cjs', function(done) {
		if (isProduction) {
			return gulp
				.src([
					config.distPath + '/styleguide/**/*.html'
				])
				.pipe($.w3cjs({
					// proxy: 'http://proxy:8080',

					verifyMessage: function(type, message) {
						// prevent logging error message
						if (message.indexOf('Element “option” without attribute “label” must not be empty.') === 0) {
							return false;
						}
						if (message.indexOf('Element “dl” is missing a required instance of child element “dd”.') === 0) {
							return false;
						}
						if (message.indexOf('When the “srcset” attribute has any image candidate string with a width descriptor, the “sizes” attribute must also be present.') === 0) {
							return false;
						}
						// These stops errors about the image lazy loading picture data-src and data-srcset
						if (message.indexOf('Element “img” is missing required attribute “src”.') === 0) {
							return false;
						}
						if (message.indexOf('Element “source” is missing required attribute “srcset”.') === 0) {
							return false;
						}

						// allow message to pass through
						return true;
					}
				}))
				.pipe($.w3cjs.reporter());
		} else {
			done();
		}
	});
};
