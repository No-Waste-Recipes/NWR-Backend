import {NextFunction, Request, Response} from "express";
import {RecipeModel} from './models'

const getAllRecipes = async (req: Request, res: Response, next: NextFunction) => {

    let recipes = await new RecipeModel().getAllRecipes();

    return res.status(200).json({
        recipes
    });

}

const getPopularRecipes = async (req: Request, res: Response, next: NextFunction) => {
    let recipes = await new RecipeModel().getPopularRecipes();

    return res.status(200).json({
        recipes
    });
}

const getFilteredRecipes =  async (req: Request, res: Response, next: NextFunction) => {

    let ingredients = req.query.ingredients

    let recipes = await new RecipeModel().getFilteredRecipes(ingredients);

    return res.status(200).json({
        recipes
    })
}

export default {getAllRecipes, getFilteredRecipes, getPopularRecipes}
