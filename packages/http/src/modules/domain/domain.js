"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domain = void 0;
const domain = domain => (request, next) => next(Object.assign(request, { url: domain + request.url }));
exports.domain = domain;
