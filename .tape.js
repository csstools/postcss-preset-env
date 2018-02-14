module.exports = {
	'postcss-preset-env': {
		'basic': {
			message: 'supports basic usage'
		},
		'basic:ff49': {
			message: 'supports { browsers: "ff >= 49" } usage',
			options: {
				browsers: 'ff >= 49'
			}
		},
		'basic:ch38': {
			message: 'supports { browsers: "chrome >= 38" } usage',
			options: {
				browsers: 'chrome >= 38'
			}
		},
		'basic:stage1': {
			message: 'supports { stage: 1 } usage',
			options: {
				stage: 1
			}
		},
		'basic:stage1-ff49': {
			message: 'supports { browsers: "ff >= 49", stage: 1 } usage',
			options: {
				browsers: 'ff >= 49',
				stage: 1
			}
		},
		'basic:nesting': {
			message: 'supports { stage: false, features: { "css-nesting": true } } usage',
			options: {
				stage: false,
				features: {
					'css-nesting': true
				}
			}
		},
		'css-variables': {
			message: 'supports { browsers: "ie >= 10" } usage',
			options: {
				browsers: 'ie >= 10'
			}
		},
		'css-variables:disabled': {
			message: 'supports { browsers: "ie >= 10", features: { "css-variables": false } } usage',
			options: {
				browsers: 'ie >= 10',
				features: {
					'css-variables': false
				}
			}
		},
		'insert:before': {
			message: 'supports { stage: 2, before: { "css-color-modifying-colors": [ require("postcss-simple-vars") ] } } usage',
			options: {
				stage: 2,
				insertBefore: {
					'css-color-modifying-colors': [
						require('postcss-simple-vars')
					]
				}
			}
		},
		'insert:after': {
			message: 'supports { stage: 2, after: { "css-color-modifying-colors": [ require("postcss-simple-vars")() ] } } usage',
			options: {
				stage: 2,
				insertAfter: {
					'css-color-modifying-colors': require('postcss-simple-vars')
				},
				features: {
					'css-color-modifying-colors': {
						unresolved: 'warn'
					}
				}
			},
			warning: 2
		},
		'insert:after:exec': {
			message: 'supports { stage: 2, after: { "css-color-modifying-colors": require("postcss-simple-vars")() } } usage',
			options: {
				stage: 2,
				insertAfter: {
					'css-color-modifying-colors': require('postcss-simple-vars')()
				},
				features: {
					'css-color-modifying-colors': {
						unresolved: 'ignore'
					}
				}
			},
			expect: 'insert.after.expect.css'
		},
		'insert:after:array': {
			message: 'supports { stage: 2, after: { "css-color-modifying-colors": [ require("postcss-simple-vars") ] } } usage',
			options: {
				stage: 2,
				insertAfter: {
					'css-color-modifying-colors': [
						require('postcss-simple-vars')
					]
				},
				features: {
					'css-color-modifying-colors': {
						unresolved: 'ignore'
					}
				}
			},
			expect: 'insert.after.expect.css'
		}
	}
};
