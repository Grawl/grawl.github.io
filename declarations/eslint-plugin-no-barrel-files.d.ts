declare module 'eslint-plugin-no-barrel-files' {
	import { type TSESLint } from '@typescript-eslint/utils'

	const plugin: {
		rules: {
			'no-barrel-files': TSESLint.RuleModule<'noReExport' | 'noExportAll'>
		}
		flat: {
			plugins: {
				'no-barrel-files': {
					rules: {
						'no-barrel-files': TSESLint.RuleModule<
							'noReExport' | 'noExportAll'
						>
					}
				}
			}
			rules: {
				'no-barrel-files/no-barrel-files': TSESLint.FlatConfig.RuleEntry
			}
		}
	}
	export = plugin
}
