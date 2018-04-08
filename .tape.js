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
			message: 'supports { stage: false, features: { "nesting-rules": true } } usage',
			options: {
				stage: false,
				features: {
					'nesting-rules': true
				}
			}
		},
		'custom-properties': {
			message: 'supports { browsers: "ie >= 10" } usage',
			options: {
				browsers: 'ie >= 10'
			}
		},
		'custom-properties:disabled': {
			message: 'supports { browsers: "ie >= 10", features: { "custom-properties": false } } usage',
			options: {
				browsers: 'ie >= 10',
				features: {
					'custom-properties': false
				}
			}
		},
		'insert:before': {
			message: 'supports { stage: 2, before: { "color-mod-function": [ require("postcss-simple-vars") ] } } usage',
			options: {
				stage: 2,
				insertBefore: {
					'color-mod-function': [
						require('postcss-simple-vars')
					]
				}
			}
		},
		'insert:after': {
			message: 'supports { stage: 2, after: { "color-mod-function": [ require("postcss-simple-vars")() ] } } usage',
			options: {
				stage: 2,
				insertAfter: {
					'color-mod-function': require('postcss-simple-vars')
				},
				features: {
					'color-mod-function': {
						unresolved: 'warn'
					}
				}
			},
			warning: 2
		},
		'insert:after:exec': {
			message: 'supports { stage: 2, after: { "color-mod-function": require("postcss-simple-vars")() } } usage',
			options: {
				stage: 2,
				insertAfter: {
					'color-mod-function': require('postcss-simple-vars')()
				},
				features: {
					'color-mod-function': {
						unresolved: 'ignore'
					}
				}
			},
			expect: 'insert.after.expect.css'
		},
		'insert:after:array': {
			message: 'supports { stage: 2, after: { "color-mod-function": [ require("postcss-simple-vars") ] } } usage',
			options: {
				stage: 2,
				insertAfter: {
					'color-mod-function': [
						require('postcss-simple-vars')
					]
				},
				features: {
					'color-mod-function': {
						unresolved: 'ignore'
					}
				}
			},
			expect: 'insert.after.expect.css'
		}
	}
};
