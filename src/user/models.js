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
exports.UserModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserModel {
    createUser({ email, username, password, first_name, last_name, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.create({
                data: {
                    email,
                    username,
                    password,
                    first_name,
                    last_name,
                    description
                },
            });
        });
    }
    loginUser({ email, password: pass }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
                where: {
                    email
                }
            });
        });
    }
    getFavoriteRecipes({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.favorite.findMany({
                where: {
                    userId: id
                },
                include: {
                    recipe: true
                }
            });
        });
    }
    setFavoriteRecipe({ userId, recipeId }) {
        return __awaiter(this, void 0, void 0, function* () {
            let duplicateCheck = yield prisma.favorite.findMany({
                where: {
                    userId: userId,
                    recipeId: recipeId
                },
            });
            if (duplicateCheck.length == 0) {
                return yield prisma.favorite.create({
                    data: {
                        recipeId,
                        userId
                    },
                });
            }
        });
    }
    deleteFavoriteRecipe({ userId, recipeId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.favorite.deleteMany({
                where: {
                    userId: userId,
                    recipeId: recipeId
                }
            });
        });
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=models.js.map