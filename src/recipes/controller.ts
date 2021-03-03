import {NextFunction, Request, Response} from "express";
import {RecipeModel} from './models'
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

const getAllRecipes = async (req: Request, res: Response, next: NextFunction) => {
    const recipes = await prisma.recipe.findMany()
    return res.status(200).json(recipes)
}

const getFilteredRecipes =  async (req: Request, res: Response, next: NextFunction) => {

    let ingredients = req.query.ingredients

    let recipes = await new RecipeModel().getFilteredRecipes(ingredients);

    return res.status(200).json({
        recipes
    })
}

const CreateRecipe = async (req: Request, res: Response, next: NextFunction) => {

    const { title, description, userId } = req.body
    const result = await prisma.recipe.create({
        data: {
            title: title,
            description,
            userId: userId,
        },
    })

    return res.status(200).json({
        result
    })
}

export default {getAllRecipes, getFilteredRecipes, CreateRecipe}
