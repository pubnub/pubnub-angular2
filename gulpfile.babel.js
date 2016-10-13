const version = require('./package.json').version;
const webpackConfig = require('./webpack.config');
const src = 'src';
const dist = 'dist';

import gulp from 'gulp';
import gulpClean from 'gulp-clean';
import gulpLint from 'gulp-eslint';
import gulpWebpack from 'webpack-stream';
import gulpUglify from 'gulp-uglify';
import gulpRename from 'gulp-rename';
import gulpMocha from 'gulp-mocha';
import runSequence from 'run-sequence';
import karma from 'karma';

gulp.task('clean', () => {
    return gulp.src(src, {read: false}).pipe(gulpClean());
});

gulp.task('clean-original-sourcemap', () => {

    return gulp.src(dist + '/pubnub-angular2.js.map', {read: false}).pipe(gulpClean());
});

gulp.task('lint', () => {

    return gulp.src(src + '/**/*.js')
        .pipe(gulpLint())
        .pipe(gulpLint.format())
        .pipe(gulpLint.failAfterError());
});

gulp.task('webpack', () => {

    return gulp.src(src + '/index.js')
        .pipe(gulpWebpack(webpackConfig))
        .pipe(gulp.dest(dist))
        .pipe(gulpRename('pubnub-angular2-' + version + '.js'));
});

gulp.task('uglify', () => {

    return gulp.src(dist + '/pubnub-angular2.js')
        .pipe(gulpRename('pubnub-angular2-' + version + '.js'))
        .pipe(gulp.dest(dist))
        .pipe(gulpUglify({ mangle: true, compress: true }))
        .pipe(gulpRename('pubnub-angular2.min' + version + '.js'))
        .pipe(gulp.dest(dist))
        .pipe(gulpRename('pubnub-angular2-' + version + '.min.js'))
        .pipe(gulp.dest(dist));
});

gulp.task('include-sourcemaps', () => {

    return gulp.src(dist + '/pubnub-angular2.js.map')
        .pipe(gulpRename('pubnub-angular2.min.js.map'))
        .pipe(gulp.dest(dist))
        .pipe(gulpRename('pubnub-angular2-' + version + '.min.js.map'))
        .pipe(gulp.dest(dist));
});

gulp.task('test_release', () => {

    return gulp.src('test/release/**/*.test.js', {read: false})
        .pipe(gulpMocha({reporter: 'spec'}));
});

gulp.task('test_client', (done) => {

    new karma.Server({configFile: __dirname + '/karma.config.js'}, () => done()).start();
});

gulp.task('test', (done) => {
    runSequence('test_client', 'test_release', done);
});

gulp.task('compile', (done) => {

    runSequence('clean', 'webpack', 'lint', 'uglify', 'include-sourcemaps', 'clean-original-sourcemap', done);
});





