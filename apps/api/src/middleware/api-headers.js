"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiHeaders = void 0;
var cors_1 = require("hono/cors");
exports.apiHeaders = (0, cors_1.cors)({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
});
