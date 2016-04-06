"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var server = require("browser-sync");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var path = require("path");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");
var rimraf = require("rimraf");
var merge = require("merge-stream");
var uglify = require("gulp-uglify");



gulp.task("clean", function (cb) {
  rimraf('./build', cb);
});

gulp.task("style", ["clean"], function() {
   gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 1 version",
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Opera versions",
          "last 2 Edge versions"
        ]
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"))
    .pipe(server.reload({
      stream: true
    }));
});

gulp.task("minjs", ["style"], function() {
  return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(rename("js.min.js"))
    .pipe(gulp.dest("build/js"))
});

gulp.task("copy", ["minjs"], function() {
  var html = gulp.src("*.html")
  .pipe(gulp.dest("build"));

  var css = gulp.src("css/**/*.css")
  .pipe(gulp.dest("build/css"));

  var fonts = gulp.src("fonts/**/*{woff, woff2}")
  .pipe(gulp.dest("build/fonts"));

  var js = gulp.src("js/**/*.js")
  .pipe(gulp.dest("build/js"));

  var img = gulp.src("img/**")
  .pipe(gulp.dest("build/img"));

  return merge(html, css, fonts, js, img);
});

gulp.task("build", ["copy"], function() {
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});


gulp.task("images", function() {
  return gulp.src("img/**/*.{png,jpg,gif}")
  .pipe(imagemin({
    optimizationLevel: 3,
    progressive: true
  }))

  .pipe(gulp.dest("img"));
});


gulp.task("svgstore", function() {
  return gulp.src("img/icons/*.svg")

    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("svg-sprite.svg"))
    .pipe(gulp.dest("img"));
});
