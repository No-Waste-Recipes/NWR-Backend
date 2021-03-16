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
exports.RecipeModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const slugify_1 = __importDefault(require("slugify"));
class RecipeModel {
    getRecipe({ slug }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recipe.findUnique({
                where: {
                    slug: slug,
                },
                include: {
                    user: {
                        select: {
                            username: true,
                        }
                    },
                    ingredients: {
                        include: {
                            ingredient: true
                        }
                    },
                    comments: {
                        include: {
                            user: {
                                select: {
                                    username: true
                                }
                            }
                        }
                    }
                }
            });
        });
    }
    getRecipes({ ingredients }) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                where: {
                    AND: undefined
                }
            };
            console.log(ingredients);
            if (ingredients) {
                const whereAnd = [];
                if (ingredients.length > 1) {
                    ingredients.forEach((id) => {
                        whereAnd.push({
                            ingredients: { some: { ingredientId: parseInt(id) } }
                        });
                    });
                }
                else {
                    whereAnd.push({
                        ingredients: { some: { ingredientId: parseInt(ingredients) } }
                    });
                }
                payload.where.AND = whereAnd;
            }
            return yield prisma.recipe.findMany(payload);
        });
    }
    getPopularRecipes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recipe.findMany({
                orderBy: [
                    {
                        popularity: 'desc',
                    },
                ],
                take: 5
            });
        });
    }
    createRecipe({ title, description, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recipe.create({
                data: {
                    title: title,
                    slug: slugify_1.default(title),
                    description,
                    userId: userId,
                },
            });
        });
    }
    createComment({ slug, text, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipe = yield prisma.recipe.findUnique({
                where: {
                    slug: slug
                },
                select: {
                    id: true
                }
            });
            return yield prisma.comment.create({
                data: {
                    recipeId: recipe.id,
                    userId: userId,
                    text: text,
                },
                include: {
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            });
        });
    }
}
exports.RecipeModel = RecipeModel;
//# sourceMappingURL=models.js.map