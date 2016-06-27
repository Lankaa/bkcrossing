/**
 * Created by Lanka on 16.03.2016.
 */

var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var filesize = require('gulp-filesize');


gulp.task('default', ['styles', 'watch', 'ugly']);

gulp.task('styles',['minifycss'], wrapPipe(function(success, error){
    //noinspection JSUnresolvedFunction
    return gulp.src('less/styles.less')
        .pipe(less()).on('error', error)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })).on('error', error)
        .pipe(gulp.dest('css/'))
        .pipe(livereload())
}));

gulp.task('watch', function(){
    livereload({start: true});
    gulp.watch('less/*.less', ['styles']);
});

gulp.task('minifycss', function() {
    return gulp.src('css/styles.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(rename('styles-min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/'));
});


// gulp.task('ugly', function() {
//    return gulp.src(['js/app.js', 'js/**/*.js'])
//        .pipe(concat('script.js'))
//        .pipe(sourcemaps.init())
//        .pipe(uglify())
//        .pipe(rename('script-min.js'))
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('js/'));
// });

// gulp.task('concat', function () {
//     return gulp.src(['js/app.js', 'js/**/*.js'])
//         .pipe(concat('script.js'))
//         .pipe(gulp.dest('js/'));
// });


function wrapPipe(taskFn) {
    return function (done) {
        var onSuccess = function () {
            done();
        };
        var onError = function () {
            done(error);
        };
        var outStream = taskFn(onSuccess, onError);
        if (outStream && typeof outStream.on === 'function') {
            outStream.on('end', onSuccess);
        }
    }
}
