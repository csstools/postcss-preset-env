import babel from 'rollup-plugin-babel';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import nodeGlobals from 'rollup-plugin-node-globals';

export default {
	input: 'codepen.js',
	output: [
		{ file: 'codepen.bundle6.js', format: 'cjs', sourcemap: 'inline' }
	],
	plugins: [
		nodeGlobals(),
		nodeBuiltins(),
		babel({
			runtimeHelpers: false,
			externalHelpers: false,
			plugins: [
				'@babel/syntax-dynamic-import'
			],
			presets: [
				[
					'@babel/preset-env'
				]
			]
		})
	]
};
