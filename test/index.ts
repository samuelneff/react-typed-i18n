import * as fs from 'fs/promises';
import * as path from 'node:path';
import { generateLocales } from '../src/typed-i18n';

async function main() {
  try {
    const sourceDir = path.join(__dirname, '../spec/locales');
    const outDir = path.join(__dirname, '../output/index');

    await fs.rm(outDir, { recursive: true, force: true });
    await fs.mkdir(outDir, { recursive: true });

    await generateLocales({
      sourceDir,
      outDir
    });
  } catch (error) {
    console.error(error.stack ?? String(error));
  }
}

if (require.main === module) {
  main();
}
