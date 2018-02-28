// tooling
import * as caniuse from 'caniuse-lite';

// return a list of browsers that do not support the feature
export default function getUnsupportedBrowsersByFeature(feature) {
	const caniuseFeature = caniuse.features[feature];

	// if feature support can be determined
	if (caniuseFeature) {
		const stats = caniuse.feature(caniuseFeature).stats;

		// return an array of browsers and versions that do not support the feature
		const results = Object.keys(stats).reduce(
			(browsers, browser) => browsers.concat(
				Object.keys(stats[browser]).filter(
					version => stats[browser][version].indexOf('y') !== 0
				).map(
					version => `${browser} ${version}`
				)
			),
			[]
		);

		return results;
	} else {
		// otherwise, return that the feature does not work in any browser
		return [ '> 0%' ];
	}
}
