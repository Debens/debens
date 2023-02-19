"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = void 0;
const http_client_1 = require("./http-client");
const modules_1 = require("./modules");
// eslint-disable-next-line @typescript-eslint/no-namespace
var http;
(function (http) {
    http.client = new http_client_1.HTTPClient();
    http.modules = modules_1.modules;
})(http = exports.http || (exports.http = {}));
