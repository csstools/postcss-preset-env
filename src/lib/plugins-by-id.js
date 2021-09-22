import postcssAttributeCaseInsensitive from 'postcss-attribute-case-insensitive';
import postcssBlankPseudo from 'css-blank-pseudo/postcss';
import postcssColorFunctionalNotation from 'postcss-color-functional-notation';
import postcssColorHexAlpha from 'postcss-color-hex-alpha';
import postcssColorRebeccapurple from 'postcss-color-rebeccapurple';
import postcssCustomMedia from 'postcss-custom-media';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssCustomSelectors from 'postcss-custom-selectors';
import postcssDirPseudoClass from 'postcss-dir-pseudo-class';
import postcssDoublePositionGradients from 'postcss-double-position-gradients';
import postcssEnvFunction from 'postcss-env-function';
import postcssFocusVisible from 'postcss-focus-visible';
import postcssFocusWithin from 'postcss-focus-within';
import postcssFontVariant from 'postcss-font-variant';
import postcssFontFamilySystemUi from '../patch/postcss-system-ui-font-family';
import postcssGapProperties from 'postcss-gap-properties';
import postcssHasPseudo from 'css-has-pseudo/postcss';
import postcssImageSetPolyfill from 'postcss-image-set-function';
import postcssLabFunction from 'postcss-lab-function';
import postcssLogical from 'postcss-logical';
import postcssMediaMinmax from 'postcss-media-minmax';
import postcssNesting from 'postcss-nesting';
import postcssOverflowShorthand from 'postcss-overflow-shorthand';
import postcssPageBreak from 'postcss-page-break';
import postcssPlace from 'postcss-place';
import postcssPrefersColorScheme from 'css-prefers-color-scheme/postcss';
import postcssPseudoClassAnyLink from 'postcss-pseudo-class-any-link';
import postcssReplaceOverflowWrap from 'postcss-replace-overflow-wrap';
import postcssSelectorNot from 'postcss-selector-not';

// postcss plugins ordered by id
export default {
	'any-link-pseudo-class': postcssPseudoClassAnyLink,
	'blank-pseudo-class': postcssBlankPseudo,
	'break-properties': postcssPageBreak,
	'case-insensitive-attributes': postcssAttributeCaseInsensitive,
	'color-functional-notation': postcssColorFunctionalNotation,
	'custom-media-queries': postcssCustomMedia,
	'custom-properties': postcssCustomProperties,
	'custom-selectors': postcssCustomSelectors,
	'dir-pseudo-class': postcssDirPseudoClass,
	'double-position-gradients': postcssDoublePositionGradients,
	'environment-variables': postcssEnvFunction,
	'focus-visible-pseudo-class': postcssFocusVisible,
	'focus-within-pseudo-class': postcssFocusWithin,
	'font-variant-property': postcssFontVariant,
	'gap-properties': postcssGapProperties,
	'has-pseudo-class': postcssHasPseudo,
	'hexadecimal-alpha-notation': postcssColorHexAlpha,
	'image-set-function': postcssImageSetPolyfill,
	'lab-function': postcssLabFunction,
	'logical-properties-and-values': postcssLogical,
	'media-query-ranges': postcssMediaMinmax,
	'nesting-rules': postcssNesting,
	'not-pseudo-class': postcssSelectorNot,
	'overflow-property': postcssOverflowShorthand,
	'overflow-wrap-property': postcssReplaceOverflowWrap,
	'place-properties': postcssPlace,
	'prefers-color-scheme-query': postcssPrefersColorScheme,
	'rebeccapurple-color': postcssColorRebeccapurple,
	'system-ui-font-family': postcssFontFamilySystemUi
};
