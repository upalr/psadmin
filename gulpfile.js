"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser

var browserify = require('browserify');  //Bundles JS
var reactify = require('reactify');     // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with gulp

var concat = require('gulp-concat'); // Concatenates files

var lint = require('gulp-eslint'); // Lint JS files, including JSX

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        images: './src/images/*',
        dist: './dist',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css'
        ],
        mainJs: './src/main.js'
    }

}
//Start a local development server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

// open a given file in the url
gulp.task('open', ['connect'], function () { //dependency on connect. first run the task connect 
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

//move file from src to dist  + reload the dev server
gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload()); //reload the dev server
});

// see as bellow description
gulp.task('js', function () {
    browserify(config.paths.mainJs)
        .transform(reactify)// convert jsx to js
        .bundle() // bundele korbe
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js')) // name of the bundle file
        .pipe(gulp.dest(config.paths.dist + '/scripts'))// destination path for the bundle.js
        .pipe(connect.reload())
});

//see bellow description
gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css')) //name of the bundle file where concat 2 file
        .pipe(gulp.dest(config.paths.dist + '/css')) // destination path for the bundle.css
});

//Migrates images to dist folder
//Note that I could even optimize my image here
gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());
    //publish favicon
    gulp.src('./src/favicon.icon')
        .pipe(gulp.dest(config.paths.dist));
});

//show error if we write bad code
gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(lint({ config: 'eslint.config.json' }))
        .pipe(lint.format());
});

//watch files so if we change file reload browser
gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']); // if javascript change run lint 
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);