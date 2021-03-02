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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const creatUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield hashPassword(req);
    const result = yield new models_1.UserModel().createUser(req.body);
    const json = result;
    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign({ user_id: json.insertId.toString() }, secretKey, { expiresIn: '24h' });
    res.status(201).send(token);
});
const hashPassword = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password) {
        req.body.password = yield bcrypt.hash(req.body.password, 8);
    }
});
exports.default = { creatUser };
//# sourceMappingURL=controller.js.map