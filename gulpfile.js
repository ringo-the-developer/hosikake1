// gulpfile vccw用
const
  gulp = require("gulp")
  sass = require("gulp-sass")
  browser = require("browser-sync")
  pug = require("gulp-pug")
  autoprefixer = require("gulp-autoprefixer")
  rename = require("gulp-rename")
  plumber = require("gulp-plumber")
  uglify = require("gulp-uglify")
  pleeease = require("gulp-pleeease")
  imagemin = require("gulp-imagemin")
  pngquant = require("imagemin-pngquant")
  mozjpeg = require("imagemin-mozjpeg")
  // changed = require("gulp-changed")
  notify = require("gulp-notify")
  // sourcemaps = require("gulp-sourcemaps")
  clean_css = require("gulp-clean-css")

const
  srcDir = "src/"
  dstDir = "dist/"
  pugOption = {
    pretty: true,
    basedir: srcDir,
  }
  paths = {
    root: './src',
    pug: {
      src: './src/pug/**/*.pug',
      dest: './dist/',
    },
    sass: {
      src: ['./src/sass/**/*.sass', './src/sass/**/*.scss',],
      dest: './dist/css',
      map: './dist/css/maps',
    },
    js: {
      src: './src/js/**/*.js',
      jsx: './src/js/**/*.jsx',
      dest: './dist/js',
      map: './dist/js/maps',
      core: 'src/js/core/**/*.js',
      app: 'src/js/app/**/*.js',
    },
    imgs: {
      src: {
        img: './src/img/**/*.{jpg,jpeg,png,gif}',
        svg: './src/img/**/*.svg',
      },
      dest: './dist/img/',
    },
    files: {
      src: './src/files/**/*',
      dist: './dist/files/',
    }
  }

function server(){
  return browser
    .init({
      port: 3000,
      server: {
        baseDir: dstDir,
        index: 'index.html',
      },
      reloadOnRestart: true,
    })
}

// SASSをCSSに変換。autoprefixer。min化。ソースマップ作成。
function sassCompile() {
  return gulp
    .src([srcDir + "sass/**/*.scss", srcDir + "sass/**/*.sass"], { sourcemaps: true })
    .pipe(plumber({ errorHandler: notify.onError("sassがエラーだよ！！\n<%= error.message %>") }))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(pleeease({
      "minifier": false,
      "autoprefixer": false,
      "mqpacker": true,
    }))
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
    }))
    .pipe(clean_css())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(dstDir + "css/", { sourcemaps: './maps/'}))
    .pipe(browser.reload({stream: true}))
}

// JSの変換。min化。ソースマップ作成。
function jsCompile() {
  return gulp
    .src([srcDir + "js/**/*.js", "!" + srcDir + "js/**/*.min.js"], { sourcemaps: true })
    .pipe(plumber({errorHandler: notify.onError("jsがエラーだよ！！\n<%= error.message %>")}))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(dstDir + "js/", { sourcemaps: './maps/'}))
    .pipe(browser.reload({ stream: true }))
}

// 1個ずつ、変更のあったファイルだけPUGするよ
function pugCompile(){
  return gulp
    .src([srcDir + "**/*.pug", "!" + srcDir + "**/_*.pug"], {
      since: gulp.lastRun(pug)
    })
    .pipe(plumber({errorHandler: notify.onError("pugがエラーだよ！！\n<%= error.message %>")}))
    .pipe(pug(pugOption))
    .pipe(gulp.dest(dstDir))
    .pipe(browser.reload({ stream: true}))
}

// 全部PUGするよ！
function pugAll(){
  return gulp
    .src([srcDir + "**/*.pug", "!" + srcDir + "**/_*.pug"])
    .pipe(plumber({errorHandler: notify.onError("pug-allがエラーだよ！！\n<%= error.message %>")}))
    .pipe(pug(pugOption))
    .pipe(gulp.dest(dstDir))
    .pipe(browser.reload({ stream: true}))//ファイル数が多いときはコメントアウトするとよい
}

// 画像のロスレス圧縮するよ！
// svgのみ
function imgMinSvg(){
  return gulp
    .src(srcDir + "img/**/*.svg", {
      since: gulp.lastRun(imgMinSvg)
    })
    .pipe(gulp.dest(dstDir + "img/"))
}

// favicon
function imgFavicon(){
  return gulp
    .src(srcDir + "img/**/*.ico", {
      since: gulp.lastRun(imgFavicon)
    })
    .pipe(gulp.dest(dstDir + "img/"))
}

// svg以外（png, jpg, gif）
function imgMin(){
  return gulp
    .src(srcDir + "img/**/*.{png,jpg,gif}", {
      since: gulp.lastRun(imgMin)
    })
    .pipe(imagemin([
      pngquant({ quality: [.7,.85], speed: 1, floyd: 0 }),
      mozjpeg({ quality: 80, progressive: true }),
      imagemin.gifsicle(),
      imagemin.svgo({ removeViewBox: false }),
    ]))
    .pipe(gulp.dest(dstDir + "img/"))
}

// ファイルをそのままdestするよ！
function files(){
  return gulp
    .src([srcDir + "files/**/*", srcDir + "**/.htaccess"], {
      dot: true,
      since: gulp.lastRun(files)
    })
    .pipe(gulp.dest(dstDir + "files/"))
}

// ウォッチタスク
function watchFiles(){
  gulp.watch(paths.files.src).on('change', gulp.series(files))
  gulp.watch(srcDir + "img/**/*.{png,jpg,gif,svg}").on('change', gulp.series(imgMin, imgMinSvg, imgFavicon))
  gulp.watch(srcDir + "**/*.pug").on('change', gulp.series(pugCompile))
  // gulp.watch(srcDir + "**/_*.pug").on('change', gulp.series("pug-all"))
  gulp.watch([srcDir + "sass/**/*.scss", srcDir + "sass/**/*.sass"]).on('change', gulp.series(sassCompile))
  gulp.watch([srcDir + "js/**/*.js", "!" + srcDir + "js/**/*.min.js"]).on('change', gulp.series(jsCompile))
}

// デフォルトタスク＋watchタスク
gulp.task("default", gulp.series(
  gulp.parallel(
    pugAll, sassCompile, jsCompile, files, imgMin, imgMinSvg
  ),
  gulp.parallel(server, watchFiles)
))

gulp.task('sass', sassCompile)
gulp.task('pug', pugCompile)
gulp.task('js', jsCompile)
gulp.task('img', gulp.series(imgMin, imgMinSvg, imgFavicon))
gulp.task('files', files)
gulp.task('build', gulp.series(gulp.parallel(sassCompile, pugCompile, jsCompile, imgMin, imgMinSvg, imgFavicon, files)))
