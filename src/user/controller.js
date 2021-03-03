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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const creatUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield hashPassword(req);
    const { email, username, password, first_name, last_name, description } = req.body;
    const result = yield prisma.user.create({
        data: {
            email,
            username,
            password,
            first_name,
            last_name,
            description
        },
    });
    res.status(201).send(result);
});
const hashPassword = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password) {
        req.body.password = yield bcrypt.hash(req.body.password, 8);
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password: pass } = req.body;
    const user = yield prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user && !pass) {
        return res.status(401).send("User doesn't exist");
    }
    const isMatch = yield bcrypt.compare(pass, user.password);
    if (!isMatch) {
        return res.status(401).send('Email or password is wrong');
    }
    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
        expiresIn: '24h'
    });
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    res.send({ user: Object.assign({}, userWithoutPassword), token });
});
exports.default = { creatUser, loginUser };
//# sourceMappingURL=controller.js.map