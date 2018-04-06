var webpackDevMiddleware = require('webpack-dev-middleware');
// var webpackHotMiddleware = require('webpack-hot-middleware');


module.exports = function(gulp, $, config, browserSync) {
	//  Check environment
	var isProduction = !!$.minimist(process.argv.slice(2)).prod;
	var isServe = !!$.minimist(process.argv.slice(2)).serve;

	const webpackConfig = isProduction ? require('../webpack.config.prod.js') : require('../webpack.config.js');

	// If dev, setup webpack stuff
	if (!isProduction || isServe) {
		var bundler = $.webpack(webpackConfig);

		/**
		 * Reload all devices when bundle is complete
		 * or send a fullscreen error message to the browser instead
		 */
		bundler.plugin('done', function(stats) {
			if (stats.hasErrors() || stats.hasWarnings()) {
				return browserSync.sockets.emit('fullscreen:message', {
					title: 'Webpack Error:',
					body: $.stripAnsi(stats.toString()),
					timeout: 100000
				});
			}
			browserSync.reload();
		});
	}

	gulp.task('browser-sync', gulp.series(function(done) {
		if (!isProduction || isServe) {
			browserSync.init({
				server: config.distPath,
				startPath: 'styleguide/index.html',

				// proxy: 'https://greeneking-mainsite.equator-dev.com',

				middleware: [
					webpackDevMiddleware(bundler, {
						publicPath: webpackConfig.output.publicPath,
						stats: { colors: true }
					}),
					require('compression')()
				],

				online: false
			});
		} else {
			done();
		}
	}));

	// TODO: should watch tasks be in the file it relates too?
	gulp.task('watch', gulp.series(function(done) {
		if (!isProduction || isServe) {
			// HTML
			gulp
				.watch([config.srcPath + '/html/**/*.hbs'], {
					// awaitWriteFinish: true
				})
				.on('all',
					$.debounce(
						gulp.series(
							gulp.parallel('assemble'),
							browserSync.reload
						),
						200
					)
				);

			// CSS
			gulp
				.watch([config.srcPath + '/css/**/*.scss'], {
					// awaitWriteFinish: true
				})
				.on('all',
					$.debounce(
						gulp.series(
							gulp.parallel('css') // 'sasslint'
						),
						200
					)
				);

			// // JS - ES6
			// gulp
			// 	.watch([config.srcPath + '/js/**/*.{js,json}'], {
			// 		// awaitWriteFinish: true
			// 	})
			// 	.on('all',
			// 		$.debounce(
			// 			gulp.series(
			// 				gulp.parallel('buildJsImages'), // 'buildEs6', 'copyDummyData'
			// 				browserSync.reload
			// 			),
			// 			200
			// 		)
			// 	);

			// Images
			gulp
				.watch([
					config.srcPath + '/images/**/*.{jpg,jpeg,png,gif,svg}',
					'!' + config.srcPath + '/images/sprite/**/*.{jpg,jpeg,png,gif,svg}',
					'!' + config.srcPath + '/images/svg-sprite/**/*.{jpg,jpeg,png,gif,svg}'
				], {
					// awaitWriteFinish: true
				})
				.on('all',
					$.debounce(
						gulp.series(
							'images',
							browserSync.reload
						),
						200
					)
				);

			// SVG Sprite
			gulp
				.watch([
					config.srcPath + '/images/svg-sprite/**/*.svg',
					config.srcPath + '/images/svg-sprite/**/*.scss'
				], {
					// awaitWriteFinish: true
				})
				.on('all',
					$.debounce(
						gulp.series(
							'buildSvgSprite',
							browserSync.reload
						),
						200
					)
				);

			// Fonts
			gulp
				.watch(config.srcPath + '/fonts/**/*.{eot,ttf,otf,woff,woff2,svg}', {
					// awaitWriteFinish: true
				})
				.on('all',
					$.debounce(
						gulp.series(
							'fonts',
							browserSync.reload
						),
						200
					)
				);

			// // Umbraco views and partials
			// gulp
			// 	.watch(config.distPath + '/Views/**/*.cshtml', {
			// 		// awaitWriteFinish: true
			// 	})
			// 	.on('all',
			// 		$.debounce(
			// 			gulp.series(
			// 				browserSync.reload
			// 			),
			// 			200
			// 		)
			// 	);
		} else {
			done();
		}
	}));
};
