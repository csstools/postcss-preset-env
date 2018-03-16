import babel from 'rollup-plugin-babel';

export default {
	input: 'index.js',
	output: [
		{ file: 'index.cjs.js', format: 'cjs' },
		{ file: 'index.es.js', format: 'es' }
	],
	plugins: [
		babel({
			presets: [
				['env', { modules: false, targets: { node: 4 } }]
			]
		})
	]
};
