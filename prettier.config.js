export default {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  overrides: [
    {
      files: ['slides.md', 'pages/*.md'],
      options: {
        parser: 'slidev',
        plugins: ['prettier-plugin-slidev']
      }
    }
  ]
}
