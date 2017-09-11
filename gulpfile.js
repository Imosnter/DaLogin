var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var cssnano =require('gulp-cssnano');

gulp.task('sass', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
    })
});

gulp.task('useref', function () {
   return gulp.src('src/*.html')
       .pipe(useref())
       .pipe(gulpIf('*.js', uglify()))
       // Minifies only if it's a CSS file
       .pipe(gulpIf('*.css', cssnano()))
       .pipe(gulp.dest('dist/css'))
});

gulp.task('watch', ['browserSync','sass'], function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);

});

