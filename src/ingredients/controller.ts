import {NextFunction, Request, Response} from "express";
import {IngredientModel} from './models'

const getIngredientsByName = async (req: Request, res: Response, next: NextFunction) => {

    let searchParameter = req.query.query;
    let ingredients = await new IngredientModel().getIngredients(searchParameter);

    return res.status(200).json({
        ingredients
    });

}

export default {getIngredients: getIngredientsByName}
