const postcss = require('postcss');
const plugin = require('..');

// prepare a cache for <style> text with an incrementing id
const css = {};
let uuids = 0;

// prepare the default plugin options
const defaultOptions = { stage: 0 };

// transform <style> source with a plugin
const transformStyleElement = $style => {
	// prepare a unique <style> identifier
	if (!$style.hasAttribute('data-pcss')) {
		$style.setAttribute('data-pcss', `pcss-${++uuids}`);
	}

	const from = $style.getAttribute('data-pcss');

	// prepare the plugin options
	let pluginOptions;

	try {
		pluginOptions = JSON.parse($style.getAttribute('data-pcss-options'));
	} catch (error) {
		/* do nothing */
	}

	pluginOptions = pluginOptions || defaultOptions;

	// prepare the <style> source
	const source = $style.textContent;
	css[from] = from in css ? css[from] : source;

	// transform the source
	postcss([ plugin(pluginOptions) ]).process(source, { from })
	// replace the <style> source with the transformed result
	.then(
		result => {
			if (css[from] !== result.css) {
				$style.textContent = css[from] = result.css;
			}
		},
		// otherwise, use a fallback and log the error
		error => {
			console.error(error);
		}
	);
}

// transform <style> elements in the <head>
const $styles = document.head.getElementsByTagName('style');

Array.prototype.forEach.call($styles, transformStyleElement);

// watch for and transform new <style> elements in <head>
(new MutationObserver(
	mutations => mutations.forEach(
		mutation => Array.prototype.filter.call(
			mutation.addedNodes || [],
			$node => $node.nodeName === 'STYLE'
		).forEach(transformStyleElement)
	)
)).observe(document.documentElement, { childList: true, subtree: true });
