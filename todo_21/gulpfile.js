const gulp = require("gulp");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const cssmin = require("gulp-cssmin");

const paths = {
  styles: {
    src: "src/**/*.css",
    dest: "styles/",
  },
  build: {
    dest: "build/",
  },
};

/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(concat(paths.styles.dest))

    .pipe(
      rename(function (path) {
        path.extname = ".css";
      })
    )

    .pipe(cssmin())
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
  gulp.watch(paths.styles.src, styles);
}

function html() {
  return gulp.src("index.html").pipe(gulp.dest(paths.build.dest));
}

function fonts() {
  return gulp.src("fonts/**.*").pipe(gulp.dest(paths.build.dest + "/fonts"));
}
function css() {
  return gulp.src("styles/**.*").pipe(gulp.dest(paths.build.dest + "/styles"));
}
function js() {
  return gulp.src("dist/**.*").pipe(gulp.dest(paths.build.dest + "/dist"));
}
function image() {
  return gulp.src("img/**.*").pipe(gulp.dest(paths.build.dest + "/img"));
}

function move() {
  return gulp
    .src("build/**")
    .pipe(gulp.dest(paths.build.dest + "../../server/build"));
}

var build = gulp.series(gulp.parallel(styles, html, fonts, css, js, image));

exports.styles = styles;
exports.watch = watch;
exports.build = build;
exports.move = move;

// exports.default = build;
