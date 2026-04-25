/**
 * Gulpfile.js - Portfolio de Eduardo Olivares
 * Sistema de build para GitHub Pages
 * 
 * @author Eduardo Olivares
 * @version 2.0.0
 */

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require('browser-sync').create();

// Banner para archivos minificados
const banner = `/**
 * Portfolio de Eduardo Olivares
 * https://edolivares.github.io
 * 
 * @author Eduardo Olivares
 * @version 2.0.0
 * @license MIT
 */\n\n`;

// Rutas de archivos
const paths = {
    scss: {
        src: 'scss/**/*.scss',
        dest: 'assets/css-sass' // Carpeta para archivos SCSS compilados dentro de assets
    },
    css: {
        src: 'assets/css/*.css',
        dest: 'assets/css' // Mismo directorio, solo minificar
    },
    js: {
        src: 'assets/js/*.js',
        dest: 'assets/js' // Mismo directorio, solo minificar
    },
    images: {
        src: 'assets/images/**/*',
        dest: 'assets/images' // Mismo directorio
    }
};

// Limpiar archivos generados
function clean() {
    return del([
        'assets/css-sass/**/*', // Limpiar carpeta css-sass dentro de assets
        'assets/css/*.min.css',
        'assets/js/*.min.js'
    ]);
}

// Compilar SCSS a CSS
function compileSass() {
    return gulp.src(paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: ['scss']
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false,
            grid: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(browserSync.stream());
}

// Minificar CSS (en el mismo directorio)
function minifyCss() {
    return gulp.src(paths.css.src)
        .pipe(cssnano({
            preset: ['default', {
                discardComments: {
                    removeAll: true
                }
            }]
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.css.dest));
}

// Minificar archivos específicos main.css y main.js
function minifyMainFiles() {
    // Minificar main.css
    const cssTask = gulp.src('assets/css/main.css')
        .pipe(cssnano({
            preset: ['default', {
                discardComments: {
                    removeAll: true
                }
            }]
        }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('assets/css'));

    // Minificar main.js
    const jsTask = gulp.src('assets/js/main.js')
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('assets/js'));

    return Promise.all([cssTask, jsTask]);
}

// Crear bundle CSS concatenando todos los archivos CSS
function bundleCss() {
    return gulp.src([
            'assets/css/base.css',
            'assets/css/header-navbar.css',
            'assets/css/sections.css',
            'assets/css/contact-form.css',
            'assets/css/footer.css',
            'assets/css/portfolio.css',
            'assets/css/about.css',
            'assets/css/jobs.css'
        ], {
            base: 'assets/css'
        })
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('assets/css'))
        .pipe(cssnano({
            preset: ['default', {
                discardComments: {
                    removeAll: true
                }
            }]
        }))
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('assets/css'));
}

// Crear bundle JS concatenando todos los archivos JS
function bundleJs() {
    return gulp.src([
            'assets/js/vanilla-functions.js',
            'assets/js/header-behavior.js',
            'assets/js/footer-functions.js',
            'assets/js/main.js'
        ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(uglify({
            compress: {
                drop_console: true
            },
            mangle: true
        }))
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('assets/js'));
}

// Minificar JavaScript (en el mismo directorio)
function minifyJs() {
    return gulp.src(paths.js.src)
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.js.dest));
}

// Servidor de desarrollo
function serve() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3000,
        open: true,
        notify: false
    });

    gulp.watch(paths.scss.src, compileSass);
    gulp.watch(paths.css.src, minifyCss);
    gulp.watch(paths.js.src, minifyJs);
    gulp.watch('*.html').on('change', browserSync.reload);
}

// Build completo
const build = gulp.series(
    clean,
    compileSass,
    gulp.parallel(minifyCss, minifyJs)
);

// Build de desarrollo (solo SCSS)
const dev = gulp.series(clean, compileSass);

// Build solo SCSS para comparación
const sassOnly = gulp.series(clean, compileSass);

// Tareas exportadas
exports.clean = clean;
exports.sass = compileSass;
exports.css = minifyCss;
exports.js = minifyJs;
exports.serve = serve;
exports.build = build;
exports.dev = dev;
exports.sassOnly = sassOnly; // Nueva tarea para compilar solo SCSS
exports.minifyMain = minifyMainFiles; // Nueva tarea para minificar archivos main
exports.bundleCss = bundleCss; // Nueva tarea para crear bundle CSS
exports.bundleJs = bundleJs; // Nueva tarea para crear bundle JS
exports.bundle = gulp.parallel(bundleCss, bundleJs); // Tarea para crear ambos bundles
exports.default = build;