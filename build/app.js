"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const middlewares_1 = require("./utils/middlewares");
const app = (0, express_1.default)();
(0, middlewares_1.useMiddlewares)(app);
exports.default = app;
