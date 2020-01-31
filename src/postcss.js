import autoprefixer from 'autoprefixer'
import browserslist from 'browserslist';
import cssdb from 'cssdb';
import postcss from 'postcss';
import plugins from './lib/plugins-by-id';
import getTransformedInsertions from './lib/get-transformed-insertions';
import getUnsupportedBrowsersByFeature from './lib/get-unsupported-browsers-by-feature';
import idsByExecutionOrder from './lib/ids-by-execution-order';
import writeToExports from './lib/write-to-exports';

export default postcss.plugin('postcss-preset-env', opts => {
	// initialize options
	const features = Object(Object(opts).features);
	const insertBefore = Object(Object(opts).insertBefore);
	const insertAfter = Object(Object(opts).insertAfter);
	const browsers = Object(opts).browsers;
	const stage = 'stage' in Object(opts)
		? opts.stage === false
			? 5
		: parseInt(opts.stage) || 0
	: 2;
	const autoprefixerOptions = Object(opts).autoprefixer;
	const sharedOpts = initializeSharedOpts(Object(opts));
	const stagedAutoprefixer = autoprefixerOptions === false
		? () => {}
	: autoprefixer(Object.assign({ overrideBrowserslist: browsers }, autoprefixerOptions));

	// polyfillable features (those with an available postcss plugin)
	const polyfillableFeatures = cssdb.concat(
		// additional features to be inserted before cssdb features
		getTransformedInsertions(insertBefore, 'insertBefore'),
		// additional features to be inserted after cssdb features
		getTransformedInsertions(insertAfter, 'insertAfter')
	).filter(
		// inserted features or features with an available postcss plugin
		feature => feature.insertBefore || feature.id in plugins
	).sort(
		// features sorted by execution order and then insertion order
		(a, b) => idsByExecutionOrder.indexOf(a.id) - idsByExecutionOrder.indexOf(b.id) || (a.insertBefore ? -1 : b.insertBefore ? 1 : 0) || (a.insertAfter ? 1 : b.insertAfter ? -1 : 0)
	).map(
		// polyfillable features as an object
		feature => {
			// target browsers for the polyfill
			const unsupportedBrowsers = getUnsupportedBrowsersByFeature(feature.caniuse);

			return feature.insertBefore || feature.insertAfter ? {
				browsers: unsupportedBrowsers,
				plugin:   feature.plugin,
				id:       `${feature.insertBefore ? 'before' : 'after'}-${feature.id}`,
				stage:    6
			} : {
				browsers: unsupportedBrowsers,
				plugin:   plugins[feature.id],
				id:       feature.id,
				stage:    feature.stage
			};
		}
	);

	// staged features (those at or above the selected stage)
	const stagedFeatures = polyfillableFeatures.filter(
		feature => feature.id in features
			? features[feature.id]
		: feature.stage >= stage
	).map(
		feature => ({
			browsers: feature.browsers,
			plugin: typeof feature.plugin.process === 'function'
				? features[feature.id] === true
					? sharedOpts
						// if the plugin is enabled and has shared options
						? feature.plugin(Object.assign({}, sharedOpts))
					// otherwise, if the plugin is enabled
					: feature.plugin()
				: sharedOpts
					// if the plugin has shared options and individual options
					? feature.plugin(Object.assign({}, sharedOpts, features[feature.id]))
				// if the plugin has individual options
				: feature.plugin(Object.assign({}, features[feature.id]))
			// if the plugin is already initialized
			: feature.plugin,
			id: feature.id
		})
	);

	// browsers supported by the configuration
	const supportedBrowsers = browserslist(browsers, { ignoreUnknownVersions: true });

	// features supported by the stage and browsers
	const supportedFeatures = stagedFeatures.filter(
		feature => feature.id in features
			? features[feature.id]
		: supportedBrowsers.some(
			supportedBrowser => browserslist(feature.browsers, {
				ignoreUnknownVersions: true
			}).some(
				polyfillBrowser => polyfillBrowser === supportedBrowser
			)
		)
	);

	return (root, result) => {
		// polyfills run in execution order
		const polyfills = supportedFeatures.reduce(
			(promise, feature) => promise.then(
				() => feature.plugin(result.root, result)
			),
			Promise.resolve()
		).then(
			() => stagedAutoprefixer(result.root, result)
		).then(
			() => {
				if (Object(opts).exportTo) {
					writeToExports(sharedOpts.exportTo, opts.exportTo);
				}
			}
		)

		return polyfills;
	};
});

const initializeSharedOpts = opts => {
	if ('importFrom' in opts || 'exportTo' in opts || 'preserve' in opts) {
		const sharedOpts = {};

		if ('importFrom' in opts) {
			sharedOpts.importFrom = opts.importFrom;
		}

		if ('exportTo' in opts) {
			sharedOpts.exportTo = {
				customMedia: {},
				customProperties: {},
				customSelectors: {},
			};
		}

		if ('preserve' in opts) {
			sharedOpts.preserve = opts.preserve;
		}

		return sharedOpts;
	}

	return false;
};
