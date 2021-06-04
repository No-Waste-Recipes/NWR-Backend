import {NextFunction, Request, Response} from "express";
import {RecipeModel} from './models'
const recipe = new RecipeModel()

const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
    const recipes = await recipe.getRecipes({ingredients: req.query.ingredient});
    return res.status(200).json(recipes)
}

const getPopularRecipes = async (req: Request, res: Response, next: NextFunction) => {
    const recipes = await recipe.getPopularRecipes();

    return res.status(200).json({
        recipes
    });
}

const CreateRecipe = async (req: any, res: Response, next: NextFunction) => {
    const result = await recipe.createRecipe(req.body, req.currentUser.id, req.res.req.file.filename)

    return res.status(200).json({
        result
    })
}

const updateRecipe = async (req: any, res: Response, next: NextFunction) => {
    console.log(req.res.req.file.filename + '.....controller') 
    const result = await recipe.updateRecipe(req.body, req.currentUser.id, req.res.req.file.filename, req.params.slug)
    
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

const deleteRecipe = async (req: any, res: Response, next: NextFunction) => {
    const result = await recipe.deleteRecipe({recipeId: req.params.id, user: req.currentUser})

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

const deleteComment = async (req: any, res: Response, next: NextFunction) => {
    const deleteComment = await recipe.deleteComment({commentId: req.params.id, user: req.currentUser})
        .catch(() => {
            return res.status(401).json()
        })

    return res.status(200).json({
        deleteComment
    })
}

const getApproveRecipes = async (req: any, res: Response, next: NextFunction) => {
    const result = await recipe.approveRecipes();

    return res.status(200).json({
        result
    })
}

const approveRecipe = async (req: any, res: Response, next: NextFunction) => {
    const result = await recipe.approveRecipe(req.params.slug, req.body.status);

    return res.status(200).json({
        result
    })
}

export default {getRecipes, CreateRecipe, getPopularRecipes, getRecipe, createComment, getApproveRecipes, approveRecipe, deleteComment, deleteRecipe, updateRecipe}
