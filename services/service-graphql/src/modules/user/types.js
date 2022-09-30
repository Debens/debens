"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
let User = class User {
    constructor(id) {
        this.id = id;
    }
    id;
};
tslib_1.__decorate([
    (0, type_graphql_1.Field)(_type => type_graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
User = tslib_1.__decorate([
    (0, type_graphql_1.ObjectType)(),
    tslib_1.__metadata("design:paramtypes", [String])
], User);
exports.User = User;
