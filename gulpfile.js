// dependencies
var gulp = require('gulp'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version'),
    jsdoc = require("gulp-jsdoc"),
    _ = require('lodash');

/**
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */

function inc(importance) {
  // get all the files to bump version in
  return gulp.src(['./package.json', './bower.json'])
    // bump the version number in those files
      .pipe(bump({type: importance}))
    // save it back to filesystem
      .pipe(gulp.dest('./'))
    // commit the changed version number
      .pipe(git.commit('bumps package version'))

    // read only one file to get the version number
      .pipe(filter('package.json'))
    // **tag it in the repository**
      .pipe(tag_version());
}

gulp.task('generate-docs', function() {
  return gulp.src("./src/*.js")
    .pipe(jsdoc.parser({
      name: 'Default Name Docs',
      description: 'Default Docs Description',
      version: require('./package.json').version,
      licenses: [],
      plugins: ['plugins/markdown']
    }, 'jsdoc.json'))
    .pipe(jsdoc.generator('./docs'));
});

gulp.task('patch', function() { return inc('patch'); });
gulp.task('feature', function() { return inc('minor'); });
gulp.task('release', function() { return inc('major'); });



var usemin = require('gulp-usemin'),
  wrap = require('gulp-wrap'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch'),
  minifyCss = require('gulp-minify-css'),
  minifyJs = require('gulp-uglify'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  minifyHTML = require('gulp-minify-html'),
  flatten = require('gulp-flatten');

var paths = {
  scripts: 'front/js/**/*.*',
  styles: 'front/styles/**/*.*',
  images: 'front/img/**/*.*',
  templates: ['front/**/*.html','front/modules/**/*.html'],
  index: 'front/index.html',
  bower_fonts: 'front/components/**/*.{ttf,woff,eof,svg}'
};

var browserify = require('gulp-browserify');

// Basic usage
gulp.task('scripts', function() {
  // Single entry point to browserify
  gulp.src('front/index.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : process.env.NODE_ENV != 'prod'
    }))
    .pipe(gulp.dest('./public'))
});

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
  return gulp.src(paths.index)
    .pipe(usemin({
      js: [minifyJs(), 'concat'],
      css: [minifyCss({keepSpecialComments: 0}), 'concat'],
    }))
    .pipe(gulp.dest('public/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
  return gulp.src(paths.bower_fonts)
    .pipe(rename({
      dirname: '/fonts'
    }))
    .pipe(gulp.dest('public/lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates']);

gulp.task('custom-images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest('public/img'));
});

gulp.task('custom-js', function() {
  return gulp.src(paths.scripts)
    .pipe(minifyJs())
    .pipe(concat('dashboard.min.js'))
    .pipe(gulp.dest('public/js'));
});

var sass = require('gulp-sass');
gulp.task('custom-less', function() {
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

gulp.task('custom-templates', function() {
  return gulp.src(paths.templates)
    .pipe(minifyHTML())
    .pipe(flatten())
    .pipe(gulp.dest('public/templates'));
});

/**
 * Watch custom files
 */
gulp.task('watch', function() {
  gulp.watch([paths.images], ['custom-images']);
  gulp.watch([paths.styles], ['custom-less']);
  gulp.watch(['front/**/*.js'], ['custom-js', 'scripts']);
  gulp.watch([paths.templates], ['custom-templates']);
  gulp.watch([paths.index], ['usemin']);
});

var server = require('gulp-express');
  /**
 * Live reload server
 */
gulp.task('webserver', function() {
  server.run(['index.js']);
  gulp.watch(['public/**/*.*'], server.notify);
});

//gulp.task('livereload', function() {
//  gulp.src(['public/**/*.*'])
//    .pipe(watch())
//    .pipe(connect.reload());
//});

/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom', 'scripts']);
gulp.task('default', ['build', 'webserver', 'watch']);