"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bearer = void 0;
const tslib_1 = require("tslib");
const deepmerge_1 = tslib_1.__importDefault(require("deepmerge"));
const bearer = params => (request, next) => {
    const token = params.token;
    return token
        ? next((0, deepmerge_1.default)(request, { headers: { Authorization: `Bearer ${params.token}` } }))
        : next(request);
};
exports.bearer = bearer;
