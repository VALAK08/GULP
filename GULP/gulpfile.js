const gulp = require('gulp');
const minifyHtml = require('gulp-minify-html');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require("gulp-clean-css");
const del = require('del');


gulp.task('clean:css', function () {
    return del([
        'wwwroot/css/site.min.css'
    ]);
});

gulp.task('clean:js', function () {
    return del([
        'wwwroot/js/*.min.js',
    ]);
})

//CSS Optimization
gulp.task('min-concat:css', function () {
    return gulp.src('wwwroot/css/*.css')
        .pipe(concat('site.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('wwwroot/css'));
});

//JS Optimization
gulp.task('min:js', function () {
    return gulp.src('wwwroot/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('wwwroot/js/min'));
});

//Images Optimization
gulp.task('optimize-images', function () {
    return gulp.src('wwwroot/images/*')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('wwwroot/images/minified'));
});

//HTML Optimization
gulp.task('minify-html', function () {
    return gulp.src('Pages/Shared/_Layout.cshtml')
        .pipe(minifyHtml())
        .pipe(rename('_MinifiedLayout.html'))
        .pipe(gulp.dest('SharedMinifications'));
});

gulp.task('default', gulp.series('clean:css', 'min-concat:css', 'clean:js',
    'min:js', 'optimize-images', 'minify-html'));

gulp.task('minifyCss', gulp.series('clean:css', 'min-concat:css'));
gulp.task('minifyJs', gulp.series('clean:js', 'min-concat:js'));