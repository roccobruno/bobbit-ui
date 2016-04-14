var gulp = require('gulp');
var mocha = require("gulp-mocha");
var notify = require("gulp-notify");
var compass = require('gulp-compass');
var livereload = require('gulp-livereload');
var duration = require('gulp-duration');

var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify')
var browserify = require('browserify');
var gzip = require('gulp-gzip');
var rename = require("gulp-rename");
var react = require('gulp-react');
var replace = require('gulp-replace');

var path = require("path");

require('node-jsx').install({extension: '.jsx'});

var everything = "./src/main";

var webapp = "./src/main/resources/webapp";
var pretest = "./pretest/";
var dest = "./build/classes/main/static/js";
var src = "./src/main/js/prod/";

var test_src = "./src/main/js/test";

var developer_mode = false;
//process.env.BROWSERIFYSHIM_DIAGNOSTICS=1

var paths = {
   apps: ["login.js","project.js"],
//   apps: ["login.js"],
    tests: [test_src + "/**/*.js",test_src + "/**/*.jsx"],
    appScripts: [src + "/**/*.js", src + "/**/*.jsx"],
    appStyles: everything + "/webapp/static/sass/**/*.scss",
    html: webapp + "/*.html",
    static: [webapp + "/static/**", "!*.scss"]
};

function onError(err) {
    console.log(err.toString());
    if (developer_mode) {
        this.emit("end");
    } else {
        process.exit(1);
    }
}

gulp.task("html", function () {
    gulp.src([paths.html])
        .pipe(gulp.dest(dest))
});

gulp.task('compressAllDeployFiles', function () {
    gulp.src(dest + "/**/*.js")
        .pipe(gzip())
        .pipe(rename({
            extname: ".gz"
        }))
        .pipe(gulp.dest(dest));

    gulp.src(dest + "/**/*.css")
        .pipe(gzip())
        .pipe(rename({
            extname: ".gz"
        }))
        .pipe(gulp.dest(dest));
});


gulp.task("static", function () {
    var static_content = dest + "/static";
    gulp.src(paths.static)
        .pipe(gulp.dest(static_content));

    gulp.src(["node_modules/tinymce/**"])
        .pipe(gulp.dest(static_content + "/tinymce"))
});

gulp.task('compass', function (cb) {
    gulp.src('./src/**/*.scss')
        .on('error', onError)
        .on('end', function () {
            cb();
        })

        .pipe(notify("CSS Compilation Complete"));
});

gulp.task('pretest', function () {
    return gulp.src(paths.appScripts)
        .pipe(react())
        .pipe(replace(/.jsx/g, '.js'))
        .pipe(gulp.dest(pretest));
});

gulp.task("test", function () {
    gulp.src(paths.tests)
        .pipe(mocha({
            reporter: "nyan"
        }).on("error", onError))
        .on("end", function () {
            console.log('done testing')
        });
});

function blankLines(lines) {
    for (var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
}

var bundleLogger = require('./src/buildtools/js/bundle-logger.js');

var handleBrowserifyErrors = function () {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({ title: "Compile Error", message: "<%= error.message %>" }).apply(this, args);
// Keep gulp from hanging on this task
    this.emit('end');
};

function browserifyApps(callback, watch) {
    var queue = 0;
    function browserifyApplication(app, watch) {

        var appsrc = path.join(__dirname, src, "app", app);

        var bundler = browserify({
            cache: {}, packageCache: {}, fullPaths: true,
            entries: appsrc,
            extensions: ["", ".js", ".jsx"],
            debug: true
        });

        var reportFinished = function() {
            bundleLogger.end(app);
            notify("App " + app + " complete");
            if ( --queue == 0 ) {
                callback();
            }
        };

        var bundle = function () {
            bundleLogger.start(app);

            return bundler
                .transform("reactify")
                .bundle()
                .on("error", handleBrowserifyErrors)
                .pipe(source(app))
                .pipe(gulp.dest(dest))
                .pipe(rename({
                    extname: ".gz"
                }))
                .pipe(gulp.dest(dest))
                .on("end", reportFinished)
        };

        if ( watch ) {
            bundler = watchify(bundler);
            bundler.on("update", bundle);
        }

        queue++;
        return bundle();
    }

    paths.apps.forEach(function(a) { browserifyApplication(a, watch) });
}


gulp.task("staticStuff", ["index", "static"]);

gulp.task("website", [ "html", "static"], function (callback) {
    browserifyApps(callback, false);
});

gulp.task('default', ["website"]);

gulp.task("terminal-clear", function () {
    var lines = process.stdout.getWindowSize()[1];
    blankLines(lines);
});

gulp.task("set-developer-mode", function () {
    developer_mode = true;
});

gulp.task('test-loop', ["set-developer-mode",  "html", "static", "test"], function (callback) {
    gulp.watch(paths.html, ["html"]);
    gulp.watch(paths.static, ["static"]);
    gulp.watch(paths.appScripts, ["test"]);
    gulp.watch(paths.tests, ["test"]);

    browserifyApps(callback, true);
});

