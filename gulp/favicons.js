
module.exports = function(gulp, $, config) {
	//  Check environment
	var isProduction = !!$.minimist(process.argv.slice(2)).prod;

	// TODO: why can't this be $.fs?
	// Errors on $.fs.readFileSync()
	var fs = require('fs');

	// File where the favicon markups are stored
	var FAVICON_DATA_FILE = config.srcPath + '/images/favicon/favicon.json';

	// Generate the icons. This task takes a few seconds to complete.
	// You should run it at least once to create the icons. Then,
	// you should run it whenever RealFaviconGenerator updates its
	// package (see the check-for-favicon-update task below).
	gulp.task('generate-favicon-data', function(done) {
		if (isProduction) {
			$.realFavicon.generateFavicon({
				masterPicture: config.srcPath + '/images/favicon/favicon--full.svg',
				dest: config.distAssetPath + '/images/favicon/',
				iconsPath: '/assets/images/favicon/',
				design: {
					ios: {
						pictureAspect: 'noChange',
						assets: {
							ios6AndPriorIcons: false,
							ios7AndLaterIcons: false,
							precomposedIcons: false,
							declareOnlyDefaultIcon: true
						},
						appName: config.shortName
					},
					desktopBrowser: {},
					windows: {
						masterPicture: config.srcPath + '/images/favicon/favicon--basic.svg',
						pictureAspect: 'noChange',
						backgroundColor: config.themeBackgroundColor,
						onConflict: 'override',
						assets: {
							windows80Ie10Tile: false,
							windows10Ie11EdgeTiles: {
								small: false,
								medium: true,
								big: false,
								rectangle: false
							}
						},
						appName: config.shortName
					},
					androidChrome: {
						pictureAspect: 'noChange',
						themeColor: config.themeBackgroundColor,
						manifest: {
							name: config.name,
							shortName: 'shortNameTest', // Not sure if this works..
							display: 'browser',
							orientation: 'notSet',
							onConflict: 'override',
							declared: true
						},
						assets: {
							legacyIcon: false,
							lowResolutionIcons: false
						}
					},
					safariPinnedTab: {
						masterPicture: config.srcPath + '/images/favicon/favicon--basic.svg',
						pictureAspect: 'silhouette',
						themeColor: config.themeBackgroundColor
					}
				},
				settings: {
					compression: 1,
					scalingAlgorithm: 'Mitchell',
					errorOnImageTooSmall: false,
					readmeFile: false,
					htmlCodeFile: false,
					usePathAsIs: false
				},
				markupFile: FAVICON_DATA_FILE
			}, function() {
				done();
			});
		} else {
			done();
		}
	});

	// Inject the favicon markups in your HTML pages. You should run
	// this task whenever you modify a page. You can keep this task
	// as is or refactor your existing HTML pipeline.
	gulp.task('inject-favicon-markup', function() {
		var data = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code;

		return gulp
			.src([config.srcPath + '/html/components/favicons.hbs'])
			.pipe($.realFavicon.injectFaviconMarkups(data))
			.pipe(gulp.dest(config.srcPath + '/html/components/'));
	});

	// Check for updates on RealFaviconGenerator (think: Apple has just
	// released a new Touch icon along with the latest version of iOS).
	// Run this task from time to time. Ideally, make it part of your
	// continuous integration system.
	gulp.task('check-for-favicon-update', function(done) {
		var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;

		$.realFavicon.checkForUpdates(currentVersion, function(err) {
			if (err) {
				throw err;
			}
			done();
		});
	});

	gulp.task('new-fav', function(done) {
		if (isProduction) {
			return gulp
				.src(config.srcPath + '/images/favicon/favicon.svg')
				.pipe($.favicons({
					appName: config.shortName,
					appDescription: config.description,
					// developerName: 'Hayden Bleasel',
					// developerURL: 'http://haydenbleasel.com/',
					background: config.themeBackgroundColor,
					lang: 'en-GB',
					theme_color: config.themeBackgroundColor,
					path: '/assets/images/favicon/',
					// url: 'http://haydenbleasel.com/',
					display: 'standalone',
					orientation: 'portrait',
					start_url: '.',
					version: 1.0,
					logging: true,
					online: false,


					// I'm pretty sure this path is relative to the gulp.dest.
					// It seems to have an "upper folder cap" of some sort
					// No idea whats going on...

					// When dist path is local (int-dist or dist)
					// html: '../../../../' + config.srcPath + '/html/components/favicons.html',

					// When dist path is in umbraco folder
					html: '../../../../GreeneKing.Frontend/' + config.srcPath + '/html/components/favicons.html',


					pipeHTML: true,
					replace: true,
					icons: {
						// Platform Options:
						// - offset - offset in percentage
						// - shadow - drop shadow for Android icons, available online only
						// - background:
						//   * false - use default
						//   * true - force use default, e.g. set background for Android icons
						//   * color - set background for the specified icons

						// Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
						android: true,

						// Create Apple touch icons. `boolean` or `{ offset, background }`
						appleIcon: true,

						// Create Apple startup images. `boolean` or `{ offset, background }`
						appleStartup: true,

						// Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
						coast: { offset: 25 },

						// Create regular favicons. `boolean`
						favicons: true,

						// Create Firefox OS icons. `boolean` or `{ offset, background }`
						firefox: true,

						// Create Windows 8 tile icons. `boolean` or `{ background }`
						windows: true,

						// Create Yandex browser icon. `boolean` or `{ background }`
						yandex: true
					}
				}))
				.on('error', console.log)
				.pipe(gulp.dest(config.distAssetPath + '/images/favicon/'));
		} else {
			done();
		}
	});
};
