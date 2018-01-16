// tooling
import browserslist from 'browserslist';
import cssdb from 'cssdb';
import postcss from 'postcss';
import plugins from './lib/plugins-by-specification-id';
import getTransformedInsertions from './lib/get-transformed-insertions';
import getUnsupportedBrowsersByFeature from './lib/get-unsupported-browsers-by-feature';
import specificationIdsByExecutionOrder from './lib/specification-ids-by-execution-order';

// plugin
export default postcss.plugin('postcss-preset-env', opts => {
	// initialize options
	const features = Object(Object(opts).features);
	const insertBefore = Object(Object(opts).insertBefore);
	const insertAfter = Object(Object(opts).insertAfter);
	const browsers = Object(opts).browsers;
	const stage = 'stage' in Object(opts)
		? opts.stage === false
			? 6
		: parseInt(opts.stage) || 0
	: 3;

	// polyfillable features (those with an available postcss plugin)
	const polyfillableFeatures = cssdb.concat(
		// additional features to be inserted before cssdb features
		getTransformedInsertions(insertBefore, 'insertBefore'),
		// additional features to be inserted after cssdb features
		getTransformedInsertions(insertAfter, 'insertAfter')
	).filter(
		// inserted features or features with an available postcss plugin
		feature => feature.insertBefore || feature.specificationId in plugins
	).sort(
		// features sorted by execution order and then insertion order
		(a, b) => specificationIdsByExecutionOrder.indexOf(a.specificationId) - specificationIdsByExecutionOrder.indexOf(b.specificationId) || (a.insertBefore ? -1 : b.insertBefore ? 1 : 0) || (a.insertAfter ? 1 : b.insertAfter ? -1 : 0)
	).map(
		// polyfillable features as an object
		feature => {
			// target browsers for the polyfill
			const unsupportedBrowsers = getUnsupportedBrowsersByFeature(feature.caniuse);

			return feature.insertBefore || feature.insertAfter ? {
				browsers:        unsupportedBrowsers,
				plugin:          feature.plugin,
				specificationId: `${feature.insertBefore ? 'before' : 'after'}-${feature.specificationId}`,
				stage:           6
			} : {
				browsers:        unsupportedBrowsers,
				plugin:          plugins[feature.specificationId],
				specificationId: feature.specificationId,
				stage:           feature.stage
			};
		}
	);

	// staged features (those at or above the selected stage)
	const stagedFeatures = polyfillableFeatures.filter(
		feature => feature.specificationId in features
			? features[feature.specificationId]
		: feature.stage >= stage
	).map(
		feature => ({
			browsers: feature.browsers,
			plugin: typeof feature.plugin.process === 'function'
				? features[feature.specificationId] === true
					? feature.plugin()
				: feature.plugin(features[feature.specificationId])
			: feature.plugin,
			specificationId: feature.specificationId
		})
	);

	return (root, result) => {
		// browsers supported by the configuration
		const supportedBrowsers = browserslist(browsers, {
			path: result.root.source && result.root.source.input && result.root.source.input.file
		});

		// features supported by the stage and browsers
		const supportedFeatures = stagedFeatures.filter(
			feature => supportedBrowsers.some(
				supportedBrowser => browserslist(feature.browsers).some(
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
		);

		return polyfills;
	};
});
