
/* These are the required packages needed to carry out the Gulp Task Below. */
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

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

// This task transforms SASS into CSS.
gulp.task('sass', () => {
	return gulp.src('./src/public/scss/*.scss')
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest('./lib/public/css'));
});

// This task runs unit testing from Mocha.
gulp.task('mocha', () => {
	gulp.src('tests/mocha.js', { read: false })
// gulp-mocha needs filepaths so you can't have any plugins before it
.pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('lint', () => {
// ESLint ignores files with "node_modules" paths.
// So, it's best to have gulp ignore the directory as well.
// Also, Be sure to return the stream from the task;
// Otherwise, the task may end before the stream has finished.
	return gulp.src(['**/*.js', '!node_modules/**', '!lib/**', '!src/public/js/bundle.js'])
// eslint() attaches the lint output to the "eslint" property
// of the file object so it can be used by other modules.
.pipe(eslint())
// eslint.format() outputs the lint results to the console.
// Alternatively use eslint.formatEach() (see Docs).
.pipe(eslint.format())
// To have the process exit with an error code (1) on
// lint error, return the stream and pipe to failAfterError last.
.pipe(eslint.failAfterError());
});


// THIS IS MY DEFAULT TASK - Needs to watch both folder ([Folders / Files to Watch], [Gulp Task])
gulp.task('watch', () => {
	gulp.watch(['./src/**/*.js'], ['babelify']);
	gulp.watch(['./src/public/img/*'], ['image']);
	gulp.watch(['./src/public/scss/*.scss'], ['sass']);
	gulp.watch(['./lib/public/js/*.js'], ['browserify']);
});

// Make my default task to watch both folders
gulp.task('default', ['watch']);
