import {NextFunction, Request, Response} from "express";
import {RecipeModel} from './models'
const recipe = new RecipeModel()

const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
    const recipes = await recipe.getRecipes({ingredients: req.query.ingredient});
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

const createComment =  async (req: any, res: Response, next: NextFunction) => {
    const comment = await recipe.createComment({slug: req.params.slug, text: req.body.text, userId: req.currentUser.id})

    return res.status(200).json({
        comment
    })
}

export default {getRecipes, CreateRecipe, getPopularRecipes, getRecipe, createComment}
