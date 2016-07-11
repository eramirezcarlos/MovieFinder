var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var preprocess = require('preprocess');
var pleeease = require('gulp-pleeease');
/*
var source = "src/";
var dist = 'dist/';
*/
var pleaseeeOpts = {
    autoprefixer: {browsers: ['last 2 versions', '> 2%']},
    rem: ['16px'],
    pseudoElements: true,
    mqpacker: false
};

gulp.task('browserify', function () {
    browserify('./src/js/main.js').
        transform('reactify').bundle().
        pipe(source('main.js')).pipe(gulp.dest('dist/js'));

});

gulp.task('sass', function () {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(pleeease(pleaseeeOpts))
        .pipe(gulp.dest('./src/css'));
});


gulp.task('copy', function () {
    gulp.src('src/index.html').pipe(gulp.dest('dist'));
    gulp.src('src/css/*.*').pipe(gulp.dest('dist/css'));
    gulp.src('src/js/vendors/*.*').pipe(gulp.dest('dist/js'));
    gulp.src('bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('dist/js/vendors'));
    gulp.src('node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js').pipe(gulp.dest('dist/js/vendors'));

});


 gulp.task('default',['sass','browserify', 'copy'], function(){
     return gulp.watch(['src/**/*.scss','src/**/*.html','src/**/*.js'],['sass','browserify', 'copy']);
 });
