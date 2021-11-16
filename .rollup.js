import pkg from './package.json'

export default {
	...pkg.rollup,
	plugins: pkg.rollup.plugins.map(plugin => require(plugin)()),
	onwarn(warning, warn) {
		if (warning.code !== 'UNRESOLVED_IMPORT') warn(warning)
	}
}
