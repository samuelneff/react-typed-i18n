import { Command, OptionValues } from 'commander';
import fs from 'node:fs';
import { trimIndent } from 'utikity';
import packageJson from '../package.json';
import { resolveCurrentLocale } from './resolveCurrentLocale.js';
import { generateLocales } from './typed-i18n.js';

const header = `
  _______                   _   _ __  ___
 |__   __|                 | | (_)_ |/ _ \\
    | |_   _ _ __   ___  __| |  _ | | (_) |_ __
    | | | | |  _ \\ / _ \\/ _  | | || |> _ <|  _  \\
    | | |_| | |_) |  __/ (_| | | || | (_) | | | |
    |_|\\__, |  __/ \\___|\\__,_| |_||_|\\___/|_| |_|
        __/ | |
       |___/|_|
`;


const program = new Command()
  .name('typed-i18n')
  .option('-s, --source <directory>', "Source directory of YAML language files")
  .option('-o, --out <directory>', 'Output directory for generated TypeScript files')
  .option('-d, --default <locale>', `Default locale; current is used if not specified (${ resolveCurrentLocale() })`)
  .option('-r, --react [false]', 'Enable React support; determined automatically by presence of tsx files if not specified')
  .option('-t, --templates <directory>', 'Custom templates directory')
  .option('-v, --verbose', 'Display keys as they\'re generated')
  .option('-h, --help', 'You\'re viewing it')
  .parse(process.argv);

const {
  source: sourceDir,
  out: outDir,
  // locale,
  default: defaultLocale,
  react,
  templates: templatesDir,
  verbose,
  help,
} = program.opts();

if (help || process.argv.length === 2) {
  showHelpAndExit();
}

if (!showHelpAndExit && (sourceDir === undefined || outDir === undefined)) {
  errorAndExit('Source (-s, --source) and output (-o, --out) are both required');
}

if (!fs.existsSync(sourceDir)) {
  errorAndExit(`Source direcotry not found: ${ sourceDir }`);
}

generateLocales({
  sourceDir,
  outDir,
  // locale,
  defaultLocale,
  reactSupport: react == undefined
    ? undefined
    : react === 'true',
  templatesDir,
  verbose,
  logWarn(message: string) {
    console.warn(message);
  },
  logError(message: string) {
    console.error(message);
  }
});

function showHelpAndExit(errorMessage?: string) {
  console.log(header);
  console.log(`Typed i18n ${ packageJson.version }`);
  console.log();
  console.log('Generate TypeScript language files from yaml input strings.');
  console.log();

  if (errorMessage) {
    console.log(errorMessage);
  }

  program.help(); // exits
}

function errorAndExit(message: string) {
  showHelpAndExit(trimIndent(`
  ***************************************************************************
  **
  ** ERROR: ${message}
  **
  ***************************************************************************
  `));
}