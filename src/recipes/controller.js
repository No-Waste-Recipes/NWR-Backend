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
    const recipes = yield recipe.getAllRecipes();
    return res.status(200).json(recipes);
});
const getPopularRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield recipe.getPopularRecipes();
    return res.status(200).json({
        recipes
    });
});
const CreateRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe.createRecipe(req.body);
    return res.status(200).json({
        result
    });
});
exports.default = { getRecipes, CreateRecipe, getPopularRecipes };
//# sourceMappingURL=controller.js.map