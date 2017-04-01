/* global gulp */
/* eslint prefer-template: 0, prefer-arrow-callback: 0 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import gulpClean from 'gulp-clean';
import gulpLint from 'gulp-eslint';
import gulpWebpack from 'webpack-stream';
import gulpUglify from 'gulp-uglify';
import gulpRename from 'gulp-rename';
import gulpGzip from 'gulp-gzip';
import gulpMocha from 'gulp-mocha';
import runSequence from 'run-sequence';
import karma from 'karma';
import path from 'path';

const version = require('./package.json').version;
const webpackConfig = require('./webpack.config');

const src = 'src';
const dist = 'dist';

gulp.task('clean', function () {
  return gulp.src(['lib', 'dist', 'coverage', 'upload'], { read: false }).pipe(gulpClean());
});

gulp.task('babel', function () {
	return gulp.src('src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('lib'));
});

gulp.task('copy_declaration_files', function () {
	return gulp.src('src/declaration_files/*.d.ts')
		.pipe(gulp.dest('lib'));
});

gulp.task('lint', function () {
  return gulp.src(src + '/**/*.js')
      .pipe(gulpLint())
      .pipe(gulpLint.format())
      .pipe(gulpLint.failAfterError());
});

gulp.task('create_version', function () {
  return gulp.src('dist/pubnub-angular2.js')
    .pipe(gulpRename('pubnub-angular2.' + version + '.js'))
    .pipe(gulp.dest('upload/normal'));
});

gulp.task('create_version_gzip', function () {
  return gulp.src('upload/normal/*.js')
    .pipe(gulpGzip({ append: false }))
    .pipe(gulp.dest('upload/gzip'));
});

gulp.task('webpack', function () {
  return gulp.src(src + '/pubnub.js')
      .pipe(gulpWebpack(webpackConfig))
      .pipe(gulp.dest(dist))
      .pipe(gulpRename('pubnub-angular2.js'));
});

gulp.task('uglify', function () {
  return gulp.src(dist + '/pubnub-angular2.js')
      .pipe(gulpUglify({ mangle: true, compress: true }))
      .pipe(gulpRename('pubnub-angular2.min.js'))
      .pipe(gulp.dest(dist))
      .pipe(gulpRename('pubnub-angular2.' + version + '.min.js'))
      .pipe(gulp.dest('upload/normal'));

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
  new karma.Server({ configFile: path.join(__dirname, '/karma.config.js') }, done).start();
});

gulp.task('test', (done) => {
  runSequence('test_client', 'test_release', 'lint', done);
});

gulp.task('compile', (done) => {
  runSequence('clean', 'babel', 'copy_declaration_files', 'webpack', 'create_version', 'uglify', 'create_version_gzip', done);
});
