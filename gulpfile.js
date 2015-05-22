var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	harp = require('harp'),
	del = require('del'),
	rename = require('gulp-rename'),
	fs = require('fs');
var reload = browserSync.reload;
var config = {
	port: 8750,
	public: {
		dir: 'public/'
	},
	icons: 'images/**/*.svg',
	inject: '{sass,scss,less,styl}',
	reload: '{jade,coffee,ejs,md,markdown,json}'
};
var locals = JSON.parse(fs.readFileSync('public/_data.json')).index;
function pack_svg() {
	var src = config.icons,
		dist = config.public.dir+locals.icons.dir;
	del(dist);
	gulp
		.src(src)
		.pipe(
			require('gulp-svg-symbols')({
				title: false,
				templates: ['default-svg']
			})
		)
		.pipe(rename(locals.icons.file))
		.pipe(
			gulp.dest(dist)
		);
}
gulp.task('pack-svg', pack_svg);
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
	});
	pack_svg(gulp, config, del, rename, locals);
	gulp.watch(
		config.icons,
		['pack-svg']
	)
});
gulp.task('default', ['serve']);