import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export class IngredientModel {

    async getIngredients({ name, excluded }) {
        let array = []
        if (excluded) {
            const arr = excluded.split(',');
            arr.forEach((id) => {
                array.push(parseInt(id))
            })
        }
        return await prisma.ingredient.findMany({
            where: {
                name: {
                    contains: name
                },
                id: {
                    notIn: array
                }
            }
        })
    }

}
