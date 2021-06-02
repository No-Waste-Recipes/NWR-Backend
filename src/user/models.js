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
exports.UserModel = void 0;
const client_1 = __importDefault(require("../../client"));
class UserModel {
    createUser({ email, username, password, first_name, last_name, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.user.create({
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
    updateUser(userId, { email, username, first_name, last_name, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.user.update({
                where: { id: parseInt(userId) },
                data: {
                    email,
                    username,
                    first_name,
                    last_name,
                    description,
                }
            });
        });
    }
    getUserByEmail({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.user.findUnique({
                where: { email }
            });
        });
    }
    deleteUser({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.user.delete({ where: { id } });
        });
    }
    loginUser({ email, password: pass }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.user.findUnique({
                where: {
                    email
                }
            });
        });
    }
    getUser({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.user.findFirst({ where: { id } });
        });
    }
    getMyRecipes({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recipe.findMany({ where: { userId } });
        });
    }
    getFavoriteRecipes({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.favorite.findMany({
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
            let duplicateCheck = yield client_1.default.favorite.findMany({
                where: {
                    userId: userId,
                    recipeId: recipeId
                },
            });
            if (duplicateCheck.length == 0) {
                return yield client_1.default.favorite.create({
                    data: {
                        recipeId,
                        userId
                    },
                });
            }
            else {
                yield this.deleteFavoriteRecipe({ userId, recipeId });
            }
        });
    }
    deleteFavoriteRecipe({ userId, recipeId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.favorite.deleteMany({
                where: {
                    userId: userId,
                    recipeId: recipeId
                }
            });
        });
    }
    findFavoriteRecipe({ userId, recipeId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.favorite.findMany({
                where: {
                    userId: userId,
                    recipeId: parseInt(recipeId)
                },
            });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.user.findMany();
        });
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=models.js.map