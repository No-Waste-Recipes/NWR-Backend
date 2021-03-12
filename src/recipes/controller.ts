import {NextFunction, Request, Response} from "express";
import {RecipeModel} from './models'
const recipe = new RecipeModel()

const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
    const recipes = await recipe.getRecipes({ingredients: req.query.ingredients});
    return res.status(200).json({recipes})
}

const getPopularRecipes = async (req: Request, res: Response, next: NextFunction) => {
    const recipes = await recipe.getPopularRecipes();

    return res.status(200).json({
        recipes
    });
}

const CreateRecipe = async (req: Request, res: Response, next: NextFunction) => {
    const result = await recipe.createRecipe(req.body)

    return res.status(200).json({
        result
    })
}

const getRecipe = async (req: Request, res: Response, next: NextFunction) => {
    const result = await recipe.getRecipe({slug: req.params.slug})

    return res.status(200).json({
        result
    })
}

export default {getRecipes, CreateRecipe, getPopularRecipes, getRecipe}
