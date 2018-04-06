
module.exports = function(gulp, $, config) {
	// TODO: some weird dest values going on here...
	gulp.task('buildSvgSprite', function() {
		return gulp
			.src(config.srcPath + '/images/svg-sprite/**/*.svg')

			.pipe($.svgSprite({
				// dest: '.',
				log: null,
				shape: {
					dimension: {
						precision: 3
					},
					spacing: {
						padding: 1, // Ideally this would be 0, but (rounding issues are causing) bleeding of other icons.
						box: 'content'
					},
					transform: ['svgo'],
					meta: null,
					align: null
				},
				svg: {
					xmlDeclaration: true,
					doctypeDeclaration: true,
					namespaceIDs: true,
					dimensionAttributes: true
				},
				mode: {
					css: {
						dest: '.',
						bust: false,
						sprite: config.distAssetPath + '/images/svg-sprite.svg',
						render: {
							scss: {
								dest: config.srcPath + '/css/generated/_svg-sprite',
								template: config.srcPath + '/images/svg-sprite/svg-template.scss'
							}
						},
						dimensions: true,
						common: 'svg-icon'
					}
				}
			}))
			.on('error', console.log)
			.pipe($.replace(config.distPath + '/', ''))
			.pipe(gulp.dest('.'));
	});

	// SVG symbols as external SVG file
	gulp.task('svgstore', function() {
		return gulp
			.src(config.srcPath + '/images/svg-sprite/**/*.svg')
			.pipe($.svgmin(function(file) {
				var prefix = $.path.basename(file.relative, $.path.extname(file.relative));
				return {
					plugins: [{
						mergePaths: false,
						cleanupIDs: {
							prefix: prefix + '-',
							minify: true
						}
					}]
				};
			}))
			.pipe($.svgstore({
				inlineSvg: false
			}))
			.pipe($.cheerio({
				run: function(c) {
					c('svg').attr('style', 'display:none');
					c('defs').remove();
					c('[class]').removeAttr('class');
				},
				parserOptions: { xmlMode: true }
			}))
			// TODO: fix dest path
			.pipe(gulp.dest('test/dest'));
	});

	// SVG symbols as inline SVG element
	gulp.task('svgstore2', function() {
		var svgs = gulp
			.src(config.srcPath + '/images/svg-sprite/**/*.svg')
			.pipe($.svgmin(function(file) {
				var prefix = $.path.basename(file.relative, $.path.extname(file.relative));
				return {
					plugins: [{
						mergePaths: false,
						cleanupIDs: {
							prefix: prefix + '-',
							minify: true
						}
					}]
				};
			}))
			.pipe($.svgstore({
				inlineSvg: true
			}))
			.pipe($.cheerio({
				run: function(c) {
					c('svg').attr('style', 'display:none');
					c('defs').remove();
					// c('[class]').removeAttr('class');  // This removes classes used for multi colored icons
					c('path').removeAttr('id');
				},
				parserOptions: { xmlMode: true }
			}));

		function fileContents(filePath, file) {
			return file.contents.toString();
		}

		return gulp
			.src('int-src/html/components/svg-inline-sprite.hbs')
			.pipe($.inject(svgs, { transform: fileContents }))
			.pipe(gulp.dest('int-src/html/components'));
	});
};
