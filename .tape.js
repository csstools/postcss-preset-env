module.exports = {
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
	'custom-properties:enabled': {
		message: 'supports { browsers: "chrome >= 60", features: { "custom-properties": true } } usage',
		options: {
			browsers: 'chrome >= 60',
			features: {
				'custom-properties': true
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
		warnings: 2
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
	},
	'basic:export': {
		message: 'supports { stage: 0 } usage',
		options: {
			stage: 0,
			exportTo: [
				'test/generated-custom-exports.css',
				'test/generated-custom-exports.js',
				'test/generated-custom-exports.json',
				'test/generated-custom-exports.mjs'
			]
		},
		expect: 'basic.stage0.expect.css',
		result: 'basic.stage0.result.css',
		before() {
			global.__exportTo = {
				css: require('fs').readFileSync('test/generated-custom-exports.css', 'utf8'),
				js: require('fs').readFileSync('test/generated-custom-exports.js', 'utf8'),
				json: require('fs').readFileSync('test/generated-custom-exports.json', 'utf8'),
				mjs: require('fs').readFileSync('test/generated-custom-exports.mjs', 'utf8')
			};
		},
		after() {
			global.__exportAs = {
				css: require('fs').readFileSync('test/generated-custom-exports.css', 'utf8'),
				js: require('fs').readFileSync('test/generated-custom-exports.js', 'utf8'),
				json: require('fs').readFileSync('test/generated-custom-exports.json', 'utf8'),
				mjs: require('fs').readFileSync('test/generated-custom-exports.mjs', 'utf8')
			};

			Object.keys(global.__exportTo).forEach(key => {
				if (global.__exportTo[key] !== global.__exportAs[key]) {
					throw new Error(`The original ${key} file did not match the freshly exported copy`);
				}
			});
		}
	}
};
