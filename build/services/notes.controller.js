"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adicionarNotaHttp = exports.listarNotasHttp = exports.atualizarUmaNotaHttp = exports.eliminarUmaNotaHttp = exports.listarUmaNotaHttp = void 0;
const notes_service_1 = require("./notes.service");
const notes_validation_1 = require("./notes.validation");
const listarUmaNotaHttp = async (req, res, next) => {
    try {
        const resultado = await (0, notes_service_1.listarUmaNota)(req.params.idNota);
        return res.status(200).json({
            statusCode: 200,
            body: resultado
        });
    }
    catch (err) {
        console.error(err);
        if (err.name === 'NOTFOUND') {
            return res.status(err.statusCode).json({
                statusCode: err.statusCode,
                body: {
                    timestamp: new Date().toLocaleDateString('pt-pt', { day: 'numeric', month: 'long', year: 'numeric' }),
                    message: err.mensagemErro,
                    method: req.method
                }
            });
        }
    }
};
exports.listarUmaNotaHttp = listarUmaNotaHttp;
const eliminarUmaNotaHttp = async (req, res, next) => {
    try {
        const resultado = await (0, notes_service_1.eliminarUmaNota)(req.params.idNota);
        return res.status(200).json({
            statusCode: 200,
            body: resultado
        });
    }
    catch (err) {
        console.error(err);
        if (err.name === 'NOTFOUND') {
            return res.status(err.statusCode).json({
                statusCode: err.statusCode,
                body: {
                    timestamp: new Date().toLocaleDateString('pt-pt', { day: 'numeric', month: 'long', year: 'numeric' }),
                    message: err.mensagemErro,
                    method: req.method
                }
            });
        }
    }
};
exports.eliminarUmaNotaHttp = eliminarUmaNotaHttp;
const atualizarUmaNotaHttp = async (req, res, next) => {
    try {
        const corpo = await notes_validation_1.atualizarNota.validateAsync(req.body);
        const body = {
            idNota: req.params.idNota,
            nota: corpo.nota
        };
        const resultado = await (0, notes_service_1.atualizarUmaNota)(body);
        return res.status(200).json({
            statusCode: 200,
            body: resultado
        });
    }
    catch (err) {
        console.error(err);
        if (err.name === 'NOTFOUND') {
            return res.status(err.statusCode).json({
                statusCode: err.statusCode,
                body: {
                    timestamp: new Date().toLocaleDateString('pt-pt', { day: 'numeric', month: 'long', year: 'numeric' }),
                    message: err.mensagemErro,
                    method: req.method
                }
            });
        }
        if (err.name === 'ValidationError') {
            for (const message of err.details) {
                return res.status(400).json({
                    statusCode: 400,
                    body: {
                        timestamp: new Date().toLocaleDateString('pt-pt', { day: 'numeric', month: 'long', year: 'numeric' }),
                        message: message.message,
                        method: req.method
                    }
                });
            }
        }
    }
};
exports.atualizarUmaNotaHttp = atualizarUmaNotaHttp;
const listarNotasHttp = async (req, res, next) => {
    try {
        const resultado = await (0, notes_service_1.listarNotas)(req.query.pagina, req.query.porPagina, req.query.sq);
        return res.status(200).json({
            statusCode: 200,
            body: resultado
        });
    }
    catch (err) {
        console.error(err);
    }
};
exports.listarNotasHttp = listarNotasHttp;
const adicionarNotaHttp = async (req, res, next) => {
    try {
        const nota = await notes_validation_1.validarNota.validateAsync(req.body);
        await (0, notes_service_1.adicionarNota)(nota);
        return res.status(201).json({
            statusCode: 200,
            body: {
                timestamp: new Date().toLocaleDateString('pt-pt', { day: 'numeric', month: 'long', year: 'numeric' }),
                message: 'Nota criada',
                method: req.method
            }
        });
    }
    catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            for (const message of err.details) {
                return res.status(400).json({
                    statusCode: 400,
                    body: {
                        timestamp: new Date().toLocaleDateString('pt-pt', { day: 'numeric', month: 'long', year: 'numeric' }),
                        message: message.message,
                        method: req.method
                    }
                });
            }
        }
    }
};
exports.adicionarNotaHttp = adicionarNotaHttp;
