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
		'basic:stage0': {
			message: 'supports { stage: 0 } usage',
			options: {
				stage: 0
			}
		},
		'basic:stage0-ff49': {
			message: 'supports { browsers: "ff >= 49", stage: 0 } usage',
			options: {
				browsers: 'ff >= 49',
				stage: 0
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
		'basic:autoprefixer': {
			message: 'supports { autoprefixer: { add: false } } usage',
			options: {
				autoprefixer: {
					add: false
				}
			}
		},
		'basic:autoprefixer:false': {
			message: 'supports { autoprefixer: false } usage',
			options: {
				autoprefixer: false
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
			message: 'supports { stage: 1, features: { "color-mod-function": true }, insertBefore: { "color-mod-function": [ require("postcss-simple-vars") ] } } usage',
			options: {
				stage: 1,
				features: {
					'color-mod-function': true
				},
				insertBefore: {
					'color-mod-function': [
						require('postcss-simple-vars')
					]
				}
			}
		},
		'insert:after': {
			message: 'supports { stage: 1, features: { "color-mod-function": { unresolved: "warn" } }, insertAfter: { "color-mod-function": [ require("postcss-simple-vars")() ] } } usage',
			options: {
				stage: 1,
				features: {
					'color-mod-function': {
						unresolved: 'warn'
					}
				},
				insertAfter: {
					'color-mod-function': require('postcss-simple-vars')
				}
			},
			warning: 2
		},
		'insert:after:exec': {
			message: 'supports { stage: 2, features: { "color-mod-function": { unresolved: "ignore" } }, insertAfter: { "color-mod-function": require("postcss-simple-vars")() } } usage',
			options: {
				stage: 2,
				features: {
					'color-mod-function': {
						unresolved: 'ignore'
					}
				},
				insertAfter: {
					'color-mod-function': require('postcss-simple-vars')()
				}
			},
			expect: 'insert.after.expect.css'
		},
		'insert:after:array': {
			message: 'supports { stage: 1, after: { "color-mod-function": [ require("postcss-simple-vars") ] } } usage',
			options: {
				stage: 1,
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
		},
		'import': {
			message: 'supports { importFrom: { customMedia, customProperties, customSelectors, environmentVariables } } usage',
			options: {
				importFrom: {
					customMedia: {
						'--narrow-window': '(max-width: env(--sm))'
					},
					customProperties: {
						'--order': '1'
					},
					customSelectors: {
						':--heading': 'h1, h2, h3, h4, h5, h6'
					},
					environmentVariables: {
						'--sm': '40rem'
					}
				},
				stage: 0
			}
		}
	}
};
