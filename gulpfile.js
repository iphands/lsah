/*global require*/
const gulp = require("gulp-v3");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
// const pkg = require("./package.json");

const config = {
    sass: "./sass/**/*scss"
};

gulp.task("sass", function () {
    gulp.src(config.sass)
        .pipe(concat("main.scss"))
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./css"));
});

gulp.task("watch", function () {
    gulp.watch(config.sass, ["sass"]);
});

// Copy third party libraries from /node_modules into /vendor
gulp.task("vendor", function() {
    // Flag Icon
    gulp.src(["node_modules/flag-icon-css/css/flag-icon.min.css"]).pipe(gulp.dest("./vendor/flag-icon-css"));
    gulp.src(["node_modules/flag-icon-css/flags/4x3/*"]).pipe(gulp.dest("./vendor/flags/4x3"));

    // Angular
    gulp.src(["node_modules/angular/angular.min.js"]).pipe(gulp.dest("./vendor/"));

    gulp.src(["node_modules/is-in-viewport/lib/isInViewport.min.js"]).pipe(gulp.dest("./vendor/"));

    // Bootstrap
    gulp.src([
        "./node_modules/bootstrap/dist/**/*",
        "!./node_modules/bootstrap/dist/css/bootstrap-grid*",
        "!./node_modules/bootstrap/dist/css/bootstrap-reboot*"
    ]).pipe(gulp.dest("./vendor/bootstrap"));

    // jQuery
    gulp.src([
        "./node_modules/jquery/dist/*",
        "!./node_modules/jquery/dist/core.js"
    ])
        .pipe(gulp.dest("./vendor/jquery"));

    // jQuery Easing
    gulp.src([
        "node_modules/jquery.easing/*.js"
    ])
        .pipe(gulp.dest("vendor/jquery-easing"));
});

// Default task
gulp.task("default", ["vendor", "sass"]);

// Configure the browserSync task
gulp.task("browserSync", function() {
    browserSync.init({
        open: false,
        server: {
            baseDir: "./"
        }
    });
});

// Dev task
gulp.task("dev", ["browserSync", "sass"], function () {
    gulp.watch("./sass/*.scss", ["sass", browserSync.reload]);
    gulp.watch("./js/*.js", browserSync.reload);
    gulp.watch("./*.html", browserSync.reload);
});
