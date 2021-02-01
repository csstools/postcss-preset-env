# Installing PostCSS Preset Env

[PostCSS Preset Env] runs in all Node environments, with special instructions for:

| [Node](#node) | [PostCSS CLI](#postcss-cli) | [Webpack](#webpack) | [Create React App](#create-react-app) | [Gulp](#gulp) | [Grunt](#grunt) | [Rollup](#rollup) |
| --- | --- | --- | --- | --- | --- | --- |

## Node

Add [PostCSS Preset Env] to your project:

```bash
npm install postcss-preset-env --save-dev
```

Use [PostCSS Preset Env] to process your CSS:

```js
const postcssPresetEnv = require('postcss-preset-env');

postcssPresetEnv.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');

postcss([
  postcssPresetEnv(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

## PostCSS CLI

Add [PostCSS CLI] to your project:

```bash
npm install postcss-cli --save-dev
```

Use [PostCSS Preset Env] in your `postcss.config.js` configuration file:

```js
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv(/* pluginOptions */)
  ]
}
```

## Webpack

Add [PostCSS Loader] to your project:

```bash
npm install postcss-loader --save-dev
```

Use [PostCSS Preset Env] in your Webpack configuration:

```js
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv(/* pluginOptions */)],
              },
            },
          },
        ],
      },
    ],
  },
};
```

## Create React App

**PostCSS Preset Env is already bundled with Create React App 2.**

For Create React App 1, add [React App Rewired] and [React App Rewire PostCSS]
to your project:

```bash
npm install react-app-rewired react-app-rewire-postcss --save-dev
```

Use [React App Rewire PostCSS] and [PostCSS Preset Env] in your
`config-overrides.js` file:

```js
const reactAppRewirePostcss = require('react-app-rewire-postcss');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = config => reactAppRewirePostcss(config, {
  plugins: () => [
    postcssPresetEnv(/* pluginOptions */)
  ]
});
```

## Gulp

Add [Gulp PostCSS] to your project:

```bash
npm install gulp-postcss --save-dev
```

Use [PostCSS Preset Env] in your Gulpfile:

```js
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');

gulp.task('css', () => gulp.src('./src/*.css').pipe(
  postcss([
    postcssPresetEnv(/* pluginOptions */)
  ])
).pipe(
  gulp.dest('.')
));
```

## Grunt

Add [Grunt PostCSS] to your project:

```bash
npm install grunt-postcss --save-dev
```

Use [PostCSS Preset Env] in your Gruntfile:

```js
const postcssPresetEnv = require('postcss-preset-env');

grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      processors: [
       postcssPresetEnv(/* pluginOptions */)
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

## Rollup

Complete [PostCSS CLI](#postcss-cli) setup.

Add [Rollup Plugin PostCSS] to your project:

```bash
npm install rollup-plugin-postcss --save-dev
```

Use [Rollup Plugin PostCSS] in your rollup.config.js:

```js
import postcss from 'rollup-plugin-postcss';

module.exports = {
  input: '...',
  output: {...},
  plugins: [
    postcss({/* options */ })
  ]
};
```

[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS CLI]: https://github.com/postcss/postcss-cli
[PostCSS Loader]: https://github.com/postcss/postcss-loader
[PostCSS Preset Env]: https://github.com/csstools/postcss-preset-env
[React App Rewire PostCSS]: https://github.com/csstools/react-app-rewire-postcss
[React App Rewired]: https://github.com/timarney/react-app-rewired
[Rollup Plugin PostCSS]: https://github.com/egoist/rollup-plugin-postcss
