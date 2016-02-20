var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var watch = require('gulp-watch');
var sync = require('browser-sync').create();
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./package.json'));

gulp.task('serve', function() {
  sync.init({
    proxy: json.proxy
  });

  gulp.watch(['./scss/**/*.scss'], ['prepost']);
  gulp.watch('../css/*.css').on('change', sync.reload);
  gulp.watch('../js/**/*.js').on('change', sync.reload);
  gulp.watch('../../**/*.htm').on('change', sync.reload);

});

gulp.task('prepost', function() {

  var sassPaths = [
  ];

  var processors = [
    mqpacker,
    autoprefixer({browsers: ['last 2 version', 'ie >= 10']}),
    csswring
  ];

  return gulp.src('./scss/style.scss')
    .pipe(sass({
      includePaths: sassPaths
    }).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('../css'))
    .pipe(sync.stream());
});

gulp.task('default', ['prepost', 'serve']);

//
// EOF
//