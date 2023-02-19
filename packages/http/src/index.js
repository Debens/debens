"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = void 0;
const tslib_1 = require("tslib");
const http_1 = require("./http");
Object.defineProperty(exports, "http", { enumerable: true, get: function () { return http_1.http; } });
tslib_1.__exportStar(require("./model"), exports);
exports.default = http_1.http;
