var gulp = require("gulp"),
  browserSync = require("browser-sync");

// Copy third party libraries from /node_modules into /vendor
gulp.task("vendor", function() {
  // Bootstrap
  gulp
    .src([
      "./node_modules/bootstrap/dist/**/*",
      "!./node_modules/bootstrap/dist/css/bootstrap-grid*",
      "!./node_modules/bootstrap/dist/css/bootstrap-reboot*"
    ])
    .pipe(gulp.dest("./vendor/bootstrap"));

  // jQuery
  gulp
    .src(["./node_modules/jquery/dist/*", "!.node_modules/jquery/dist/core.js"])
    .pipe(gulp.dest("vendor/jquery"));
});

// Default task
gulp.task("default", ["vendor"]);

// Configure the browserSync task
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Live task
gulp.task('live', ['browserSync'], function() {
    gulp.watch('./css/*.css', browserSync.reload);
    gulp.watch('./js/*.js', browserSync.reload);
    gulp.watch('./*.html', browserSync.reload);
})