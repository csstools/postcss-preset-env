// tooling
import postcssApply from 'postcss-apply';
import postcssInitial from 'postcss-initial';
import postcssColorHexAlpha from 'postcss-color-hex-alpha';
import postcssColorModFunction from 'postcss-color-mod-function';
import postcssColorRebeccapurple from 'postcss-color-rebeccapurple';
import postcssCustomSelectors from 'postcss-custom-selectors';
import postcssFocusVisible from 'postcss-focus-visible';
import postcssFontVariant from 'postcss-font-variant';
import postcssFontFamilySystemUi from 'postcss-font-family-system-ui';
import postcssImageSetPolyfill from '@csstools/postcss-image-set-function';
import postcssLogical from 'postcss-logical';
import postcssNesting from 'postcss-nesting';
import postcssReplaceOverflowWrap from 'postcss-replace-overflow-wrap';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssCustomMedia from 'postcss-custom-media';
import postcssMediaMinmax from 'postcss-media-minmax';
import postcssPageBreak from 'postcss-page-break';
import postcssPseudoClassAnyLink from 'postcss-pseudo-class-any-link';
import postcssAttributeCaseInsensitive from 'postcss-attribute-case-insensitive';
import postcssSelectorMatches from 'postcss-selector-matches';
import postcssSelectorNot from 'postcss-selector-not';
import postcssDirPseudoClass from 'postcss-dir-pseudo-class';

// postcss plugins ordered by specification id
export default {
	'break-properties': postcssPageBreak,
	'css-apply-rule': postcssApply,
	'css-cascade-all-shorthand': postcssInitial,
	'css-color-hex-notation': postcssColorHexAlpha,
	'css-color-modifying-colors': postcssColorModFunction,
	'css-color-valdef-color-rebeccapurple': postcssColorRebeccapurple,
	'css-extensions-custom-selectors': postcssCustomSelectors,
	'css-fonts-propdef-font-variant': postcssFontVariant,
	'css-fonts-system-ui-def': postcssFontFamilySystemUi,
	'css-images-image-set-notation': postcssImageSetPolyfill,
	'css-logical': postcssLogical,
	'css-nesting': postcssNesting,
	'css-text-overflow-wrap-property': postcssReplaceOverflowWrap,
	'css-variables': postcssCustomProperties,
	'mediaqueries-custom-mq': postcssCustomMedia,
	'mediaqueries-mq-ranges': postcssMediaMinmax,
	'selectors-any-link-pseudo': postcssPseudoClassAnyLink,
	'selectors-attribute-case': postcssAttributeCaseInsensitive,
	'selectors-dir-pseudo': postcssDirPseudoClass,
	'selectors-focus-visible-pseudo': postcssFocusVisible,
	'selectors-matches-pseudo': postcssSelectorMatches,
	'selectors-negation': postcssSelectorNot
};
