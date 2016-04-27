'use strict';
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
gulp.task('pack-svg', ()=> {
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
});
gulp.task('gh-pages', ()=> {
	var publisher = require('gulp-gh-pages');
	return gulp.src('www/**/*')
		.pipe(publisher({
			branch: 'master'
		}));
});
gulp.task('compile', ['pack-svg'], (cb)=> {
	gulp.src('public/images/**/*')
		.pipe(gulp.dest('www/images/'));
	harp.compile('public', '../www', ()=> {});
	return cb();
});
gulp.task('serve', ['pack-svg'], ()=> {
	config.public.files = config.public.dir + '**/';
	harp.server(config.public.dir, {
		port: config.port
	}, ()=> {
		browserSync({
			proxy: 'localhost:' + config.port,
			port: config.port + 10,
			open: false,
			reloadOnRestart: true
		});
		gulp.watch([
			config.public.files + '*.' + config.inject
		], ()=> {
			reload(
				config.public.files + '*.css',
				{stream: true}
			);
		});
		gulp.watch([
			config.public.files + '*.' + config.reload,
			'*.' + config.reload
		], ()=> {
			reload();
		});
	});
	gulp.watch(
		config.icons,
		['pack-svg']
	)
});
gulp.task('default', ['serve']);
