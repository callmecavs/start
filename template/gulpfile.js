const autoprefixer = require('autoprefixer')
const babel = require('rollup-plugin-babel')
const browsersync = require('browser-sync').create()
const chalk = require('chalk')
const commonjs = require('rollup-plugin-commonjs')
const csso = require('gulp-csso')
const del = require('del')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const include = require('gulp-file-include')
const mozjpeg = require('imagemin-mozjpeg')
const notifier = require('node-notifier')
const { pipeline } = require('stream')
const postcss = require('gulp-postcss')
const resolve = require('rollup-plugin-node-resolve')
const rollup = require('rollup')
const rucksack = require('rucksack-css')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const { stripIndent } = require('common-tags')
const { terser } = require('rollup-plugin-terser')

// ERROR

const onError = (task, error, done) => {
  if (!error) return

  notifier.notify({
    title: 'Build Error',
    message: `Task: ${ task }`
  })

  const detail = stripIndent`
    ${ chalk.bgRed.white.bold(' Error ') }
    ${ chalk.yellow('Task:') } ${ task } (${ error.plugin })
    ${ chalk.yellow('File:') } ${ error.fileName }
    ${ chalk.yellow('Stack:') }
  `

  console.log(`\n${ detail }\n\n${ error.stack }\n`)

  done()
}

// CLEAN

const clean = () => del('dist')

exports.clean = clean

// HTML

const html = done => pipeline(
  gulp.src('src/html/*.html'),
  include({ prefix: '@', basepath: 'src/' }),
  htmlmin({ collapseWhitespace: true, removeComments: true }),
  gulp.dest('dist'),
  error => onError('HTML', error, done)
)

exports.html = html

// CSS

const processors = [
  rucksack({ inputPseudo: false, quantityQueries: false }),
  autoprefixer()
]

const css = () => gulp.src('src/sass/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss(processors))
  .pipe(csso())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('dist'))

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

// IMAGES

const plugins = [
  imagemin.gifsicle({ interlaced: true }),
  imagemin.optipng(),
  imagemin.svgo(),
  mozjpeg({ quality: 75 })
]

const images = () => gulp.src('src/images/**/*.{gif,jpg,png,svg}')
  .pipe(imagemin(plugins))
  .pipe(gulp.dest('dist/images'))

exports.images = images

// FAVICON

const favicon = () => gulp.src('src/favicon.ico', { allowEmpty: true })
  .pipe(gulp.dest('dist'))

exports.favicon = favicon

// FONTS

const fonts = () => gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))

exports.fonts = fonts

// VIDEOS

const videos = () => gulp.src('src/videos/**/*')
  .pipe(gulp.dest('dist/videos'))

exports.videos = videos

// SERVER & RELOAD

const options = {
  notify: false,
  server: {
    baseDir: './dist'
  }
}

const reload = done => {
  browsersync.reload()
  done()
}

const server = done => {
  browsersync.init(options)
  done()
}

exports.reload = reload
exports.server = server

// WATCH

const watch = done => {
  gulp.watch('src/html/**/*.html', gulp.series(html, reload))
  gulp.watch('src/sass/**/*.scss', gulp.series(css, reload))
  gulp.watch('src/js/**/*.js', gulp.series(js, reload))
  gulp.watch('src/images/**/*.{gif,jpg,png,svg}', gulp.series(images, reload))
  done()
}

exports.watch = watch

// DEV

const dev = gulp.series(
  clean,
  gulp.parallel(
    html,
    css,
    js,
    images,
    favicon,
    fonts,
    videos,
    server,
    watch
  )
)

exports.dev = dev

// PROD

const prod = gulp.series(
  clean,
  gulp.parallel(
    html,
    css,
    js,
    images,
    favicon,
    fonts,
    videos
  )
)

exports.prod = prod

// DEFAULT
// aliased to dev

exports.default = dev
