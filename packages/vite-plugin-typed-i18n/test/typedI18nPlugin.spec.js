"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("node:path"));
const utikity_1 = require("utikity");
const vitest_1 = require("vitest");
const typedI18nPlugin_1 = require("../src/typedI18nPlugin");
const sourceDir = path.join(__dirname, '../spec/locales');
const rootOutDir = path.join(__dirname, '../test-output');
let outDir;
let pluginContext;
let watchedFiles = [];
let warnings = [];
(0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield fs.rm(rootOutDir, { recursive: true, force: true });
}));
(0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    const testName = (0, utikity_1.substringEnd)(vitest_1.expect.getState().currentTestName, ' > ');
    outDir = path.join(rootOutDir, testName);
    yield fs.mkdir(outDir, { recursive: true });
    pluginContext = {
        addWatchFile(filePath) {
            watchedFiles.push(filePath);
        },
        warn(message) {
            warnings.push(message);
        },
        error(message) {
            throw new Error(message);
        },
    };
}));
(0, vitest_1.test)('spec folder', () => __awaiter(void 0, void 0, void 0, function* () {
    const plugin = (0, typedI18nPlugin_1.typedI18nPlugin)({
        sourceDir,
        outDir,
    });
    yield plugin.buildStart.apply(pluginContext, {});
}));
