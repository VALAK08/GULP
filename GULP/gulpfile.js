const gulp = require('gulp');
const minifyHtml = require('gulp-minify-html');
const rename = require('gulp-rename');

gulp.task('minify-html', function () {
    return gulp.src('Pages/Shared/_Layout.cshtml')  
        .pipe(minifyHtml())
        .pipe(rename('_MinifiedLayout.html'))
        .pipe(gulp.dest('SharedMinifications'));
});

gulp.task('default', gulp.series('minify-html'));
