
module.exports = function(gulp, $, config) {
	gulp.task('clean', function() {
		return $.del([
			// This was casuing read-write issues. (Atom and IIS)
			config.distAssetPath,
			config.distPath + '/styleguide',
			config.srcPath + '/css/generated',
			'logs'
		], {
			// 'cwd': './',
			'force': true
		});
	});
};
