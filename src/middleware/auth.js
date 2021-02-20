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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../user/models");
const HttpException = require("../utils/HttpException");
const jwt = require('jsonwebtoken');
dotenv_1.default.config();
const auth = () => {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers.authorization;
                const bearer = 'Bearer ';
                if (!authHeader || !authHeader.startsWith(bearer)) {
                    return res.status(401).send('Missing authentication');
                }
                const token = authHeader.replace(bearer, '');
                const secretKey = process.env.SECRET_JWT || "";
                const decoded = jwt.verify(token, secretKey);
                const user = yield new models_1.UserModel().getUser({ id: decoded.user_id });
                req.currentUser = user;
                next();
            }
            catch (e) {
                e.status = 401;
                next(e);
            }
        });
    };
};
module.exports = auth;
//# sourceMappingURL=auth.js.map