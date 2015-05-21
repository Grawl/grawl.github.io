var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var harp = require('harp');
var config = {
	port: 8750,
	public: {
		dir: 'public/'
	},
	inject: '{sass,scss,less,styl}',
	reload: '{jade,coffee,ejs,md,markdown,json}'
};
gulp.task('svg-sprite', function() {
	require('del')(config.public.dir+'sprite');
	gulp
		.src(
			'**/*.svg',
			{
				cwd: 'images'
			}
		)
		.pipe(
			require('gulp-svg-sprite')({
				mode: { symbol: true }
			})
		)
		.pipe(
			gulp.dest(config.public.dir+'sprite')
		);
	}
);
gulp.task('serve', function() {
	config.public.files = config.public.dir + '**/';
	harp.server(config.public.dir, {
		port: config.port
	}, function() {
		browserSync({
			proxy: 'localhost:' + config.port,
			port: config.port + 10,
			open: false,
			reloadOnRestart: true
		});
		gulp.watch([
			config.public.files + '*.' + config.inject
		], function() {
			reload(
				config.public.files + '*.css',
				{stream: true}
			);
		});
		gulp.watch([
			config.public.files + '*.' + config.reload,
			'*.' + config.reload
		], function() {
			reload();
		});
	})
});
gulp.task('default', ['serve']);