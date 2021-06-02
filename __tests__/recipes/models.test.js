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
const models_1 = require("../../src/recipes/models");
const Status = require('../../src/utils/recipeStatus');
const Role = require('../../src/utils/userRoles');
const recipeModel = new models_1.RecipeModel();
test('should create new recipe', () => __awaiter(void 0, void 0, void 0, function* () {
    const recipeControl = {
        id: 46,
        title: 'Uiensoep',
        slug: 'Uiensoep',
        description: 'Uiensoep',
        userId: 6,
        status: Status.toBeApproved,
        popularity: 33,
        photo: `uploads/rijst-kip.jpg`
    };
    const recipe = {
        title: 'Uiensoep',
        description: 'Uiensoep',
        ingredients: JSON.stringify([1, 2])
    };
    const userId = 6;
    const file_name = 'uploads/uiensoep.jpg';
    //prismaMock.recipe.create.mockResolvedValue(recipeControl)
    yield expect(recipeModel.createRecipe(recipe, userId, file_name)).resolves.toEqual(recipeControl);
}));
//# sourceMappingURL=models.test.js.map