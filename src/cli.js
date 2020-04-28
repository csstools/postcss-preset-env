import fs from 'fs';
import plugin from './postcss';

if (process.argv.length < 3) {
	console.log([
		'PostCSS Preset Env\n',
		'  Transforms Modern CSS\n',
		'Usage:\n',
		'  postcss-preset-env source.css transformed.css',
		'  postcss-preset-env --in=source.css --out=transformed.css --opts={}',
		'  echo "/* a bunch of css */" | focus-within\n'
	].join('\n'));
	process.exit(0);
}

// get process and plugin options from the command line
const fileRegExp = /^[\w/.]+$/;
const argRegExp = /^--(\w+)=("|')?(.+)\2$/;
const relaxedJsonPropRegExp = /(['"])?([a-z0-9A-Z_]+)(['"])?:/g;
const relaxedJsonValueRegExp = /("[a-z0-9A-Z_]+":\s*)(?!true|false|null|\d+)'?([A-z0-9]+)'?([,}])/g;
const argo = process.argv.slice(2).reduce(
	(object, arg) => {
		const argMatch = arg.match(argRegExp);
		const fileMatch = arg.match(fileRegExp);

		if (argMatch) {
			object[argMatch[1]] = argMatch[3];
		} else if (fileMatch) {
			if (object.from === '<stdin>') {
				object.from = arg;
			} else if (object.to === '<stdout>') {
				object.to = arg;
			}
		}

		return object;
	},
	{ from: '<stdin>', to: '<stdout>', opts: 'null' }
);

// get css from command line arguments or stdin
(argo.from === '<stdin>' ? getStdin() : readFile(argo.from))
.then(css => {
	const pluginOpts = JSON.parse(
		argo.opts
		.replace(relaxedJsonPropRegExp, '"$2": ')
		.replace(relaxedJsonValueRegExp, '$1"$2"$3')
	);
	const processOptions = Object.assign({ from: argo.from, to: argo.to || argo.from }, argo.map ? { map: JSON.parse(argo.map) } : {});

	const result = plugin.process(css, processOptions, pluginOpts);

	if (argo.to === '<stdout>') {
		return result.css;
	} else {
		return writeFile(argo.to, result.css).then(
			() => `CSS was written to "${argo.to}"`
		)
	}
}).then(
	result => {
		console.log(result);

		process.exit(0);
	},
	error => {
		console.error(error);

		process.exit(1);
	}
);

function readFile(pathname) {
	return new Promise((resolve, reject) => {
		fs.readFile(pathname, 'utf8', (error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	});
}

function writeFile(pathname, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(pathname, data, (error, content) => {
			if (error) {
				reject(error);
			} else {
				resolve(content);
			}
		});
	});
}

function getStdin() {
	return new Promise(resolve => {
		let data = '';

		if (process.stdin.isTTY) {
			resolve(data);
		} else {
			process.stdin.setEncoding('utf8');

			process.stdin.on('readable', () => {
				let chunk;

				// eslint-disable-next-line no-cond-assign
				while (chunk = process.stdin.read()) {
					data += chunk;
				}
			});

			process.stdin.on('end', () => {
				resolve(data);
			});
		}
	});
}
