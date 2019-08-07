const {
  dest,
  parallel,
  src
} = require('gulp')

const autoprefixer = require('autoprefixer')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const csso = require('gulp-csso')
const htmlmin = require('gulp-htmlmin')
const include = require('gulp-file-include')
const postcss = require('gulp-postcss')
const resolve = require('rollup-plugin-node-resolve')
const rollup = require('rollup')
const rucksack = require('rucksack-css')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const { terser } = require('rollup-plugin-terser')

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

// JS

const read = {
  input: 'src/js/main.js',
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    babel({ exclude: 'node_modules/**' }),
    terser()
  ]
}

const write = {
  file: 'dist/bundle.js',
  format: 'iife',
  output: {
    name: 'bundle'
  },
  sourcemap: true
}

const js = async () => {
  const bundle = await rollup.rollup(read)
  await bundle.write(write)
}

exports.js = js

// DEFAULT

exports.default = parallel(
  html,
  css,
  js
)
