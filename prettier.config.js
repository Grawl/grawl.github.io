export default {
	plugins: ['prettier-plugin-css-order'],
	editorConfig: true,
	singleQuote: true,
	trailingComma: 'all',
	tabWidth: 4,
	quoteProps: 'consistent',
	arrowParens: 'avoid',
	semi: false,
	htmlWhitespaceSensitivity: 'css',
	jsxSingleQuote: true,
	overrides: [
		{
			files: ['**/*.css'],
			options: {
				order: 'concentric-css',
			},
		},
	],
}
