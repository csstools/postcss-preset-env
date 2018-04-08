// return a list of features to be inserted before or after cssdb features
export default function getTransformedInsertions(insertions, placement) {
	return Object.keys(insertions).map(
		id => [].concat(insertions[id]).map(
			plugin => ({
				[placement]: true,
				plugin,
				id
			})
		)
	).reduce(
		(array, feature) => array.concat(feature), []
	);
}
