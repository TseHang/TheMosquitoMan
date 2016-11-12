var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var compass = require('gulp-compass');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

// ------ option argv
var srcPath = './';
var outputPath = './dist';
var gameDir = process.argv[4];

if(gameDir){
  srcPath = './game/' + gameDir + '/';
  outputPath = './interact/game/' + gameDir ;
}

gulp.task('sass', function() {

  gulp.src([srcPath + 'sass/**/*.scss'])
  .pipe(plumber())
  .pipe(compass({
    config_file: './config.rb',
    css: outputPath + '/css',
    sass: srcPath + 'sass'
  }))
  .pipe(minifyCSS())
  .pipe(gulp.dest(outputPath + '/css'));
});

gulp.task('js', function() {
  gulp.src([srcPath + 'js/**/*.js'])
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest(outputPath + '/js'));

});

gulp.task('concate-game-js', function () {
  gulp.src(srcPath + 'scripts/**/*.js')
    .pipe(plumber())
    .pipe(concat('game.min.js'))
    .pipe(gulp.dest(srcPath + 'js'));
});

gulp.task('concate-quintus', function () {
  gulp.src('./game/Mosquito_war/lib/**/*.js')
    .pipe(plumber())
    .pipe(concat('quintus-all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('interact/game/Mosquito_war/js'));
});

gulp.task('watch', function () {
  gulp.watch(['./sass/**/*.scss'], ['sass']);
  gulp.watch(['./js/**/*.js'], ['js']);
});

gulp.task('watch-game', function(){
  if (process.argv[4] === undefined)
    console.log('\n        You should input GAME FILE NAME like: ` gulp game --option test `\n');
  else{
    var path = './game/'+process.argv[4]+'/';
    gulp.watch([path+'sass/**/*.scss'], ['sass']);
    gulp.watch([path+'scripts/**/*.js'], ['concate-game-js','js']);
  }
})

gulp.task('game', ['sass', 'concate-game-js', 'js', 'watch-game'])
gulp.task('default', ['sass', 'js', 'watch']);
