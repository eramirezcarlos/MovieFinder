//gulpfile.js
/*
 *   @autor Carlos Ramirez <eramirezcarlos@gmail.com>
 *   this is the file for automation utilizing gulp
 **/

//definition of dependencies
var gulp = require('gulp'),
browserify = require('browserify'),
reactify = require('reactify'),
source = require('vinyl-source-stream'),
sass = require('gulp-sass'),
preprocess = require('gulp-preprocess'),
pleeease = require('gulp-pleeease'),
htmlclean = require('gulp-htmlclean'),
pkg = require('./package.json');

//Definition of the Enviroments DEVELOPMENT or PRODUCTION
var devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');
//vars of source and destination folder
var src = "src/";
var dist = 'dist/';

//definition of parameters gulp-preprocess HTML for processing templates and minification
var  html = {
        in: src + '*.html',
        watch: [src + '*.html', src + 'template/**/*'],
        out: dist,
        context: {
            devBuild: devBuild,
            author: pkg.author,
            version: pkg.version
    }
};
//Definition of the parameters for CSS3 prefixing
var pleaseeeOpts = {
    autoprefixer: {browsers: ['last 2 versions', '> 2%']},
    rem: ['16px'],
    pseudoElements: true,
    mqpacker: false
};

//Definition of the task and set of papelines, task browserify
gulp.task('browserify', function () {
    browserify('./src/js/main.js').
        transform('reactify').bundle().
        pipe(source('main.js')).pipe(gulp.dest('dist/js'));

});
//Definition of the task and set of papelines, task sass precompilation
gulp.task('sass', function () {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(pleeease(pleaseeeOpts))
        .pipe(gulp.dest('./src/css'));
});
//Definition of the task and set of papelines, task html preprocess ( templating )
gulp.task('html', function() {
    var page = gulp.src(html.in).pipe(preprocess({ context: html.context }));
    if (!devBuild) {
        page = page.pipe(htmlclean())
    }
    return page.pipe(gulp.dest(html.out));
});
//Definition of the task and set of papelines, task copy the files to the distribution folder
gulp.task('copy', function () {
    gulp.src('src/index.html').pipe(gulp.dest('dist'));
    gulp.src('src/css/*.*').pipe(gulp.dest('dist/css'));
    gulp.src('src/js/vendors/*.*').pipe(gulp.dest('dist/js'));
    gulp.src('bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('dist/js/vendors'));
    gulp.src('node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js').pipe(gulp.dest('dist/js/vendors'));

});
//Default task array of tasks and gulp watch on files
 gulp.task('default',['html','sass','browserify', 'copy'], function(){
     return gulp.watch(['src/**/*.scss','src/**/*.html','src/**/*.js'],['html','sass','browserify', 'copy']);
 });
