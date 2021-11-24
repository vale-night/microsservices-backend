"use strict";
exports.__esModule = true;
exports.handler = void 0;
var serverlessExpress = require('@vendia/serverless-express');
var app = require("./index");
exports.handler = serverlessExpress({ app: app });
