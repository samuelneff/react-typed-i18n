import * as fs from 'fs/promises';
import * as path from 'node:path';
import { typedI18nPlugin } from '../src/typedI18nPlugin';
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

    const sourceDir = path.join(__dirname, '../spec/react/src/locales');
    const outDir = path.join(__dirname, '../test-output/react');
    const reactFile = path.join(outDir, 'placeholder.tsx');

    await fs.rm(outDir, { recursive: true, force: true });
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(reactFile, '// just to trick plugin to use react mode');

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