/* jslint node: true */
/* jshint -W100 */
'use strict';

///////////////////////////////////////////////////////////////////////////////
// require
///////////////////////////////////////////////////////////////////////////////

var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var copy = require('gulp-copy');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var watch = require('gulp-watch');
var sync = require('browser-sync').create();
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var header = require('gulp-header');
var bower = require('gulp-bower');
var jshint = require('gulp-jshint');
var map = require('map-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var iconfont = require('gulp-iconfont');
var iconfontcss = require('gulp-iconfont-css');

var banner = ['/**',
  ' * <%= pkg.name %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @author <%= pkg.author %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

///////////////////////////////////////////////////////////////////////////////
// settings
///////////////////////////////////////////////////////////////////////////////

var ROOT = __dirname;
var SRC_ROOT = __dirname + '/src';
var DST_ROOT = __dirname + '/assets';

var SRC_PATH = {
  bower: ROOT + '/bower_components',
  fonts: SRC_ROOT + '/fonts',
  icons: SRC_ROOT + '/icons',
  img: SRC_ROOT + '/img',
  js: SRC_ROOT + '/js',
  scss: SRC_ROOT + '/scss'
};

var DST_PATH = {
  css: DST_ROOT + '/css',
  fonts: DST_ROOT + '/css/fonts',
  icons: DST_ROOT + '/icons',
  img: DST_ROOT + '/img',
  js: DST_ROOT + '/js'
};

var runTimestamp = Math.round(Date.now()/1000);

///////////////////////////////////////////////////////////////////////////////
// tasks
///////////////////////////////////////////////////////////////////////////////

gulp.task('bower', function() { 
  return bower()
    .pipe(gulp.dest(SRC_PATH.bower)) ;
});

gulp.task('clean', function () {
  return del([
    DST_ROOT + '/**/*'
  ]);
});

gulp.task('copy', function () {
  var options = {};
  gulp.src(SRC_PATH.fonts + '/**/*.*')
  .pipe(gulp.dest(DST_PATH.fonts));
  gulp.src(SRC_PATH.img + '/**/*.*')
  .pipe(gulp.dest(DST_PATH.img));
});

var myReporter = map(function (file, cb) {
  if (!file.jshint.success) {
    console.log('JSHINT fail in '+file.path);
    file.jshint.results.forEach(function (err) {
      if (err) {
        console.log(' '+file.path + ': line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason);
      }
    });
  }
  cb(null, file);
});

gulp.task('jshint', function() {
  gulp.src(SRC_PATH.js + '/main/*.js')
    .pipe(jshint())
    .pipe(myReporter);

  gulp.src(ROOT + 'gulp.js')
    .pipe(jshint())
    .pipe(myReporter);

});

gulp.task('build-js', function() { 

  var options = {};

  // main
  gulp.src(SRC_PATH.js + '/main/*.js') 
    .pipe(concat('main.js'))
    .pipe(uglify(options))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest(DST_PATH.js + '/'));

  // plugins
  process.chdir(SRC_PATH.bower);
  gulp.src([
      './jquery-cycle2/build/jquery.cycle2.js',
      './jquery-cycle2/src/jquery.cycle2.caption2.js',
      './jquery-cycle2/src/jquery.cycle2.scrollVert.js',
      './jquery-cycle2/src/jquery.cycle2.swipe.js',
      './owl.carousel/dist/owl.carousel.js'
    ]) 
  .pipe(concat('plugins.js'))
  .pipe(uglify(options))
  .pipe(gulp.dest(DST_PATH.js + '/'));

  // vendor
  gulp.src(SRC_PATH.bower + '/fancybox/source/jquery.fancybox.js') 
    .pipe(uglify(options))
    .pipe(gulp.dest(DST_PATH.js + '/vendor/'));

  gulp.src(SRC_PATH.bower + '/fancybox/source/helpers/jquery.fancybox-buttons.js') 
    .pipe(uglify(options))
    .pipe(gulp.dest(DST_PATH.js + '/vendor/'));

  gulp.src(SRC_PATH.bower + '/jquery/dist/jquery.js') 
    .pipe(uglify(options))
    .pipe(gulp.dest(DST_PATH.js + '/vendor/'));

  gulp.src(SRC_PATH.bower + '/jquery-touchswipe/jquery.touchSwipe.js') 
    .pipe(uglify(options))
    .pipe(gulp.dest(DST_PATH.js + '/vendor/'));

  // modernizr will be build via: ~ grunt modernizr

});

gulp.task('icons', function () {
    gulp.src(SRC_PATH.icons + '/*.svg')
    .pipe(iconfontcss({
        fontName: 'icon-custom',
        fontPath: '/fonts/',
        path: SRC_PATH.scss + '/templates/_icon.tmpl',
        targetPath: '../../scss/base/_icon.scss',
        appendUnicode: true
    }))
    .pipe(iconfont({
        fontName: 'icon-custom',
        normalize: true,
        formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
        timestamp: runTimestamp
    }))
    .on('glyphs', function (glyphs, options) {
        gutil.log.bind(glyphs, options);
    })
    .pipe(gulp.dest(SRC_PATH.fonts + '/icon-custom/'));
});

gulp.task('serve', function() {
  sync.init({
    proxy: pkg.proxy
  });

  gulp.watch([SRC_PATH.scss + '/**/*.scss'], ['prepost']);
  gulp.watch(DST_PATH.css + '/*.css').on('change', sync.reload);
  gulp.watch(DST_PATH.js + '/**/*.js').on('change', sync.reload);
  gulp.watch(DST_PATH.img + '/**/*').on('change', sync.reload);
  gulp.watch([
    'content/**/*.htm',
    'layouts/**/*.htm',
    'pages/**/*.htm',
    'partials/**/*.htm'
    ]).on('change', sync.reload);

});

gulp.task('prepost', function() {

  var sassPaths = [
  ];

  var processors = [
    mqpacker,
    autoprefixer({browsers: ['last 2 version', 'ie >= 10']}),
    csswring
  ];

  return gulp.src(SRC_PATH.scss + '/style.scss')
    .pipe(sass({
      includePaths: sassPaths
    }).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest(DST_PATH.css))
    .pipe(sync.stream());
});

gulp.task('build', ['copy', 'jshint', 'build-js', 'prepost']);

//
// EOF
//
