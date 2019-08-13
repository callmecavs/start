# outset

[![Outset on NPM](https://img.shields.io/npm/v/outset.svg?style=flat-square)](https://www.npmjs.com/package/outset) [![Outset Downloads on NPM](https://img.shields.io/npm/dm/outset.svg?style=flat-square)](https://www.npmjs.com/package/outset)

A frontend scaffolding tool.

## About

Outset is developed with the intention of being **the solution to writing frontend code instantly**.

The magic happens in the [build](https://github.com/callmecavs/outset/blob/master/template/gulpfile.js), with the actual [boilerplate](https://github.com/callmecavs/outset/tree/master/template/src) being intentionally minimal. A more detailed explanation of both can be found below.

## Usage

In your terminal:

```shell
# using node and npm
# install outset globally

$ npm install outset -g

# use the outset command from the CLI to scaffold a project
# template files are copied to the CWD, unless a path is specified

$ outset [path]
$ npm i
$ npm run dev
```

In your browser:

```shell
http://localhost:3000/
```

Work in the `src` folder, deploy from the `dist` folder.

## Browser Support

Note that Outset **doesn't detect browsers or their features** out of the box.

Adjust the provided [`.browserslistrc`](https://github.com/callmecavs/outset/blob/master/template/.browserslistrc) file to prefix your CSS and polyfill JS features based on your target environment(s).

## License

[MIT](https://opensource.org/licenses/MIT). © 2019 Michael Cavalea

[![Built With Love](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
