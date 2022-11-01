"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUmaNota = exports.atualizarUmaNota = exports.listarUmaNota = exports.adicionarNota = exports.listarNotas = void 0;
const tslib_1 = require("tslib");
const dbInstances_1 = require("../utils/dbInstances");
const arrpag_1 = require("arrpag");
const fuse_js_1 = tslib_1.__importDefault(require("fuse.js"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
const listarNotas = async (pagina, porPagina, sq) => {
    const notas = await dbInstances_1.notesDBinst.findMany();
    const notasPag = (0, arrpag_1.paginate)(notas, parseInt(pagina), parseInt(porPagina));
    if ((sq != null) && sq?.length > 0) {
        const fuse = new fuse_js_1.default(notas, {
            keys: ['nota']
        });
        const lista = fuse.search(sq).map((nota) => ({ idNota: nota.item.idNota, nota: nota.item.nota }));
        return lista;
    }
    return notasPag;
};
exports.listarNotas = listarNotas;
const adicionarNota = async (nota) => {
    const notaInput = await dbInstances_1.notesDBinst.create({ data: nota });
    return notaInput;
};
exports.adicionarNota = adicionarNota;
const listarUmaNota = async (idNota) => {
    const nota = await dbInstances_1.notesDBinst.findUnique({ where: { idNota } });
    if (nota === null) {
        throw new ErrorHandler_1.ErrorHandler('NOTFOUND', 'Nota não encontrada', 404);
    }
    return nota;
};
exports.listarUmaNota = listarUmaNota;
const atualizarUmaNota = async ({ idNota, nota }) => {
    await (0, exports.listarUmaNota)(idNota);
    const notaAtualizada = await dbInstances_1.notesDBinst.update({ where: { idNota }, data: { nota } });
    return notaAtualizada;
};
exports.atualizarUmaNota = atualizarUmaNota;
const eliminarUmaNota = async (idNota) => {
    const notaFound = await (0, exports.listarUmaNota)(idNota);
    const notaEliminada = await dbInstances_1.notesDBinst.delete({ where: { idNota: notaFound.idNota } });
    return notaEliminada;
};
exports.eliminarUmaNota = eliminarUmaNota;
//# sourceMappingURL=notes.service.js.map