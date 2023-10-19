const gulp = require('gulp');
const minifyHtml = require('gulp-minify-html');

gulp.task('minify-html', function () {
    return gulp.src('Shared/_Layout.html')
        .pipe(minifyHtml())  
        .pipe(gulp.dest('dist'));
});
