"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesDBinst = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.notesDBinst = prisma.nota;
//# sourceMappingURL=dbInstances.js.map