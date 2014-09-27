'use strict';

var gulp = require('gulp');
var svgstore = require('gulp-svgstore')
var svgmin = require('gulp-svgmin')
var raster = require('gulp-raster');
var rename = require('gulp-rename');

var svgMinConfig = [{ convertIdsToClassesAndSort: true },
                    { removeDoctype: true },
                    { removeComments: true },
                    { removeUselessStrokeAndFill: true},
                    { mergePaths: false },
                    { removeUnknownsAndDefaults: true },
                    { removeEditorsNSData: true },
                    { cleanupAttrs: false },
                    { cleanupIDs: false },
                    { sortAttrs: false },
                    { convertStyleToAttrs: true }];

gulp.task('svgMin', function() {
  gulp.src('./svgs/**/*.svg')
            .pipe(svgmin(svgMinConfig))
            .pipe(gulp.dest('./dist/facons/svgs/'))
});

gulp.task('svgSprite', function() {
  // function transformSvg (svg, cb) {
  // svg.find('//*[@id]').forEach(function (child) {
  //   var id = child.attr('id').toString();
  //   id = id.substr(5,id.length-6);
  //   child.attr('class', id);
  // })
  //   cb(null)
  // }
  gulp.src('./svgs/**/*.svg')
           .pipe(svgmin(svgMinConfig, true, true))
           .pipe(svgstore({ fileName: 'facons.svg', prefix: 'icon-'}))
           .pipe(gulp.dest('./dist/facons/'))

});

gulp.task('svg2png', function() {
  gulp.src('./svgs/**/*.svg')
            .pipe(raster({format: 'png', scale: 0.9}))
            .pipe(rename({extname: '.png', prefix: 'sprites.svg.' }))
            .pipe(gulp.dest('./dist/facons/'))

});