var gulp = require('gulp'),
    clean = require('gulp-clean');
    cleanCSS = require("gulp-clean-css"),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    minifyHtml = require('gulp-minify-html'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')),
    uglify = require('gulp-uglify'),

gulp.task('clean:css', function () {
    return gulp.src('wwwroot/css/site.min.css', { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('clean:js', function () {
    return gulp.src('wwwroot/js/*.min.js', { read: false, allowEmpty: true })
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

//Did you forget to signal async completion?
//Gulp plugin that returns promises
//A Promise is an object representing the eventual completion or failure of an asynchronous operation
gulp.task('compress-images',async function () {
    await gulp.src('wwwroot/images/*.{jpg,png}')
        .pipe(imagemin())
        .pipe(gulp.dest('wwwroot/images/compressedImages'))
});

//HTML Optimization
gulp.task('minify-html', function () {
    return gulp.src('Pages/Shared/_Layout.cshtml')
        .pipe(minifyHtml())
        .pipe(rename('_MinifiedLayout.html'))
        .pipe(gulp.dest('SharedMinifications'));
});

// SASS To CSS
function compileSass() {
    return gulp.src('wwwroot/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('ConvertedCss.css'))
        .pipe(gulp.dest('wwwroot/css'));
}

exports.compileSass = compileSass;

gulp.task('default', gulp.series('clean:css', 'min-concat:css', 'clean:js',
    'min:js','compress-images', 'minify-html', compileSass));

gulp.task('minifyCss', gulp.series('clean:css', 'min-concat:css'));
gulp.task('minifyJs', gulp.series('clean:js', 'min:js'));
gulp.task('minifyHtml', gulp.series('minify-html'));
gulp.task('compressImages', gulp.series('compress-images'));
