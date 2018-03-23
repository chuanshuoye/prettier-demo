'use strict';

const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const prettier = require('prettier');
const fs = require('fs');

const prettierConfigPath = require.resolve('./.prettierrc');

const formatFilePaths = process.argv[2] || '**/*.js';
const mode = process.argv[3] || 'check';
const shouldWrite = mode;

console.log(process.argv);
console.log(`prettier file path is ${formatFilePaths}`);

let didWarn = false;
let didError = false;

const files = glob.sync(formatFilePaths, {ignore: '**/node_modules/**'});

if (!files.length) {
  return;
}

files.forEach(file => {
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath,
  });
  try {
    const input = fs.readFileSync(file, 'utf8');
    if (shouldWrite) {
      const output = prettier.format(input, options);
      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
      }
    } else {
      if (!prettier.check(input, options)) {
        if (!didWarn) {
          console.log(
            '\n' +
              chalk.red(
                `  This project uses prettier to format all JavaScript code.\n`
              ) +
              chalk.dim(`    Please run `) +
              chalk.reset('yarn prettier-all') +
              chalk.dim(
                ` and add changes to files listed below to your commit:`
              ) +
              `\n\n`
          );
          didWarn = true;
        }
        console.log(file);
      }
    }
  } catch (error) {
    didError = true;
    console.log('\n\n' + error.message);
    console.log(file);
  }
});

if (didWarn || didError) {
  process.exit(1);
}
