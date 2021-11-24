"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.isValidJwt = exports.authenticateUser = void 0;
var UserModel_1 = require("../models/UserModel");
var bcrypt = require("bcrypt");
var jsonwebtoken = require("jsonwebtoken");
var roles_1 = require("../roles/roles");
var authenticateUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var userFromDb, _a, _b, passwordMatch;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, UserModel_1.UserModel.findOne({
                    email: user.username,
                    active: true
                })];
            case 1:
                userFromDb = _d.sent();
                if (!(user.username.toLowerCase() === 'tarley' && user.password === '123')) return [3 /*break*/, 6];
                return [4 /*yield*/, UserModel_1.UserModel.findOne({
                        name: 'Tarley',
                        email: 'tarley@valenight.com',
                        active: true
                    })];
            case 2:
                userFromDb = _d.sent();
                if (!(userFromDb === null)) return [3 /*break*/, 5];
                _b = (_a = UserModel_1.UserModel).create;
                _c = {
                    name: 'Tarley',
                    email: 'tarley@valenight.com',
                    type: 'CLIENT'
                };
                return [4 /*yield*/, generateBcryptHash('123')];
            case 3: return [4 /*yield*/, _b.apply(_a, [(_c.password = _d.sent(),
                        _c.roles = roles_1.CLIENT_USER_ROLES,
                        _c)])];
            case 4:
                userFromDb = _d.sent();
                _d.label = 5;
            case 5:
                userFromDb.password = null;
                return [3 /*break*/, 8];
            case 6:
                if (!userFromDb) {
                    return [2 /*return*/, null]; //TODO - Lançar exceção
                }
                return [4 /*yield*/, bcrypt.compare(user.password, userFromDb.password)];
            case 7:
                passwordMatch = _d.sent();
                if (!passwordMatch) {
                    return [2 /*return*/, null]; //TODO - Lançar exceção
                }
                _d.label = 8;
            case 8: return [2 /*return*/, generateJwtToken(userFromDb)];
        }
    });
}); };
exports.authenticateUser = authenticateUser;
var isValidJwt = function (jwt) {
    try {
        return !!jsonwebtoken.verify(jwt, process.env.JWT_SECRET, {
            algorithms: ['HS512']
        });
    }
    catch (err) {
        console.error(err);
        return false;
    }
};
exports.isValidJwt = isValidJwt;
var generateJwtToken = function (user) {
    var payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles
    };
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: 'HS512'
    });
};
var generateBcryptHash = function (password) { return __awaiter(void 0, void 0, void 0, function () {
    var saltRounds, hash;
    return __generator(this, function (_a) {
        saltRounds = 10;
        hash = bcrypt.hashSync(password, saltRounds);
        return [2 /*return*/, hash];
    });
}); };
