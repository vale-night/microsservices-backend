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
exports.NotFoundError = void 0;
var constants_1 = require("../interfaces/constants");
var BaseError_1 = require("./BaseError");
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(name, statusCode, description) {
        if (name === void 0) { name = 'Recurso não encontrado'; }
        if (statusCode === void 0) { statusCode = constants_1.httpStatusCodes.NOT_FOUND; }
        if (description === void 0) { description = 'O recurso desejado não foi encontrado'; }
        return _super.call(this, name, statusCode, description) || this;
    }
    return NotFoundError;
}(BaseError_1.BaseError));
exports.NotFoundError = NotFoundError;
