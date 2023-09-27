// Node & NPM packages
const del = require('del'),
	fs = require('fs'),
	merge = require('merge-stream'),
	path = require('path'),
	gulp = require('gulp'),
	gulpif = require('gulp-if'),
	sass = require('gulp-sass')(require('sass')),
	gcmq = require('gulp-group-css-media-queries'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss');

// Directory structure
const dir = {
	dist:'./build/html/Gerber_Responsive_Hero_Module/',
	html:'./src/html/',
	js:'./src/js/',
	scss:'./src/scss/',
	images:'./src/images/'
}

const prefixerPrefs = {
	cascade: false
}

function buildStyles(isProduction=false) {
	return gulp.src(dir.scss+'style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(prefixerPrefs))
		.pipe(gcmq())
		.pipe(gulpif(isProduction, uglifycss()))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(dir.dist));
}

function build(isProduction=false) {

	let _html = gulp.src(dir.html+'*.html')
		.pipe(rename('index.html'));

	let _js = gulp.src(dir.js+'**', '!'+dir.js+'*.min.js')
		.pipe(gulpif(isProduction, sourcemaps.init()))
		.pipe(gulpif(isProduction, uglify()))
		.pipe(gulpif(isProduction, sourcemaps.write('./maps')));

	return merge(_html, _js).pipe(gulp.dest(dir.dist));
}

function images(){
	return gulp.src(dir.images+'**').pipe(gulp.dest(dir.dist+'images/'));
}

gulp.task('clean', () => { return del(dir.dist+'**/*'); });
gulp.task('build:dev', () => { return build(false)});
gulp.task('build:prod', () => { return build(true)});
gulp.task('sass:dev', () => { return buildStyles(false)});
gulp.task('sass:prod', () => { return buildStyles(true)});
gulp.task('prod', gulp.series('sass:prod', 'build:prod'));
gulp.task('images', gulp.series('clean', images, 'sass:dev', 'build:dev'));
gulp.task('default', gulp.series('sass:dev', 'build:dev'));
gulp.task('watch', () => { return gulp.watch(['src/*/**'], gulp.series('default'))});


