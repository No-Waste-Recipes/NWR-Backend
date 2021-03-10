import {NextFunction, Request, Response} from "express";
import {IngredientModel} from './models'
const ingredientModel = new IngredientModel()


const getIngredients = async (req: Request, res: Response, next: NextFunction) => {

    const ingredients = await ingredientModel.getIngredients(req.body)

    return res.status(200).json({
        ingredients
    });

}

export default {getIngredients}
