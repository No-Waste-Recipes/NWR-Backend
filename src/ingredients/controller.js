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
const ingredientModel = new models_1.IngredientModel();
const getIngredients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredients = yield ingredientModel.getIngredients({ name: req.query.ingredients,
        excluded: req.query.excluded });
    return res.status(200).json({
        ingredients
    });
});
exports.default = { getIngredients };
//# sourceMappingURL=controller.js.map