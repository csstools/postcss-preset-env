// tooling
import postcssApply from 'postcss-apply';
import postcssAttributeCaseInsensitive from 'postcss-attribute-case-insensitive';
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
import postcssImageSetPolyfill from '@csstools/postcss-image-set-function';
import postcssInitial from 'postcss-initial';
import postcssLogical from 'postcss-logical';
import postcssMediaMinmax from 'postcss-media-minmax';
import postcssNesting from 'postcss-nesting';
import postcssPageBreak from 'postcss-page-break';
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
	'color-mod-function': postcssColorModFunction,
	'custom-media-queries': postcssCustomMedia,
	'custom-properties': postcssCustomProperties,
	'custom-property-sets': postcssApply,
	'custom-selectors': postcssCustomSelectors,
	'dir-pseudo-class': postcssDirPseudoClass,
	'font-variant-property': postcssFontVariant,
	'hexadecimal-alpha-notation': postcssColorHexAlpha,
	'image-set-function': postcssImageSetPolyfill,
	'logical-properties-and-values': postcssLogical,
	'matches-pseudo-class': postcssSelectorMatches,
	'media-query-ranges': postcssMediaMinmax,
	'nesting-rules': postcssNesting,
	'not-pseudo-class': postcssSelectorNot,
	'overflow-wrap-property': postcssReplaceOverflowWrap,
	'rebeccapurple-color': postcssColorRebeccapurple,
	'focus-visible-pseudo-class': postcssFocusVisible,
	'focus-within-pseudo-class': postcssFocusWithin,
	'system-ui-font-family': postcssFontFamilySystemUi
};
