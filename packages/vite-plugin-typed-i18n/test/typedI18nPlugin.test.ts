import {  } from 'jest';
import { createMockProxy } from 'jest-mock-proxy';
import * as path from 'node:path';
import { FunctionPluginHooks, PluginContext } from 'rollup';

import { typedI18nPlugin } from '../src/typedI18nPlugin';

let pluginContext: PluginContext;
let watchedFiles = [] as string[];
let warnings = [] as string[];

beforeEach(() => {
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
    sourceDir: path.join(__dirname, '../src/spec'),
    outDir: path.join(__dirname, '../test-output')
  });
  await (plugin as FunctionPluginHooks).buildStart.apply(pluginContext, {});
});
