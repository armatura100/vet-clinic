import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import fileInclude from 'gulp-file-include';
import browserSync from 'browser-sync';
import del from 'del';
import rename from 'gulp-rename';
import webpack from 'webpack-stream';

const sass = gulpSass(dartSass);

// plugins for images
import webpCss from 'gulp-webpcss';
// webpconverter@2.2.3 is installed in package.json as well
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import newer from 'gulp-newer';

// catch errors
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

// plugins for build
import htmlmin from 'gulp-htmlmin';
import cleanCss from 'gulp-clean-css';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build')
}

// dev tasks
const html = () => {
    return gulp.src('src/*.html')
        .pipe(plumber(notify.onError({
            title: 'HTML',
            message: '<%= error.message %>'
        })))
        .pipe(fileInclude())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
}

const scss = () => {
    return gulp.src('src/scss/**/*.scss', { sourcemaps: true })
        .pipe(plumber(notify.onError({
            title: 'SCSS',
            message: '<%= error.message %>'
        })))
        .pipe(sass())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css', { sourcemaps: true }))
        .pipe(browserSync.stream())
}

const js = () => {
    return gulp.src('src/js/app.js', { sourcemaps: true })
        .pipe(plumber(notify.onError({
            title: 'JS',
            message: '<%= error.message %>'
        })))
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'app.min.js'
            }
        }))
        .pipe(gulp.dest('dist/js', { sourcemaps: true }))
        .pipe(browserSync.stream())
}

const images = () => {
    return gulp.src('src/img/**/*')
        .pipe(plumber(notify.onError({
            title: 'IMAGES',
            message: '<%= error.message %>'
        })))
        .pipe(newer('dist/img'))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream())
}

const fonts = () => {
    return gulp.src('src/fonts/**/*')
        .pipe(plumber(notify.onError({
            title: 'FONTS',
            message: '<%= error.message %>'
        })))
        .pipe(gulp.dest('dist/fonts'))
}

const reset = () => {
    return del('dist');
}

const server = () => {
    browserSync.init({
        server: 'dist'
    })
}

const watcher = () => {
    gulp.watch('src/**/**.html', html);
    gulp.watch('src/scss/**/*.scss', scss);
    gulp.watch('src/js/**/*.js', js);
    gulp.watch('src/img/**/*', images);
}

// build tasks
const buildHtml = () => {
    return gulp.src('dist/*.html')
        .pipe(webpHtmlNosvg())
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
}

const buildCss = () => {
    return gulp.src('dist/css/**/*.css')
        .pipe(webpCss())
        .pipe(groupCssMediaQueries())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
}

const buildImages = () => {
    return gulp.src('src/img/**/*')
        .pipe(webp())
        .pipe(gulp.dest('dist/img'))
        .pipe(gulp.src('src/img/**/*'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
}

const mainTasks = gulp.parallel(html, scss, js, images, fonts);
const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher));
const build = gulp.series(reset, mainTasks, gulp.parallel(buildHtml, buildCss, buildImages));

export { dev, build };