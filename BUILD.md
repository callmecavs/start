# Browser Support

Note that Outset **doesn't detect browsers or their features** out of the box.

Adjust the provided [`.browserslistrc`](https://github.com/callmecavs/outset/blob/master/template/.browserslistrc) file to prefix your CSS and polyfill JS features based on your target environment(s).

# HTML

Simply an `index.html` file.

```html
<!DOCTYPE html>

<html lang="en-US">
  <head>
    <title></title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="style.css">
  </head>
  <body>

    <script src="bundle.js"></script>
  </body>
</html>
```

## Inline SVGs

You can inline SVGs in your HTML using the following syntax:

```html
@include("path/to/image.svg")
```

The inlined SVG has already run through the Gulp images task, and the path is relative to the `dist/images` folder.

# Sass

A minimal set of partials.

```
sass/
├── _base.scss                // global font and container styles
├── _mixins.scss              // mixins - clearfix, flex, @font-face, image replacement, min-width media query
├── _reset.scss               // custom, minimal reset
├── _vars.scss                // central variable file
├── _z-index.scss             // central z-index file
└── style.scss                // all @imports
```

# JS

Just an entry point to build around. No libraries!

Outset **supports ES6/7** syntax via [Babel.js](https://babeljs.io/), and **bundles modules (the futuristic, tree-shaking way)** via [Rollup](https://github.com/rollup/rollup).

# Gulp

Never refresh again!

Tasks:

* HTML - inline SVGs, minify
* Sass - compile, autoprefix, minify, sourcemaps
* JS - transpile, bundle, minify, sourcemaps
* Images - minify
* Fonts, Videos, Favicon - move to deployment folder
* Server - auto refresh, serve sourcemaps
* Watch

Error Handling:

* No more broken pipes! `gulp-plumber` catches all errors.
* Error handler emits native system notification and logs to terminal.
