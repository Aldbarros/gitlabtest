"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roteadorNotes = void 0;
const express_1 = require("express");
const notes_controller_1 = require("./notes.controller");
exports.roteadorNotes = (0, express_1.Router)();
exports.roteadorNotes.route('/')
    .get(notes_controller_1.listarNotasHttp)
    .post(notes_controller_1.adicionarNotaHttp);
exports.roteadorNotes.route('/:idNota')
    .get(notes_controller_1.listarUmaNotaHttp)
    .delete(notes_controller_1.eliminarUmaNotaHttp)
    .put(notes_controller_1.atualizarUmaNotaHttp);
//# sourceMappingURL=notes.routes.js.map