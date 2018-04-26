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

Without any configuration options, [PostCSS Preset Env] enables **Stage 3**
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

The `stage` key determines which CSS features to polyfill, based upon their
position in the process of becoming implemented web standards found at [cssdb].
The stages are 0 through 5. You can specify `false` to ignore all stages and
rely on [features](#features) exclusively.

```js
postcssPresetEnv({
  stage: 0
})
```

### features

The `features` key determines which CSS features to polyfill based upon their
unique id found at [cssdb]. Pass `true` to enable a feature, and pass `false`
to disable a feature. Pass an object `{}` to configure options of an individual
polyfill. Any features not explicitly toggled here will be determined by
[stage](#stage).

```js
postcssPresetEnv({
  stage: false,
  features: [ 'css-nesting' ]
})
```

### browsers

The `browsers` key determines the browsers to support, which will enable or
disable polyfills based upon their support matrix found at [caniuse].
By default, [PostCSS Preset Env] will inherit any existing browserslist config,
.browserslistrc config, browserslist section in package.json, or browserslist
environment variables.

```js
postcssPresetEnv({
  browsers: 'last 2 versions'
})
```

### insertBefore / insertAfter

The `insertBefore` and `insertAfter` keys allow you to insert other PostCSS
plugins along the chain. This is highly valuable if you are also using sugary
PostCSS plugins that must execute between plugins within [PostCSS Preset Env].
Both `insertBefore` and `insertAfter` support chaining one or multiple plugins.

```js
import postcssSimpleVars from 'postcss-simple-vars';

postcssPresetEnv({
  insertBefore: {
    'css-color-modifying-colors': postcssSimpleVars
  }
})
```

[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-preset-env.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-preset-env
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-preset-env.svg
[npm-url]: https://www.npmjs.com/package/postcss-preset-env
[win-img]: https://img.shields.io/appveyor/ci/jonathantneal/postcss-preset-env.svg
[win-url]: https://ci.appveyor.com/project/jonathantneal/postcss-preset-env

[caniuse]: https://caniuse.com/
[cssdb]: https://jonathantneal.github.io/css-db/
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Preset Env]: https://github.com/jonathantneal/postcss-preset-env
[PostCSS Loader]: https://github.com/postcss/postcss-loader
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[readme-style-with-preset-env-img]: https://jonathantneal.github.io/postcss-preset-env/readme-style-with-preset-env.svg
[readme-style-with-preset-env-url]: https://codepen.io/pen?template=OZRovK
[readme-transform-with-preset-env-img]: https://jonathantneal.github.io/postcss-preset-env/readme-transform-with-preset-env.svg
[readme-transform-with-preset-env-url]: https://jonathantneal.github.io/postcss-preset-env/
