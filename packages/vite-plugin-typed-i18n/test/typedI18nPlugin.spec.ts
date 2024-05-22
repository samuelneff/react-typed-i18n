import * as fs from 'fs/promises';
import * as path from 'node:path';
import { FunctionPluginHooks, PluginContext } from 'rollup';
import { substringEnd } from 'utikity';
import { beforeAll, beforeEach, expect, test } from 'vitest';

import { typedI18nPlugin } from '../src/typedI18nPlugin';

const sourceDir = path.join(__dirname, '../spec/locales');
const rootOutDir = path.join(__dirname, '../test-output');
let outDir: string;

let pluginContext: PluginContext;
let watchedFiles = [] as string[];
let warnings = [] as string[];

beforeAll(async () => {
  await fs.rm(rootOutDir, { recursive: true, force: true });
});

beforeEach(async () => {

  const testName = substringEnd(expect.getState().currentTestName, ' > ');
  outDir = path.join(rootOutDir, testName);
  await fs.mkdir(outDir, { recursive: true });

  pluginContext = {
    addWatchFile(filePath) {
      watchedFiles.push(filePath);
    },
    warn(message: string) {
      warnings.push(message);
    },
    error(message: string) {
      throw new Error(message);
    },
  } as PluginContext;
});

test('spec folder', async (

) => {
  const plugin = typedI18nPlugin({
    sourceDir,
    outDir,
  });
  await (plugin as FunctionPluginHooks).buildStart.apply(pluginContext, {});
});
