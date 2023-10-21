const gulp = require('gulp');
const minifyHtml = require('gulp-minify-html');
const rename = require('gulp-rename');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require("gulp-clean-css");
const sass = require('gulp-sass');
const clean = require('gulp-clean');

gulp.task('clean:css', function () {
    return gulp.src('wwwroot/css/site.min.css', { read: false })
        .pipe(clean());
});

gulp.task('clean:js', function () {
    return gulp.src('wwwroot/js/*.min.js', { read: false })
        .pipe(clean());
});

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

function convertToWebP() {
    return gulp.src('wwwroot/images/*.{jpg,png}')
        .pipe(webp())
        .pipe(gulp.dest('dist/images/webp'));
}

exports.convertToWebP = convertToWebP;

//HTML Optimization
gulp.task('minify-html', function () {
    return gulp.src('Pages/Shared/_Layout.cshtml')
        .pipe(minifyHtml())
        .pipe(rename('_MinifiedLayout.html'))
        .pipe(gulp.dest('SharedMinifications'));
});

// SCSS To CSS
function compileSass() {
    return gulp.src('wwwroot/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('ConvertedCss.css'))
        .pipe(gulp.dest('wwwroot/css'));
}

exports.compileSass = compileSass;

gulp.task('default', gulp.series('clean:css', 'min-concat:css', 'clean:js',
                                 'min:js', convertToWebP, 'minify-html', compileSass));

gulp.task('minifyCss', gulp.series('clean:css', 'min-concat:css'));
gulp.task('minifyJs', gulp.series('clean:js', 'min:js'));
gulp.task('minifyHtml', gulp.series('minify-html'));
