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
const client_2 = require("@prisma/client");
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
                            id: true
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
                                    username: true,
                                    id: true
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
            if (ingredients) {
                const ids = [];
                if (Array.isArray(ingredients) && ingredients.length > 1) {
                    ingredients.forEach((id) => {
                        ids.push(parseInt(id));
                    });
                }
                else {
                    ids.push(parseInt(ingredients));
                }
                const recipes = yield prisma.$queryRaw `SELECT r.* FROM recipe r join recipeingredients ri on ri.recipeId = r.id where ri.ingredientId in (${client_2.Prisma.join(ids)}) group by r.id order by ri.ingredientId DESC`;
                let ingredientsList = yield prisma.ingredient.findMany({
                    where: {
                        id: {
                            in: ids
                        }
                    }
                });
                return { 'ingredients': ingredientsList, 'recipes': recipes };
            }
            return { 'recipes': yield prisma.recipe.findMany() };
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
    createRecipe({ title, description, ingredients }, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipe = yield prisma.recipe.create({
                data: {
                    title: title,
                    slug: slugify_1.default(title),
                    description,
                    userId: userId,
                },
            });
            for (let ingredient of ingredients) {
                yield prisma.recipeIngredients.create({
                    data: {
                        recipeId: recipe.id, ingredientId: ingredient.id
                    }
                });
            }
            return recipe;
        });
    }
    approveRecipes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recipe.findMany({
                where: {
                    status: "TO_BE_APPROVED"
                }
            });
        });
    }
    approveRecipe(slug, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recipe.update({
                where: {
                    slug: slug
                },
                data: {
                    status: status
                }
            });
        });
    }
    deleteRecipe({ recipeId, user }) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipe = yield prisma.recipe.findUnique({
                where: {
                    id: parseInt(recipeId)
                }
            });
            if (recipe.userId == user.id || user.role == "ADMIN") {
                yield prisma.recipeIngredients.deleteMany({
                    where: {
                        recipeId: parseInt(recipeId)
                    }
                });
                yield prisma.favorite.deleteMany({
                    where: {
                        recipeId: parseInt(recipeId)
                    }
                });
                yield prisma.comment.deleteMany({
                    where: {
                        recipeId: parseInt(recipeId)
                    }
                });
                return yield prisma.recipe.delete({
                    where: {
                        id: parseInt(recipeId)
                    }
                });
            }
        });
    }
    deleteComment({ commentId, user }) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield prisma.comment.findUnique({
                where: {
                    id: parseInt(commentId)
                }
            });
            if (comment.userId == user.id || user.role == "ADMIN") {
                return yield prisma.comment.delete({
                    where: {
                        id: parseInt(commentId)
                    }
                });
            }
            throw new Error();
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