const browserslist = require('browserslist');
const postcss = require('postcss');
const plugin = require('..');

// prepare a cache for the <style> element and cached <style> text
let $style, expectCSS, sourceCSS;

// prepare the reference to the <pre> result element
let $result;

// prepare the targetted codepen class name
const codepenClass = 'cp-pen-styles';

// prepare the process options
const processOptions = {
	from: codepenClass,
	stringifier: postcssHTMLStringifier
};

// prepare the plugin options with defaults
const pluginOptions = {
	browsers: '> 5%',
	stage: 0,
	features: {
		'custom-selectors': {
			lineBreak: false
		}
	}
};

// transform <style> source with a plugin
function transformCSS () {
	// transform the source
	postcss([ plugin(pluginOptions) ]).process(sourceCSS, processOptions)
	// replace the <style> source with the transformed result
	.then(
		({ css: resultCSS }) => {
			if (resultCSS !== expectCSS) {
				$result.innerHTML = expectCSS = resultCSS;
			}
		},
		// otherwise, use a fallback and log the error
		error => {
			console.error(error);
		}
	)
}

// initialize the dom
function initDOM () {
	// prepare the fragment used to create all of the dom
	const $fragment = document.createDocumentFragment();

	// prepare the form used to contain the options
	const $options = $fragment.appendChild(document.createElement('form'));

	$options.addEventListener('submit', event => {
		event.preventDefault();
	});

	// prepare the "stage" option control
	const $stage = $options.appendChild(document.createElement('select'));

	$stage.setAttribute('aria-label', 'stage');

	$stage.className = 'option-stage';

	[0, 1, 2, 3, 4].forEach(stage => {
		const $option = $stage.appendChild(document.createElement('option'));

		$option.value = stage;

		$option.appendChild(document.createTextNode(`Stage ${stage}`));
	});

	$stage.value = pluginOptions.stage;

	$stage.addEventListener('change', () => {
		pluginOptions.stage = Number($stage.value) || 0;

		transformCSS();
	});

	// prepare the "browsers" option control
	const $browsers = $options.appendChild(document.createElement('input'));

	$browsers.setAttribute('aria-label', 'browser query');

	$browsers.className = 'option-browsers';

	$browsers.value = pluginOptions.browsers;

	$browsers.addEventListener('input', () => {
		// transform CodePen styles when the browserslist validates
		try {
			browserslist($browsers.value);

			pluginOptions.browsers = $browsers.value;

			transformCSS();
		} catch (error) {
			// or do nothing
		}
	});

	// prepare the <pre> result element
	$result = $fragment.appendChild(document.createElement('pre'));

	$result.className = 'css-root';

	// add the fragment to the <body>
	document.body.appendChild($fragment);

	// prepare <style class={codepenClass}>
	$style = document.head.querySelector(`style.${codepenClass}`) || document.head.querySelector('style');

	if ($style) {
		// update sourceCSS with the contents of <style class={codepenClass}>
		sourceCSS = $style.textContent.trim();

		// remove <style class={codepenClass}> from the document
		$style.parentNode.removeChild($style);

		// conditionally hook into CodePen CSSReload to update the CSS
		if (window.CSSReload) {
			window.CSSReload._refreshCSS = ({ css }) => {
				const nextCSS = css.trim();

				if (nextCSS !== sourceCSS) {
					sourceCSS = nextCSS;

					transformCSS();
				}
			};
		}

		transformCSS();
	}
}

// stringify CSS as syntax-highlighted HTML
function postcssHTMLStringifier (root, builder) {
	// stringify a node
	const toString = node => 'atrule' === node.type
		? atruleToString(node)
	: 'rule' === node.type
		? ruleToString(node)
	: 'decl' === node.type
		? declToString(node)
	: 'comment' === node.type
		? commentToString(node)
	: node.nodes
		? node.nodes.map(child => toString(child)).join('')
	: node.toString()

	// stringify an at-rule
	const atruleToString = atrule => `${
		raw(atrule, 'before')
	}<span class=css-atrule><span class=css-atrule-name>@${atrule.name}</span>${
		atrule.raws.afterName || ''
	}<span class=css-atrule-params>${replaceVarsAndFns(atrule.params)}</span>${
		raw(atrule, 'between')
	}${
		atrule.nodes
			? `<span class=css-block>{${
				atrule.nodes.map(node => toString(node)).join('')
			}${
				raw(atrule, 'after')
			}}</span>`
		: semicolon(atrule)
	}</span>`;

	// stringify a rule
	const ruleToString = rule => `${
		raw(rule, 'before')
	}<span class=css-rule><span class=css-selector>${replaceVarsAndSelectors(rule.selector)}</span>${
		raw(rule, 'between')
	}<span class=css-block>{${
		rule.nodes.map(node => toString(node)).join('')
	}${
		raw(rule, 'after')
	}}</span></span>`;

	// stringify a declaration
	const declToString = decl => `${
		decl.raws.before || ''
	}<span class=css-declaration><span class=css-property>${replaceVars(decl.prop)}</span>${
		decl.raws.between || ':'
	}<span class=css-value>${replaceVarsAndFns(decl.value)}</span>${
		semicolon(decl)
	}</span>`;

	// stringify a comment
	const commentToString = comment => `${
		raw(comment, 'before')
	}<span class=css-comment>/*${
		comment.raws.left || ''
	}${comment.text}${
		comment.raws.right || ''
	}*/</span>`;

	// stringify css vars
	const replaceVars = string => string.replace(/:?--[\w-]+/g, '<span class=css-var>$&</span>');

	// stringify css vars and css functions
	const replaceVarsAndFns = string => replaceVars(string)
	.replace(/url\(((['"]?).*?\2)\)/g, 'url(<span class=css-string>$1</span>)')
	.replace(/(:?[\w-]+)\(/g, '<span class=css-function>$1</span>(')
	.replace(/"[^"]+"/g, '<span class=css-string>$&</span>')
	.replace(/([\w-]+):/g, '<span class=css-property>$1</span>:');

	// stringify css vars and css functions
	const replaceVarsAndSelectors = string => replaceVars(string)
	.replace(/(^\s*|[(),]\s*)([\w-]+)/g, '$1<span class=css-tag>$2</span>');

	// conditionally print a semicolon separator
	const semicolon = node => node.raws.semicolon ||
	Object(node.parent.raws).semicolon ||
	node.parent.nodes[node.parent.nodes.length - 1] !== node
		? ';'
	: '';

	// conditionally print a raw
	const raw = (node, type) => type in node.raws
		? node.raws[type]
	: node.parent && node.parent.raws
		? raw(node.parent, type)
	: '';

	// build the css string
	builder(
		toString(root)
	);
}

// on document parse, initialize the dom
(function d() {
	/c/.test(document.readyState) && document.body // eslint-disable-line no-unused-expressions
		? document.removeEventListener('readystatechange', d) | initDOM()
	: document.addEventListener('readystatechange', d)
})()
