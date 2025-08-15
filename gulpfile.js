var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Compile LESS files from /less into /css
function lessTask() {
    return gulp.src('less/agency.less')
        .pipe(less())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

// Minify compiled CSS
function minifyCss() {
    return gulp.src('css/agency.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

// Minify JS
function minifyJs() {
    return gulp.src('js/agency.js')
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

// Copy vendor libraries from /node_modules into /vendor
function copyVendor() {
    return gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))
        .pipe(gulp.src([
            'node_modules/@fortawesome/fontawesome-free/**',
            '!node_modules/@fortawesome/fontawesome-free/**/*.map',
            '!node_modules/@fortawesome/fontawesome-free/.npmignore',
            '!node_modules/@fortawesome/fontawesome-free/*.txt',
            '!node_modules/@fortawesome/fontawesome-free/*.md',
            '!node_modules/@fortawesome/fontawesome-free/*.json'
        ]))
        .pipe(gulp.dest('vendor/font-awesome'));
}

// Configure the browserSync task
function browserSyncTask() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    });
}

// Watch files
function watchFiles() {
    gulp.watch('less/*.less', lessTask);
    gulp.watch('css/*.css', minifyCss);
    gulp.watch('js/*.js', minifyJs);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
}

// Compiles SCSS files from /scss into /css
// NOTE: This theme uses LESS by default. To switch to SCSS you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
function sassTask() {
    return gulp.src('scss/agency.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

// Export tasks
exports.less = lessTask;
exports.sass = sassTask;
exports.minifyCss = minifyCss;
exports.minifyJs = minifyJs;
exports.copy = copyVendor;
exports.browserSync = browserSyncTask;
exports.watch = watchFiles;

// Default task
exports.default = gulp.series(lessTask, minifyCss, minifyJs, copyVendor);

// Dev task with browserSync
exports.dev = gulp.series(browserSyncTask, gulp.parallel(lessTask, minifyCss, minifyJs), watchFiles);