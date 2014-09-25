var gulp = require('gulp');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');

gulp.task('lint', function() {
	return gulp.src('client/app/**/*.js')
	  .pipe(jshint('.jshintrc'))
	  .pipe(jshint.reporter('default'))
	  .pipe(notify({message: 'lint task complete!'}));
});

gulp.task('watch', function() {
	// watch all js files
	gulp.watch('client/app/**/*.js', ['lint']);
})

gulp.task('default', function() {
	console.log('running default gulp task.');
});