const {
  dest,
  src
} = require('gulp')

const htmlmin = require('gulp-htmlmin')
const include = require('gulp-file-include')

// HTML

const html = () => src('src/html/*.html')
  .pipe(include({ prefix: '@', basepath: 'src/' }))
  .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
  .pipe(dest('dist'))

exports.html = html

// Sass
