import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export class UserModel {

    public async createUser({ email, username, password, first_name, last_name, description }) {
        return await prisma.user.create({
            data: {
                email,
                username,
                password,
                first_name,
                last_name,
                description,
            },
        });
    }

    public async loginUser({ email, password: pass}) {
        return await prisma.user.findUnique({
            where: {
                email,
            }
        });
    }

    public async getUser({id}) {
        return await prisma.user.findFirst( {where: { id}} );
    }

    public async getFavoriteRecipes({ id }) {
        return await prisma.favorite.findMany({
            where: {
                userId: id,
            },
            include: {
                recipe: true,
            },
        });
    }

    public async setFavoriteRecipe({ userId, recipeId }) {
        const duplicateCheck = await prisma.favorite.findMany({
            where: {
                userId,
                recipeId,
            },
        });

        if (duplicateCheck.length === 0) {
            return await prisma.favorite.create({
                data: {
                    recipeId,
                    userId,
                },
            });
        }
    }

    public async deleteFavoriteRecipe({ userId, recipeId }) {
        return await prisma.favorite.deleteMany({
            where: {
                userId,
                recipeId,
            },
        });
    }
}
