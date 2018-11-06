/* eslint max-params: ["error", 4] */

import fs from 'fs';
import path from 'path';

/* Write Exports to CSS File
/* ========================================================================== */

function getCustomMediaAsCss(customMedia) {
	const cssContent = Object.keys(customMedia).reduce((cssLines, name) => {
		cssLines.push(`@custom-media ${name} ${customMedia[name]};`);

		return cssLines;
	}, []).join('\n');
	const css = `${cssContent}\n`;

	return css;
}

function getCustomPropertiesAsCss(customProperties) {
	const cssContent = Object.keys(customProperties).reduce((cssLines, name) => {
		cssLines.push(`\t${name}: ${customProperties[name]};`);

		return cssLines;
	}, []).join('\n');
	const css = `:root {\n${cssContent}\n}\n`;

	return css;
}

function getCustomSelectorsAsCss(customSelectors) {
	const cssContent = Object.keys(customSelectors).reduce((cssLines, name) => {
		cssLines.push(`@custom-selector ${name} ${customSelectors[name]};`);

		return cssLines;
	}, []).join('\n');
	const css = `${cssContent}\n`;

	return css;
}

async function writeExportsToCssFile(to, customMedia, customProperties, customSelectors) {
	const customPropertiesAsCss = getCustomPropertiesAsCss(customProperties);
	const customMediaAsCss = getCustomMediaAsCss(customMedia);
	const customSelectorsAsCss = getCustomSelectorsAsCss(customSelectors);
	const css = `${customMediaAsCss}\n${customSelectorsAsCss}\n${customPropertiesAsCss}`;

	await writeFile(to, css);
}

/* Write Exports to JSON file
/* ========================================================================== */

async function writeExportsToJsonFile(to, customMedia, customProperties, customSelectors) {
	const jsonContent = JSON.stringify({
		'custom-media': customMedia,
		'custom-properties': customProperties,
		'custom-selectors': customSelectors
	}, null, '  ');
	const json = `${jsonContent}\n`;

	await writeFile(to, json);
}

/* Write Exports to Common JS file
/* ========================================================================== */

function getObjectWithKeyAsCjs(key, object) {
	const jsContents = Object.keys(object).reduce((jsLines, name) => {
		jsLines.push(`\t\t'${escapeForJS(name)}': '${escapeForJS(object[name])}'`);

		return jsLines;
	}, []).join(',\n');
	const cjs = `\n\t${key}: {\n${jsContents}\n\t}`;

	return cjs;
}

async function writeExportsToCjsFile(to, customMedia, customProperties, customSelectors) {
	const customMediaAsCjs = getObjectWithKeyAsCjs('customMedia', customMedia);
	const customPropertiesAsCjs = getObjectWithKeyAsCjs('customProperties', customProperties);
	const customSelectorsAsCjs = getObjectWithKeyAsCjs('customSelectors', customSelectors);
	const cjs = `module.exports = {${customMediaAsCjs},${customPropertiesAsCjs},${customSelectorsAsCjs}\n};\n`;

	await writeFile(to, cjs);
}

/* Write Exports to Module JS file
/* ========================================================================== */

function getObjectWithKeyAsMjs(key, object) {
	const mjsContents = Object.keys(object).reduce((mjsLines, name) => {
		mjsLines.push(`\t'${escapeForJS(name)}': '${escapeForJS(object[name])}'`);

		return mjsLines;
	}, []).join(',\n');
	const mjs = `export const ${key} = {\n${mjsContents}\n};\n`;

	return mjs;
}

async function writeExportsToMjsFile(to, customMedia, customProperties, customSelectors) {
	const customMediaAsMjs = getObjectWithKeyAsMjs('customMedia', customMedia);
	const customPropertiesAsMjs = getObjectWithKeyAsMjs('customProperties', customProperties);
	const customSelectorsAsMjs = getObjectWithKeyAsMjs('customSelectors', customSelectors);
	const mjs = `${customMediaAsMjs}\n${customPropertiesAsMjs}\n${customSelectorsAsMjs}`;

	await writeFile(to, mjs);
}

/* Write Exports to Exports
/* ========================================================================== */

export default function writeToExports(customExports, destinations) {
	return Promise.all([].concat(destinations).map(async destination => {
		if (destination instanceof Function) {
			await destination({
				customMedia: getObjectWithStringifiedKeys(customExports.customMedia),
				customProperties: getObjectWithStringifiedKeys(customExports.customProperties),
				customSelectors: getObjectWithStringifiedKeys(customExports.customSelectors)
			});
		} else {
			// read the destination as an object
			const opts = destination === Object(destination) ? destination : { to: String(destination) };

			// transformer for Exports into a JSON-compatible object
			const toJSON = opts.toJSON || getObjectWithStringifiedKeys;

			if ('customMedia' in opts || 'customProperties' in opts || 'customSelectors' in opts) {
				// write directly to an object as customProperties
				opts.customMedia = toJSON(customExports.customMedia);
				opts.customProperties = toJSON(customExports.customProperties);
				opts.customSelectors = toJSON(customExports.customSelectors);
			} else if ('custom-media' in opts || 'custom-properties' in opts || 'custom-selectors' in opts) {
				// write directly to an object as custom-properties
				opts['custom-media'] = toJSON(customExports.customMedia);
				opts['custom-properties'] = toJSON(customExports.customProperties);
				opts['custom-selectors'] = toJSON(customExports.customSelectors);
			} else {
				// destination pathname
				const to = String(opts.to || '');

				// type of file being written to
				const type = (opts.type || path.extname(opts.to).slice(1)).toLowerCase();

				// transformed Exports
				const customMediaJSON = toJSON(customExports.customMedia);
				const customPropertiesJSON = toJSON(customExports.customProperties);
				const customSelectorsJSON = toJSON(customExports.customSelectors);

				if (type === 'css') {
					await writeExportsToCssFile(to, customMediaJSON, customPropertiesJSON, customSelectorsJSON);
				}

				if (type === 'js') {
					await writeExportsToCjsFile(to, customMediaJSON, customPropertiesJSON, customSelectorsJSON);
				}

				if (type === 'json') {
					await writeExportsToJsonFile(to, customMediaJSON, customPropertiesJSON, customSelectorsJSON);
				}

				if (type === 'mjs') {
					await writeExportsToMjsFile(to, customMediaJSON, customPropertiesJSON, customSelectorsJSON);
				}
			}
		}
	}));
}

/* Helper utilities
/* ========================================================================== */

function getObjectWithStringifiedKeys(object) {
	return Object.keys(object).reduce((objectJSON, key) => {
		objectJSON[key] = String(object[key]);

		return objectJSON;
	}, {});
}

function writeFile(to, text) {
	return new Promise((resolve, reject) => {
		fs.writeFile(to, text, error => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}

function escapeForJS(string) {
	return string.replace(/\\([\s\S])|(')/g, '\\$1$2').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
