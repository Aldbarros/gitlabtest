"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarNota = exports.validarNota = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
exports.validarNota = joi_1.default.object({
    nota: joi_1.default.string().required().empty().messages({
        'any.required': 'Insira por favor a sua nota',
        'string.base': 'Insira por favor uma nota válida',
        'string.empty': 'Insira por favor uma nota'
    })
});
exports.atualizarNota = joi_1.default.object({
    nota: joi_1.default.string().empty().messages({
        'any.required': 'Insira por favor a sua nota',
        'string.base': 'Insira por favor uma nota válida',
        'string.empty': 'Insira por favor uma nota'
    })
});
//# sourceMappingURL=notes.validation.js.map