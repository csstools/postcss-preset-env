import babel from 'rollup-plugin-babel';

export default {
	input: 'index.js',
	output: [
		{ file: 'index.cjs.js', format: 'cjs' },
		{ file: 'index.esm.mjs', format: 'esm' }
	],
	plugins: [
		babel({
			presets: [
				['@babel/env', { targets: { node: 6 } }]
			]
		})
	]
};
