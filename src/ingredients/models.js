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
exports.IngredientModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class IngredientModel {
    getIngredients({ name, excluded }) {
        return __awaiter(this, void 0, void 0, function* () {
            let array = [];
            const arr = excluded.split(',');
            arr.forEach((id) => {
                array.push(parseInt(id));
            });
            return yield prisma.ingredient.findMany({
                where: {
                    name: {
                        contains: name
                    },
                    id: {
                        notIn: array
                    }
                }
            });
        });
    }
}
exports.IngredientModel = IngredientModel;
//# sourceMappingURL=models.js.map