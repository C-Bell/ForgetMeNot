
/* These are the required packages needed to carry out the Gulp Task Below. */
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const babelify = require('babelify');

// This is the bebel task and trasnforms all my ES2016 back to ES5 so all browers can read
gulp.task('babelify', () => {
	return gulp.src('src/**/**/*.js')
.pipe(babel({
	presets: ['es2015'],
}))
.pipe(gulp.dest('lib'));
});

// This is the browserify task.
gulp.task('browserify', () => {
	return browserify('./lib/public/js/main.js')
.transform('babelify')
.bundle()
.pipe(source('bundle.js')) // this is the output file name
.pipe(gulp.dest('./lib/public/js/')); // and this is where it ends up
});

// This is the imaging task.
gulp.task('image', () => {
	return gulp.src('./src/public/img/*')
.pipe(imagemin())
.pipe(gulp.dest('lib/public/img/'));
});

gulp.task('sass', () => {
	return gulp.src('./src/public/scss/*.scss')
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest('./lib/public/css'));
});

gulp.task('styles', () => {
	return gulp.src('./src/public/css/*.css')
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest('./lib/public/css'));
});


// THIS IS MY DEFAULT TASK - Needs to watch both folder ([Folders / Files to Watch], [Gulp Task])
gulp.task('watch', () => {
	gulp.watch(['./src/**/*.js'], ['babelify']);
	gulp.watch(['src/public/img/*'], ['image']);
	gulp.watch(['./src/public/scss/*.scss'], ['sass']);
	gulp.watch(['./lib/public/js/*.js'], ['browserify']);
});

// Make my default task to watch both folders
gulp.task('default', ['watch']);
