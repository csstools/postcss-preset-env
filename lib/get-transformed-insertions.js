// return a list of features to be inserted before or after cssdb features
export default function getTransformedInsertions(insertions, placement) {
	return Object.keys(insertions).map(
		specificationId => [].concat(insertions[specificationId]).map(
			plugin => ({
				[placement]: true,
				plugin,
				specificationId
			})
		)
	).reduce(
		(array, feature) => array.concat(feature), []
	);
}
