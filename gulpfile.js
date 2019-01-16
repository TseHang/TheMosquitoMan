var gulp = require('gulp');
var gulpUglify = require('gulp-uglify');
var gulpCleanCss = require('gulp-clean-css');
var gulpCompass = require('gulp-compass');
var gulpHbsRouter = require('gulp-hbs-router');
var gulpMinifyHTML = require('gulp-minify-html');
var gulpImagemin = require('gulp-imagemin');

var gulpWebServer = require('gulp-webserver');
var gulpPlumber = require('gulp-plumber'); // 記錄錯誤訊息，並不會讓gulp停止
var gulpConcat = require('gulp-concat');
var gulpRename = require('gulp-rename');
var chalk = require('chalk');

// ------ option argv
var srcPath = './';
var outputPath = './dist';
var gameDir = process.argv[4];

if(gameDir){
  srcPath = './game/' + gameDir + '/';
  outputPath = './interact/game/' + gameDir ;
}

/*
	`gulp`: build sass , js , hbs
  `gulp minify`: Compress css, js, html, image
*/
gulp.task('default', ['sass', 'js', 'hbs', 'webserver', 'watch']);
gulp.task('minify', ['minify-html']);
gulp.task('game', ['sass', 'concate-game-js', 'js', 'hbs', 'webserver', 'watch-game']);
gulp.task('compress-image', ['compress-image']);

gulp.task('webserver', () => {
  gulp.src('./')
    .pipe(gulpWebServer({
      livereload: true,
      directoryListing: true,
      open: true,
    }));
});

gulp.task('hbs', function() {
  gulp
    .src('./layout/**/*.hbs')
    .pipe(gulpPlumber())
    .pipe(gulpHbsRouter({
      cwdPath: `${__dirname}/`,
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('minify-html', () => {
  gulp
    .src(['./*.html', '!node_modules/**/*.html'])
    .pipe(gulpPlumber())
    .pipe(gulpMinifyHTML())
    .pipe(gulpRename(path => console.log(`\n    ${chalk.bgMagenta('minify')} '${path.basename}${path.extname}'`)))
    .pipe(gulp.dest('./'));
});


gulp.task('sass', function() {
  gulp
    .src('./sass/**/*.scss')
    .pipe(gulpPlumber())
    .pipe(gulpCompass({
      config_file: './config.rb',
      css: outputPath + '/css',
      sass: srcPath + 'sass',
      time: true,
      comments: false, // Do not include comments
    }))
    .pipe(gulpCleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest(outputPath + '/css'));
});

gulp.task('js', function() {
  gulp
    .src(srcPath + 'js/**/*.js')
    .pipe(gulpPlumber())
    .pipe(gulpRename(path => console.log(`\n    ${chalk.yellow('write')} '${path.basename}${path.extname}'`)))
    .pipe(gulpUglify())
    .pipe(gulp.dest(outputPath + '/js'));
});

gulp.task('concate-game-js', function () {
  gulp.src(srcPath + 'scripts/**/*.js')
    .pipe(gulpPlumber())
    .pipe(gulpConcat('game.min.js'))
    .pipe(gulp.dest(srcPath + 'js'));
});

gulp.task('concate-quintus', function () {
  gulp.src('./game/Mosquito_war/lib/**/*.js')
    .pipe(plumber())
    .pipe(gulpConcat('quintus-all.min.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest('interact/game/Mosquito_war/js'));
});

gulp.task('watch', function () {
  gulp.watch(['./sass/**/*.scss'], ['sass']);
  gulp.watch(['./js/**/*.js'], ['js']);
  gulp.watch('./layout/**/*.hbs', ['hbs']);
});

// 有 bug QQ 路徑要調整
gulp.task('watch-game', function(){
  if (process.argv[4] === undefined)
    console.log('\n        You should input GAME FILE NAME like: ` gulp game --option test `\n');
  else{
    var path = './game/'+process.argv[4]+'/';
    gulp.watch([path+'sass/**/*.scss'], ['sass']);
    gulp.watch([path+'scripts/**/*.js'], ['concate-game-js','js']);
  }
})


/*
	【 Compress images 】
  input: dist/src/img/
  output: dist/src/img/
*/
gulp.task('compress-image', () => {
  gulp
    .src('./dist/src/img/**/**')
    .pipe(gulpPlumber())
    .pipe(gulpImagemin())
    .pipe(gulp.dest('./dist/src/img/'));
});