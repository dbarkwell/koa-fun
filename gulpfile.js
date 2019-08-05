var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject('tsconfig.json');
var script = 'dist/main.js';
var tasks = ['build-debug'];

gulp.task('debug', function(done) {
    nodemon({
        execMap: {
            js: 'node --inspect'
        },
        ext: 'ts',
        script: script,
        tasks: tasks,
        verbose: true,
        done: done
    });
});

gulp.task('build-release', function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

gulp.task('build-debug', function() {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js.pipe(sourcemaps.write('../dist')).pipe(gulp.dest('dist'));
});

gulp.task('start', function(done) {
    nodemon({
        script: script,
        ext: 'ts',
        tasks: tasks,
        done: done
    });
});

gulp.task('debug', gulp.series('build-debug'));

gulp.task('default', gulp.series('start'));
