const {esNextPaths} = require('./prettier.config');

const esCustomPaths = process.argv[2] || esNextPaths

console.log(esCustomPaths);

module.exports = {
  bracketSpacing: false,
  singleQuote: true,
  jsxBracketSameLine: true,
  trailingComma: 'es5',
  printWidth: 80,

  overrides: [
    {
      files: esCustomPaths,
      options: {
        trailingComma: 'all',
      },
    },
  ],
};
