module.exports = function(gulp, $, config) {
	//  Check environment
	var isProduction = !!$.minimist(process.argv.slice(2)).prod;

	var app = $.assemble();

	var minOptions = {
		collapseWhitespace: true,
		removeComments: true
	};

	gulp.task('assemble', function() {
		app.layouts(config.srcPath + '/html/layouts/**/*.hbs');
		app.data(config.srcPath + '/html/data/**/*.json');
		app.partials(config.srcPath + '/html/components/**/*.*');
		app.pages(config.srcPath + '/html/pages/**/*.hbs');
		app.helpers = $.handlebarsHelpers();

		return app
			.toStream('pages')

			.pipe(app.renderFile({
				'flatten': true
			}))
			.on('error', console.log)

			.pipe($.rename({
				extname: '.html'
			}))

			.pipe($.flatten())

			.pipe($.if(isProduction, $.htmlmin(minOptions), $.jsbeautifier()))

			.pipe(app.dest(config.distPath + '/styleguide'));
	});
};
