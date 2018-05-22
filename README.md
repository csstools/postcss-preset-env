# PostCSS Preset Env [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][PostCSS]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Windows Build Status][win-img]][win-url]
[![Support Chat][git-img]][git-url]

[PostCSS Preset Env] lets you convert modern CSS into something most browsers
can understand, determining the polyfills you need based on your targeted
browsers or runtime environments.

```sh
npm install postcss-preset-env
```

```pcss
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

Without any configuration options, [PostCSS Preset Env] enables **Stage 2**
features and supports **all** browsers.

[![Transform with Preset Env][readme-transform-with-preset-env-img]][readme-transform-with-preset-env-url]
[![Style with Preset Env][readme-style-with-preset-env-img]][readme-style-with-preset-env-url]

## Usage

Add [PostCSS Preset Env] to your build tool:

```bash
npm install postcss-preset-env --save-dev
```

#### Node

Use [PostCSS Preset Env] to process your CSS:

```js
import postcssPresetEnv from 'postcss-preset-env';

postcssPresetEnv.process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Use [PostCSS Preset Env] as a plugin:

```js
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';

postcss([
  postcssPresetEnv(/* options */)
]).process(YOUR_CSS);
```

#### Webpack

Add [PostCSS Loader] to your build tool:

```bash
npm install postcss-loader --save-dev
```

Use [PostCSS Preset Env] in your Webpack configuration:

```js
import postcssPresetEnv from 'postcss-preset-env';

export default {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: () => [
              postcssPresetEnv(/* options */)
            ]
          } }
        ]
      }
    ]
  }
}
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Use [PostCSS Preset Env] in your Gulpfile:

```js
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';

gulp.task('css', () => gulp.src('./src/*.css').pipe(
  postcss([
    postcssPresetEnv(/* options */)
  ])
).pipe(
  gulp.dest('.')
));
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Use [PostCSS Preset Env] in your Gruntfile:

```js
import postcssPresetEnv from 'postcss-preset-env';

grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
       postcssPresetEnv(/* options */)
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

The `stage` option determines which CSS features to polyfill, based upon their
stability in the process of becoming implemented web standards. The stages are
0 through 4.

```js
postcssPresetEnv({
  stage: 0
})
```

Setting the `stage` option to `false` will disable all of the polyfills. Doing
this would only be useful if you intended to exclusively use the
[`features`](#features) option.

Without any configuration options, [PostCSS Preset Env] enables **Stage 2**
features.

### features

The `features` option enables or disables specific polyfills. Passing `true` to
a specific feature id will enable its polyfill, while passing `false` will
disable it.

```js
postcssPresetEnv({
  stage: 3,
  features: [ 'nesting-rules' ]
})
```

Passing an object `{}` to a specific feature id will enable and
configure it.

```js
postcssPresetEnv({
  'color-mod-function': {
    unresolved: 'warn'
  }
})
```

Any polyfills not explicitly enabled or disabled through `features` are
determined by the [`stage`](#stage) option.

### browsers

The `browsers` option determines which browsers are being supported, which is
used to further enable or disable polyfills, based upon their support matrix
found at [caniuse].

[PostCSS Preset Env] supports any standard [browserslist] configuration, which
includes a `.browserslistrc` file, a `browserslist` key in `package.json`, or
`browserslist` environment variables.

The `browsers` option should only be used when a standard browserslist
configuration is not available.

```js
postcssPresetEnv({
  browsers: 'last 2 versions'
})
```

If not valid browserslist configuration is specified, the
[default browserslist query](https://github.com/browserslist/browserslist#queries)
will be used.

### insertBefore / insertAfter

The `insertBefore` and `insertAfter` keys allow you to insert other PostCSS
plugins into the chain. This is only useful if you are also using sugary
PostCSS plugins that must execute before or after certain polyfills.
Both `insertBefore` and `insertAfter` support chaining one or multiple plugins.

```js
import postcssSimpleVars from 'postcss-simple-vars';

postcssPresetEnv({
  insertBefore: {
    'all-property': postcssSimpleVars
  }
})
```

### autoprefixer

The `autoprefixer` option passes
[additional options](https://github.com/postcss/autoprefixer#options)
into [autoprefixer].

[cli-img]: https://img.shields.io/travis/csstools/postcss-preset-env.svg
[cli-url]: https://travis-ci.org/csstools/postcss-preset-env
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-preset-env.svg
[npm-url]: https://www.npmjs.com/package/postcss-preset-env
[win-img]: https://img.shields.io/appveyor/ci/jonathantneal/postcss-preset-env.svg
[win-url]: https://ci.appveyor.com/project/jonathantneal/postcss-preset-env

[autoprefixer]: https://github.com/postcss/autoprefixer
[browserslist]: https://github.com/browserslist/browserslist#readme
[caniuse]: https://caniuse.com/
[cssdb]: https://cssdb.org/
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Preset Env]: https://github.com/csstools/postcss-preset-env
[PostCSS Loader]: https://github.com/postcss/postcss-loader
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[readme-style-with-preset-env-img]: https://csstools.github.io/postcss-preset-env/readme-style-with-preset-env.svg
[readme-style-with-preset-env-url]: https://codepen.io/pen?template=OZRovK
[readme-transform-with-preset-env-img]: https://csstools.github.io/postcss-preset-env/readme-transform-with-preset-env.svg
[readme-transform-with-preset-env-url]: https://csstools.github.io/postcss-preset-env/
