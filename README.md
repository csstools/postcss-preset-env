# PostCSS Preset Env [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Linux Build Status][cli-img]][cli-url]
[![Windows Build Status][win-img]][win-url]
[![Gitter Chat][git-img]][git-url]

[PostCSS Preset Env] lets you convert modern CSS into something most browsers
can understand, determining the polyfills you need based on your targeted
browsers or runtime environments.

```sh
npm install postcss-preset-env
```

```css
@custom-media --viewport-medium (width <= 50rem);
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

:root {
  --mainColor: #12345678;
}

body {
  color: var(--mainColor);
  font-family: system-ui;
  overflow-wrap: break-word;
}

:--heading {
  background-image: image-set(url(img/heading.png) 1x, url(img/heading@2x.png) 2x);

  @media (--viewport-medium) {
    margin-block: 0;
  }
}

a {
  color: rebeccapurple;

  &:hover {
    color: color-mod(var(--mainColor) alpha(80%));
  }
}

/* becomes */

:root {
  --mainColor: rgba(18, 52, 86, 0.47059);
}

body {
  color: rgba(18, 52, 86, 0.47059);
  color: var(--mainColor);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue;
  word-wrap: break-word;
}

h1, h2, h3, h4, h5, h6 {
  background-image: url(img/heading.png);
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  h1, h2, h3, h4, h5, h6 {
    background-image: url(img/heading@2x.png)
  }
}

@media (max-width: 50rem) {
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0;
  }
}

a {
  color: #639
}

a:hover {
  color: rgba(18, 52, 86, 0.8);
}
```

Without any configuration options, [postcss-preset-env] enables **stage 3**
features and supports all browsers.

## Usage

Add [PostCSS Preset Env] to your build tool:

```sh
npm install postcss-preset-env --save-dev
```

#### Node

Use [PostCSS Preset Env] to process your CSS:

```js
require('postcss-preset-env').process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```sh
npm install postcss --save-dev
```

Use [PostCSS Preset Env] as a plugin:

```js
postcss([
  require('postcss-preset-env')()
]).process(YOUR_CSS);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```sh
npm install gulp-postcss --save-dev
```

Use [PostCSS Preset Env] in your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
  return gulp.src('./src/*.css').pipe(
    postcss([
      require('postcss-preset-env')()
    ])
  ).pipe(
    gulp.dest('.')
  );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```sh
npm install grunt-postcss --save-dev
```

Use [PostCSS Preset Env] in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
        require('postcss-preset-env')()
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

## Options

### stage

The `stage` key determines which CSS features to polyfill, based upon their
position in the process of becoming implemented web standards found at [cssdb].
The stages are 0 through 5. You can specify `false` to ignore all stages and
rely on [features](#features) exclusively.

```js
require('postcss-preset-env')({
  stage: 0
})
```

### features

The `features` key determines which CSS features to polyfill based upon their
unique specification id found at [cssdb]. Pass `true` to enable a feature, and
pass `false` to disable a feature. Pass an object `{}` to configure options of
an individual polyfill. Any features not explicitly toggled here will be
determined by [stage](#stage).

```js
require('postcss-preset-env')({
  stage: false,
  features: [ 'css-nesting' ]
})
```

### browsers

The `browsers` key determines the browsers to support, which will enable or
disable polyfills based upon their support matrix found at [caniuse].
By default, [postcss-preset-env] will inherit any existing browserslist config,
.browserslistrc config, browserslist section in package.json, or browserslist
environment variables.

```js
require('postcss-preset-env')({
  browsers: 'last 2 versions'
})
```

### insertBefore / insertAfter

The `insertBefore` and `insertAfter` keys allow you to insert other PostCSS
plugins along the chain. This is highly valuable if you are also using sugary
PostCSS plugins that must execute between plugins within postcss-preset-env.
Both `insertBefore` and `insertAfter` support chaining one or multiple plugins.

```js
require('postcss-preset-env')({
  insertBefore: {
    'css-color-modifying-colors': require('postcss-simple-vars')
  }
})
```

[npm-url]: https://www.npmjs.com/package/postcss-preset-env
[npm-img]: https://img.shields.io/npm/v/postcss-preset-env.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-preset-env
[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-preset-env.svg
[win-url]: https://ci.appveyor.com/project/jonathantneal/postcss-preset-env
[win-img]: https://img.shields.io/appveyor/ci/jonathantneal/postcss-preset-env.svg
[git-url]: https://gitter.im/postcss/postcss
[git-img]: https://img.shields.io/badge/chat-gitter-blue.svg

[PostCSS Preset Env]: https://github.com/jonathantneal/postcss-preset-env
[PostCSS]: https://github.com/postcss/postcss
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[cssdb]: https://jonathantneal.github.io/css-db/
[caniuse]: https://caniuse.com/
[postcss-preset-env]: https://github.com/jonathantneal/postcss-preset-env/
