"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const http_1 = require("http");
const path_1 = require("path");
const app_1 = tslib_1.__importDefault(require("./app"));
dotenv_1.default.config({ path: (0, path_1.resolve)(__dirname, '..', '.env') });
const startServer = () => {
    const porta = process.env.PORT ?? 4343;
    const servidor = (0, http_1.createServer)(app_1.default);
    servidor.listen(porta, () => {
        console.log(`Servidor sendo executado na porta ${porta}`);
    });
};
startServer();
//# sourceMappingURL=server.js.map