"use strict";
exports.__esModule = true;
exports.UserModel = exports.USER_TYPES = void 0;
var mongoose_1 = require("mongoose");
var roles_1 = require("../roles/roles");
exports.USER_TYPES = {
    'CLIENT': {
        nomeAmigavel: 'Cliente'
    },
    'ORGANIZER': {
        nomeAmigavel: 'Organizador'
    }
};
var schema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    cpf: { type: String, required: false },
    fantasyName: { type: String, required: false },
    cnpj: { type: String, required: false },
    socialReason: { type: String, required: false },
    rg: { type: String, required: false },
    birthDate: { type: Date, required: false },
    roles: { type: [], required: true, "default": roles_1.CLIENT_USER_ROLES },
    active: { type: Boolean, required: true, "default": true }
});
exports.UserModel = (0, mongoose_1.model)('user', schema, 'users');
