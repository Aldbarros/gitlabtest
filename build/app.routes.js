"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const express_1 = require("express");
const notes_routes_1 = require("./services/notes.routes");
exports.appRoutes = (0, express_1.Router)();
exports.appRoutes.use('/notes', notes_routes_1.roteadorNotes);
