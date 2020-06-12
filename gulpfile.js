const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const buble = require('gulp-buble');

//порядок компиляции стилей
const styles = [
    'app/**/*.scss'
];

//настройка стилей
gulp.task('sass', function() {
    return gulp.src(styles)
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('scripts', function() {
    return gulp.src('app/**/*.js')
        .pipe(buble())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}))
})


gulp.task('watch', function() {
    gulp.watch('app/**/*.scss', gulp.parallel('sass'));
    gulp.watch('dist/*.html').on('change', browserSync.reload);
    gulp.watch('app/**/*.js', gulp.parallel('scripts'));
})

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    })
})

// запускаем работу
gulp.task('start', gulp.parallel('sass', 'scripts', 'browserSync', 'watch'))
