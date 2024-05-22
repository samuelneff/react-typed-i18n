"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strings = void 0;
const intl_messageformat_1 = __importDefault(require("intl-messageformat"));
const formatters = {};
exports.strings = {
    locale: 'es-US',
    home: {
        title: 'Casa',
        welcome(props) {
            var _a;
            return ((_a = formatters['home.welcome']) !== null && _a !== void 0 ? _a : (formatters['home.welcome'] = new intl_messageformat_1.default([
                { type: 0, value: '¡Hola ' },
                { type: 1, value: 'firstName' },
                { type: 0, value: '!' }
            ], '%locale%'))).format(props);
        },
        intro(props) {
            var _a;
            return ((_a = formatters['home.intro']) !== null && _a !== void 0 ? _a : (formatters['home.intro'] = new intl_messageformat_1.default([
                { type: 0, value: '¡Bienvenido de nuevo! Ha pasado ' },
                {
                    type: 6,
                    value: 'days',
                    options: {
                        '=0': { value: [{ type: 0, value: 'solo un rato' }] },
                        '=1': { value: [{ type: 0, value: 'solo un día' }] },
                        other: {
                            value: [{ type: 1, value: 'days' }, { type: 0, value: ' días' }]
                        }
                    },
                    offset: 0,
                    pluralType: 'cardinal'
                },
                { type: 0, value: ' desde que estuviste aquí.' }
            ], '%locale%'))).format(props);
        },
    },
    login: {
        title: 'Iniciar sesión',
        email: 'Correo',
        password: 'Contraseña',
        forgot: 'Olvido mi contraseña',
        submit: 'Vamos',
    },
};
