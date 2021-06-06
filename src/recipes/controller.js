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
const recipe = new models_1.RecipeModel();
const getRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield recipe.getRecipes({ ingredients: req.query.ingredient });
    return res.status(200).json(recipes);
});
const getPopularRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield recipe.getPopularRecipes();
    return res.status(200).json({
        recipes
    });
});
const CreateRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe.createRecipe(req.body, req.currentUser.id, req.res.req.file.filename);
    return res.status(200).json({
        result
    });
});
const updateRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe.updateRecipe(req.body, req.currentUser.id, req.file.filename, req.params.slug);
    return res.status(200).json({
        result
    });
});
const getRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe.getRecipe({ slug: req.params.slug });
    return res.status(200).json({
        result
    });
});
const deleteRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe.deleteRecipe({ recipeId: req.params.id, user: req.currentUser });
    return res.status(200).json({
        result
    });
});
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield recipe.createComment({ slug: req.params.slug, text: req.body.text, userId: req.currentUser.id });
    return res.status(200).json({
        comment
    });
});
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteComment = yield recipe.deleteComment({ commentId: req.params.id, user: req.currentUser })
        .catch(() => {
        return res.status(401).json();
    });
    return res.status(200).json({
        deleteComment
    });
});
const getApproveRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe.approveRecipes();
    return res.status(200).json({
        result
    });
});
const approveRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe.approveRecipe(req.params.slug, req.body.status);
    return res.status(200).json({
        result
    });
});
exports.default = { getRecipes, CreateRecipe, getPopularRecipes, getRecipe, createComment, getApproveRecipes, approveRecipe, deleteComment, deleteRecipe, updateRecipe };
//# sourceMappingURL=controller.js.map