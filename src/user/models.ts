import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export class UserModel {

    public async createUser({ email, username, password, first_name, last_name, description }) {
        return await prisma.user.create({
            data: {
                email,
                username,
                password,
                first_name,
                last_name,
                description
            },
        });
    }

    public async updateUser(userId,{email,username,first_name,last_name,description}){
        return await prisma.user.update({
            where: { id: parseInt(userId) },
            data:{
                email,
                username,
                first_name,
                last_name,
                description,
            }
        })
    }

    public async deleteUser({id}) {
        return await prisma.user.delete( {where: { id }} );
    }

    public async loginUser({ email, password: pass}) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    public async getUser({id}) {
        return await prisma.user.findFirst( {where: { id}} );
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
