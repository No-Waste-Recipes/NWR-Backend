import { prismaMock } from '../../singleton'
import {RecipeModel} from "../../src/recipes/models";
const Status = require('../../src/utils/recipeStatus');
const Role = require('../../src/utils/userRoles');
const recipeModel = new RecipeModel();

test('should create new recipe', async () => {
    const recipeControl = {
        id: 46,
        title: 'Uiensoep',
        slug: 'Uiensoep',
        description: 'Uiensoep',
        userId: 6,
        status: Status.toBeApproved,
        popularity: 33,
        photo: `uploads/rijst-kip.jpg`
    }

    const recipe = {
        title: 'Uiensoep',
        description: 'Uiensoep',
        ingredients: JSON.stringify([1, 2])
    }

    const userId = 6
    const file_name = 'uploads/uiensoep.jpg'

    //prismaMock.recipe.create.mockResolvedValue(recipeControl)

    await expect(recipeModel.createRecipe(recipe, userId, file_name)).resolves.toEqual(recipeControl)
})
