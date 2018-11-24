import postcss from 'postcss';

export default postcss.plugin('postcss-system-ui-font', () => root => {
	root.walkDecls(propertyRegExp, decl => {
		decl.value = decl.value.replace(systemUiMatch, systemUiReplace);
	});
});

const propertyRegExp = /(?:^(?:-|\\002d){2})|(?:^font(?:-family)?$)/i;
const whitespace = '[\\f\\n\\r\\x09\\x20]';
const systemUiFamily = [
	'system-ui',
	/* macOS 10.11-10.12 */ '-apple-system',
	/* Windows 6+ */ 'Segoe UI',
	/* Android 4+ */ 'Roboto',
	/* Ubuntu 10.10+ */ 'Ubuntu',
	/* Gnome 3+ */ 'Cantarell',
	/* KDE Plasma 5+ */ 'Noto Sans',
	/* fallback */ 'sans-serif'
];
const systemUiMatch = new RegExp(`(^|,|${whitespace}+)(?:system-ui${whitespace}*)(?:,${whitespace}*(?:${systemUiFamily.join('|')})${whitespace}*)?(,|$)`, 'i');
const systemUiReplace = `$1${systemUiFamily.join(', ')}$2`;
