import postcssAttributeCaseInsensitive from 'postcss-attribute-case-insensitive';
import postcssColorFunctionalNotation from 'postcss-color-functional-notation';
import postcssColorHexAlpha from 'postcss-color-hex-alpha';
import postcssColorModFunction from 'postcss-color-mod-function';
import postcssColorRebeccapurple from 'postcss-color-rebeccapurple';
import postcssCustomMedia from 'postcss-custom-media';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssCustomSelectors from 'postcss-custom-selectors';
import postcssDirPseudoClass from 'postcss-dir-pseudo-class';
import postcssFocusVisible from 'postcss-focus-visible';
import postcssFocusWithin from 'postcss-focus-within';
import postcssFontVariant from 'postcss-font-variant';
import postcssFontFamilySystemUi from 'postcss-font-family-system-ui';
import postcssGapProperties from 'postcss-gap-properties';
import postcssImageSetPolyfill from 'postcss-image-set-function';
import postcssInitial from 'postcss-initial';
import postcssLabFunction from 'postcss-lab-function';
import postcssLogical from 'postcss-logical';
import postcssMediaMinmax from 'postcss-media-minmax';
import postcssNesting from 'postcss-nesting';
import postcssOverflowShorthand from 'postcss-overflow-shorthand';
import postcssPageBreak from 'postcss-page-break';
import postcssPlace from 'postcss-place';
import postcssPseudoClassAnyLink from 'postcss-pseudo-class-any-link';
import postcssReplaceOverflowWrap from 'postcss-replace-overflow-wrap';
import postcssSelectorMatches from 'postcss-selector-matches';
import postcssSelectorNot from 'postcss-selector-not';

// postcss plugins ordered by id
export default {
	'all-property': postcssInitial,
	'any-link-pseudo-class': postcssPseudoClassAnyLink,
	'break-properties': postcssPageBreak,
	'case-insensitive-attributes': postcssAttributeCaseInsensitive,
	'color-functional-notation': postcssColorFunctionalNotation,
	'color-mod-function': postcssColorModFunction,
	'custom-media-queries': postcssCustomMedia,
	'custom-properties': postcssCustomProperties,
	'custom-selectors': postcssCustomSelectors,
	'dir-pseudo-class': postcssDirPseudoClass,
	'focus-visible-pseudo-class': postcssFocusVisible,
	'focus-within-pseudo-class': postcssFocusWithin,
	'font-variant-property': postcssFontVariant,
	'gap-properties': postcssGapProperties,
	'hexadecimal-alpha-notation': postcssColorHexAlpha,
	'image-set-function': postcssImageSetPolyfill,
	'lab-function': postcssLabFunction,
	'logical-properties-and-values': postcssLogical,
	'matches-pseudo-class': postcssSelectorMatches,
	'media-query-ranges': postcssMediaMinmax,
	'nesting-rules': postcssNesting,
	'not-pseudo-class': postcssSelectorNot,
	'overflow-property': postcssOverflowShorthand,
	'overflow-wrap-property': postcssReplaceOverflowWrap,
	'place-properties': postcssPlace,
	'rebeccapurple-color': postcssColorRebeccapurple,
	'system-ui-font-family': postcssFontFamilySystemUi
};
