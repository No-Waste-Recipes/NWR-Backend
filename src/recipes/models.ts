import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()
import slugify from "slugify"

export class RecipeModel {

    async getRecipe({slug}) {
        return await prisma.recipe.findUnique({
            where: {
                slug: slug,
            },
            include: {
                user: {
                    select: {
                        username: true,
                    }
                },
                ingredient: {
                    include: {
                        ingredients: true
                    }
                }
            }
        })
    }

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
                slug: slugify(title),
                description,
                userId: userId,
            },
        })
    }

}
