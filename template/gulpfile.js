const {
  dest,
  src
} = require('gulp')

const autoprefixer = require('autoprefixer')
const csso = require('gulp-csso')
const htmlmin = require('gulp-htmlmin')
const include = require('gulp-file-include')
const postcss = require('gulp-postcss')
const rucksack = require('rucksack-css')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')

// HTML

const html = () => src('src/html/*.html')
  .pipe(include({ prefix: '@', basepath: 'src/' }))
  .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
  .pipe(dest('dist'))

exports.html = html

// CSS

const processors = [
  rucksack({ inputPseudo: false, quantityQueries: false }),
  autoprefixer()
]

const css = () => src('src/sass/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss(processors))
  .pipe(csso())
  .pipe(sourcemaps.write('./maps'))
  .pipe(dest('dist'))

exports.css = css
