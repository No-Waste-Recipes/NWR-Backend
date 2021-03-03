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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield prisma.recipe.findMany();
    return res.status(200).json(recipes);
});
const getFilteredRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let ingredients = req.query.ingredients;
    let recipes = yield new models_1.RecipeModel().getFilteredRecipes(ingredients);
    return res.status(200).json({
        recipes
    });
});
const CreateRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, userId } = req.body;
    const result = yield prisma.recipe.create({
        data: {
            title: title,
            description,
            userId: userId,
        },
    });
    return res.status(200).json({
        result
    });
});
exports.default = { getAllRecipes, getFilteredRecipes, CreateRecipe };
//# sourceMappingURL=controller.js.map