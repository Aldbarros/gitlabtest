"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMiddlewares = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const ErrorHandler_1 = require("./ErrorHandler");
const app_routes_1 = require("../app.routes");
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const path_1 = require("path");
const fs_1 = require("fs");
const swaggerFile = (0, path_1.resolve)(__dirname, 'swagger.json');
const swaggerData = JSON.parse((0, fs_1.readFileSync)(swaggerFile, 'utf-8'));
const useMiddlewares = (app) => {
    app.use((0, compression_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: '*',
        credentials: true
    }));
    app.use((0, morgan_1.default)('dev'));
    app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerData));
    app.use('/api', app_routes_1.appRoutes);
    app.use(ErrorHandler_1.erro404);
    app.use(ErrorHandler_1.errorMiddleware);
};
exports.useMiddlewares = useMiddlewares;
//# sourceMappingURL=middlewares.js.map