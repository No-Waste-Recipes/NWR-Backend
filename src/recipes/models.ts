import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export class RecipeModel {

    async getAllRecipes() {
        return await prisma.recipe.findMany()
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
