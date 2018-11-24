import babel from 'rollup-plugin-babel';

export default {
	input: 'src/postcss.js',
	output: [
		{ file: 'index.js', format: 'cjs', sourcemap: true },
		{ file: 'index.mjs', format: 'esm', sourcemap: true }
	],
	plugins: [
		babel({
			presets: [
				['@babel/env', { targets: { node: 6 } }]
			]
		})
	]
};
