import autoprefixer from 'autoprefixer'
import browserslist from 'browserslist';
import cssdb from 'cssdb';
import postcss from 'postcss';
import plugins from './lib/plugins-by-id';
import getTransformedInsertions from './lib/get-transformed-insertions';
import getUnsupportedBrowsersByFeature from './lib/get-unsupported-browsers-by-feature';
import idsByExecutionOrder from './lib/ids-by-execution-order';

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
	const autoprefixerOptions = Object(opts).autoprefixerOptions

	const stagedAutoprefixer = autoprefixer(Object.assign({ browsers }, autoprefixerOptions));

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
					? feature.plugin()
				: feature.plugin(features[feature.id])
			: feature.plugin,
			id: feature.id
		})
	);

	return (root, result) => {
		// browsers supported by the configuration
		const supportedBrowsers = browserslist(browsers, {
			path: result.root.source && result.root.source.input && result.root.source.input.file,
			ignoreUnknownVersions: true
		});

		// features supported by the stage and browsers
		const supportedFeatures = stagedFeatures.filter(
			feature => supportedBrowsers.some(
				supportedBrowser => browserslist(feature.browsers, {
					ignoreUnknownVersions: true
				}).some(
					polyfillBrowser => polyfillBrowser === supportedBrowser
				)
			)
		);

		// polyfills run in execution order
		const polyfills = supportedFeatures.reduce(
			(promise, feature) => promise.then(
				() => feature.plugin(result.root, result)
			),
			Promise.resolve()
		).then(
			() => stagedAutoprefixer(result.root, result)
		);

		return polyfills;
	};
});
