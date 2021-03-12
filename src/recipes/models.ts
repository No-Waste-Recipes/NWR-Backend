import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export class RecipeModel {

    async getRecipes({ingredients}) {
        const payload = {
            where: {
                AND: undefined
            }
        }
        if(ingredients) {
            const whereAnd = []
            if (ingredients.length > 1) {
                ingredients.forEach((id) => {
                    whereAnd.push({
                        ingredient: { some: { ingredientId: parseInt(id)}}
                    })
                })
            } else {
                whereAnd.push({
                    ingredient: { some: { ingredientId: parseInt(ingredients)}}
                })
            }
            payload.where.AND = whereAnd
        }
        return await prisma.recipe.findMany(payload)

    }

    async getPopularRecipes() {
        return await prisma.recipe.findMany({
            orderBy: [
                {
                    popularity: 'desc',
                },
            ],
            take: 5
        })
    }

    async createRecipe({ title, description, userId }) {
        return await prisma.recipe.create({
            data: {
                title: title,
                description,
                userId: userId,
            },
        })
    }

}
