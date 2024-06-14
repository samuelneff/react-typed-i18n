import * as fs from 'fs/promises';
import * as path from 'node:path';
import { generateLocales } from '../src/typed-i18n';
import { FunctionPluginHooks, PluginContext } from 'rollup';

async function main() {
  try {
    const pluginContext: PluginContext = {
      addWatchFile(_filePath) {
        // ignore
      },
      warn(message: string) {
        console.log(message);
      },
      error(message: string) {
        throw new Error(message);
      },
    } as PluginContext;

    const sourceDir = path.join(__dirname, '../spec/locales');
    const outDir = path.join(__dirname, '../test-output/index');

    await fs.rm(outDir, { recursive: true, force: true });
    await fs.mkdir(outDir, { recursive: true });

    const plugin = typedI18nPlugin({
      sourceDir,
      outDir,
    });
    await (plugin as FunctionPluginHooks).buildStart.apply(pluginContext, {});
  } catch (error) {
    console.error(error.stack ?? String(error));
  }
}

if (require.main === module) {
  main();
}