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
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models_1 = require("./models");
const userModel = new models_1.UserModel();
const creatUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel.getUserByEmail(req.body);
    if (user) {
        return res.status(201).send({ errors: [{ email: "email already exists" }] });
    }
    yield hashPassword(req);
    const result = yield userModel.createUser(req.body);
    return res.status(201).send(result);
});
const hashPassword = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password) {
        req.body.password = yield bcrypt.hash(req.body.password, 8);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password != null && req.body.newPassword != null) {
        const isMatch = yield bcrypt.compare(req.body.password, req.currentUser.password);
        if (isMatch) {
            const newPassword = yield bcrypt.hash(req.body.newPassword, 8);
            yield userModel.updateUserPassword(req.currentUser.id, newPassword);
        }
        if (!isMatch) {
            return res.status(403).json("Password is wrong");
        }
    }
    const user = yield userModel.updateUser(req.currentUser.id, Object.assign({}, req.body));
    return res.status(200).json({ user });
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel.deleteUser({ id: req.currentUser.id });
    return res.status(200).json({
        user,
    });
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password: pass } = req.body;
    const user = yield userModel.loginUser(req.body);
    if (!user && !pass) {
        return res.status(401).send("User doesn't exist");
    }
    const isMatch = yield bcrypt.compare(pass, user.password);
    if (!isMatch) {
        return res.status(401).send("Email or password is wrong");
    }
    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
        expiresIn: "24h",
    });
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    res.send({ user: Object.assign({}, userWithoutPassword), token });
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel.getUser({ id: req.currentUser.id });
    return res.status(200).json({
        user,
    });
});
const getMyRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield userModel.getMyRecipes({ userId: req.currentUser.id });
    return res.status(200).json({
        recipes,
    });
});
const getFavoriteRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield userModel.getFavoriteRecipes({ id: req.currentUser.id });
    return res.status(200).json({
        recipes,
    });
});
const setFavoriteRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield userModel.setFavoriteRecipe({ userId: req.currentUser.id, recipeId: req.body.recipeId });
    return res.status(200).json({
        recipes,
    });
});
const deleteFavoriteRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield userModel.deleteFavoriteRecipe({ userId: req.currentUser.id, recipeId: req.body.recipeId });
    return res.status(200).json({
        recipes,
    });
});
const findFavoriteRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield userModel.findFavoriteRecipe({ userId: req.currentUser.id, recipeId: req.params.id });
    return res.status(200).json({
        recipes,
    });
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.currentUser.role === "ADMIN") {
        const users = yield userModel.getAllUsers();
        return res.status(200).json({
            users,
        });
    }
    else {
        return res.status(401);
    }
});
const deleteSpecificUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.currentUser.role === "ADMIN") {
        const user = yield userModel.deleteUser({ id: parseInt(req.params.id) });
        return res.status(200).json({
            user,
        });
    }
    else {
        return res.status(401);
    }
});
exports.default = { creatUser, loginUser, getMyRecipes, getFavoriteRecipes, setFavoriteRecipe, deleteFavoriteRecipe,
    findFavoriteRecipe, getUser, deleteUser, updateUser, getAllUsers, deleteSpecificUser };
//# sourceMappingURL=controller.js.map