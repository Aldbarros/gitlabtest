"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erro404 = exports.errorMiddleware = exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    statusCode;
    mensagemErro;
    nomeErro;
    constructor(nomeErro, mensagemErro, statusCode) {
        super();
        this.name = nomeErro;
        this.nomeErro = nomeErro;
        this.mensagemErro = mensagemErro;
        this.statusCode = statusCode;
    }
}
exports.ErrorHandler = ErrorHandler;
const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    if (err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            body: {
                timestamp: new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }),
                method: req.method,
                message: err.mensagemErro
            }
        });
    }
    res.status(500).json({
        statusCode: 500,
        body: {
            timestamp: new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }),
            method: req.method,
            message: 'Aconteceu um erro inesperado, tente novamente'
        }
    });
};
exports.errorMiddleware = errorMiddleware;
const erro404 = (_req, _res, next) => next(new ErrorHandler('NOTFOUND', 'Recurso não encontrado', 404));
exports.erro404 = erro404;
//# sourceMappingURL=ErrorHandler.js.map