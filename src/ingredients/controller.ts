import {NextFunction, Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

const getIngredientsByName = async (req: Request, res: Response, next: NextFunction) => {
    const { name, excluded } = req.body

    const ingredients = await prisma.ingredient.findMany({
        where: {
            name: {
                contains: name
            },
            id: {
                notIn: [excluded]
            }
        }
    })

    return res.status(200).json({
        ingredients
    });

}

export default {getIngredients: getIngredientsByName}
