"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ValidationError = void 0;
var constants_1 = require("../interfaces/constants");
var BaseError_1 = require("./BaseError");
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(errors, name, statusCode, description) {
        if (name === void 0) { name = 'Erro de validação'; }
        if (statusCode === void 0) { statusCode = constants_1.httpStatusCodes.BAD_REQUEST; }
        if (description === void 0) { description = 'Ocorreram erros de validação'; }
        var _this = _super.call(this, name, statusCode, description) || this;
        _this.errors = errors;
        return _this;
    }
    return ValidationError;
}(BaseError_1.BaseError));
exports.ValidationError = ValidationError;