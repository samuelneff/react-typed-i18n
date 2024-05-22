"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strings = void 0;
///////////////////////////////////
//
// GENERATED FILE - DO NOT EDIT
//
// Localized strings for en-US.
//
const intl_messageformat_1 = __importDefault(require("intl-messageformat"));
const formatters = {};
exports.strings = {
    locale: 'en-US',
    home: {
        title: "Home",
        welcome(props) {
            var _a;
            return ((_a = formatters['homeWelcome']) !== null && _a !== void 0 ? _a : (formatters['homeWelcome'] = new intl_messageformat_1.default([
                {
                    "type": 0,
                    "value": "Hello "
                },
                {
                    "type": 1,
                    "value": "firstName"
                },
                {
                    "type": 0,
                    "value": "!"
                }
            ], '%locale%'))).format(props);
        },
        intro(props) {
            var _a;
            return ((_a = formatters['homeIntro']) !== null && _a !== void 0 ? _a : (formatters['homeIntro'] = new intl_messageformat_1.default([
                {
                    "type": 0,
                    "value": "Welcome back! It's been "
                },
                {
                    "type": 6,
                    "value": "days",
                    "options": {
                        "=0": {
                            "value": [
                                {
                                    "type": 0,
                                    "value": "no time at all"
                                }
                            ]
                        },
                        "=1": {
                            "value": [
                                {
                                    "type": 0,
                                    "value": "just a day"
                                }
                            ]
                        },
                        "other": {
                            "value": [
                                {
                                    "type": 1,
                                    "value": "days"
                                },
                                {
                                    "type": 0,
                                    "value": " days"
                                }
                            ]
                        }
                    },
                    "offset": 0,
                    "pluralType": "cardinal"
                },
                {
                    "type": 0,
                    "value": "."
                }
            ], '%locale%'))).format(props);
        },
    },
    login: {
        title: "Sign-in",
        email: "E-Mail",
        password: "Password",
        forgot: "Forgot password",
        submit: "Submit",
    },
};
