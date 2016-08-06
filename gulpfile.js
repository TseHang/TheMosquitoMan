var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var compass = require('gulp-compass');


var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


gulp.task('sass', function() {
  return gulp.src(['./sass/**/*.scss'])
  .pipe(compass({
    config_file: './config.rb',
    css: './public/css',
    sass: 'sass'
  }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('js', function() {
  gulp.src(['./js/**/*.js'])
  .pipe(uglify())
  .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function () {
  gulp.watch(['./sass/**/*.scss'], ['sass']);
  gulp.watch(['./js/**/*.js'], ['js']);
});

gulp.task('default', ['sass', 'js', 'watch']);
