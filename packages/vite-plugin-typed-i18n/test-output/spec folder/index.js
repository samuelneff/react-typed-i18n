"use strict";
///////////////////////////////////
//
// GENERATED FILE - DO NOT EDIT
//
// Entrypoint for generated localized strings.
//
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocale = exports.defaultLocale = exports.locales = void 0;
exports.locales = [
    "en-US",
    "es-US"
];
exports.defaultLocale = 'en-US';
    % sectionName % ;
{
    title: string;
    welcome(props, HomeWelcomeProps);
    string;
    intro(props, HomeIntroProps);
    string;
}
;
 % sectionName % ;
{
    title: string;
    welcome(props, HomeWelcomeProps);
    string;
    intro(props, HomeIntroProps);
    string;
    title: string;
    email: string;
    password: string;
    forgot: string;
    submit: string;
}
;
function getLocale(locale) {
    if (!exports.locales.includes(locale)) {
        throw new Error(`Requested an unsupported locale. Requested ${locale}. Available locales are ${exports.locales.join(', ')}.`);
    }
    const stringsModule = yield Promise.resolve(`${`./${locale}`}`).then(s => __importStar(require(s)));
    return stringsModule.strings;
}
exports.getLocale = getLocale;
