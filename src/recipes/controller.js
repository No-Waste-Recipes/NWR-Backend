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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield prisma.recipe.findMany();
    return res.status(200).json(recipes);
});
const getFilteredRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ingredients } = req.body;
    // let recipes = await new RecipeModel().getFilteredRecipes(ingredients);
    // return res.status(200).json({
    //     recipes
    // })
});
const getPopularRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield prisma.recipe.findMany({
        orderBy: [
            {
                popularity: 'desc',
            },
        ],
        take: 5
    });
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
exports.default = { getAllRecipes, getFilteredRecipes, CreateRecipe, getPopularRecipes };
//# sourceMappingURL=controller.js.map