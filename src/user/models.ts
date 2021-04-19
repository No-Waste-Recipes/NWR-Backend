import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export class UserModel {

    async createUser({ email, username, password, firstName, lastName, description }){
        return await prisma.user.create({
            data: {
                email,
                username,
                password,
                first_name: firstName,
                last_name: lastName,
                description
            },
        })
    }

    async loginUser({ email, password: pass}) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async getFavoriteRecipes({ id }) {
        return await prisma.favorite.findMany({
            where: {
                userId: id
            },
            include: {
                recipe: true
            }
        })
    }

    async setFavoriteRecipe({ userId, recipeId }) {
        let duplicateCheck = await prisma.favorite.findMany({
            where: {
                userId: userId,
                recipeId: recipeId
            },
        });

        if (duplicateCheck.length == 0) {
            return await prisma.favorite.create({
                data: {
                    recipeId,
                    userId
                },
            })
        } else {
            await this.deleteFavoriteRecipe({userId, recipeId})
        }
    }

    async deleteFavoriteRecipe({ userId, recipeId }) {
        return await prisma.favorite.deleteMany({
            where: {
                userId: userId,
                recipeId: recipeId
            }
        })
    }

    async findFavoriteRecipe({userId, recipeId}) {
        return await prisma.favorite.findMany({
            where: {
                userId: userId,
                recipeId: parseInt(recipeId)
            },
        });
    }
}
