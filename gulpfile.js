const gulp = require('gulp');
const pump = require('pump');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const devOutput = { name: 'router.min.js', path: './src' },
      buildOutput = { name: 'index.js', path: './' };

gulp.task('dev', cb => {
  pump([
    gulp.src('./src/router.js'),
    babel({ presets: ['@babel/env'] }),
    uglify(),
    rename(devOutput.name),
    gulp.dest(devOutput.path)
  ], cb)
});

gulp.task('build', cb => {
  pump([
    gulp.src('./src/router.js'),
    babel({ presets: ['@babel/env'] }),
    uglify(),
    rename(buildOutput.name),
    gulp.dest(buildOutput.path)
  ], cb)
});