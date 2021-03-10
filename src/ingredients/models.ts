import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export class IngredientModel {

    async getIngredients({ name, excluded }) {
        return await prisma.ingredient.findMany({
            where: {
                name: {
                    contains: name
                },
                id: {
                    notIn: excluded
                }
            }
        })
    }

}
