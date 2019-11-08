var gulp = require('gulp'),
    cache  = require('gulp-cached'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq = require('gulp-group-css-media-queries'),
    notify  = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename');


/*
## browser sync
*/

gulp.task('browser-sync', function(done){
  browserSync.init({
    proxy: 'catan.lcl:8888'
  });
  done();
});

gulp.task('bs-reload', function(done){
  browserSync.reload();
  done();
});



/*
## StyleSheet
*/

gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass())
    .pipe(gcmq())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('htdocs/assets/css'));
});



/*
## JavaScript
*/

gulp.task('js', function(){
  return gulp.src([
      'src/js/110_header.js',
      'src/js/410_View.js',
      'src/js/990_footer.js'
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('common.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('htdocs/assets/js'));
});



/*
## watch
*/

gulp.task('watch', function(done){
  
  gulp.watch('htdocs/**/*.html', gulp.task('bs-reload'));
  gulp.watch('htdocs/**/*.php', gulp.task('bs-reload'));
  gulp.watch('htdocs/**/*.css', gulp.task('bs-reload'));
  gulp.watch('htdocs/**/*.js', gulp.task('bs-reload'));
  
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  
  done();
});

gulp.task('default', gulp.series('browser-sync', 'watch', function(done){
  done();
}));
