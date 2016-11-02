/* global gulp */
/* eslint prefer-template: 0, prefer-arrow-callback: 0 */

import gulp from 'gulp';
import gulpClean from 'gulp-clean';
import gulpLint from 'gulp-eslint';
import gulpWebpack from 'webpack-stream';
import gulpUglify from 'gulp-uglify';
import gulpRename from 'gulp-rename';
import gulpMocha from 'gulp-mocha';
import runSequence from 'run-sequence';
import karma from 'karma';
import path from 'path';

const version = require('./package.json').version;
const webpackConfig = require('./webpack.config');

const src = 'src';
const dist = 'dist';

gulp.task('clean', function () {
  return gulp.src(dist, { read: false }).pipe(gulpClean());
});

gulp.task('lint', function () {
  return gulp.src(src + '/**/*.js')
      .pipe(gulpLint())
      .pipe(gulpLint.format())
      .pipe(gulpLint.failAfterError());
});

gulp.task('webpack', function () {
  return gulp.src(src + '/index.js')
      .pipe(gulpWebpack(webpackConfig))
      .pipe(gulp.dest(dist))
      .pipe(gulpRename('pubnub-angular2.js'));
});

gulp.task('uglify', function () {
  return gulp.src(dist + '/pubnub-angular2.js')
      .pipe(gulpUglify({ mangle: true, compress: true }))
      .pipe(gulpRename('pubnub-angular2.min.js'))
      .pipe(gulp.dest(dist));
});

gulp.task('include-sourcemaps', function () {
  return gulp.src(dist + '/pubnub-angular2.js.map')
      .pipe(gulpRename('pubnub-angular2.min.js.map'))
      .pipe(gulp.dest(dist))
      .pipe(gulpRename('pubnub-angular2-' + version + '.min.js.map'))
      .pipe(gulp.dest(dist));
});

gulp.task('test_release', function () {
  return gulp.src('test/release/**/*.test.js', { read: false })
      .pipe(gulpMocha({ reporter: 'spec' }));
});

gulp.task('test_client', (done) => {
  new karma.Server({ configFile: path.join(__dirname, '/karma.config.js') }, () => done()).start();
});

gulp.task('test', (done) => {
  runSequence('test_client', 'test_release', 'lint', done);
});

gulp.task('compile', (done) => {
  runSequence('clean', 'webpack', 'uglify', done);
});
