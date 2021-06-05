import prisma from "../../client";

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

    public async updateUser(userId, {email, username, first_name, last_name, description}) {
        return await prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
                email,
                username,
                first_name,
                last_name,
                description,
            },
        });
    }

    public async updateUserPassword(userId, password){
        return await prisma.user.update({
            where: {id: parseInt(userId)},
            data:{
                password
            }
        })
    }

    public async getUserByEmail({email}) {
        return await prisma.user.findUnique({
            where: {email},
        });
    }

    public async deleteUser({id}) {
        return await prisma.user.delete( {where: { id }} );
    }

    public async loginUser({ email, password: pass}) {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    public async getUser({id}) {
        return await prisma.user.findFirst( {where: { id},
            select:{
                id:true,
                email: true,
                username: true,
                first_name:true,
                last_name:true,
                description:true,
            }});
    }

    public async getMyRecipes({userId}) {
        return await prisma.recipe.findMany( {where: {userId}} );
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

        if (duplicateCheck.length == 0) {
            return await prisma.favorite.create({
                data: {
                    recipeId,
                    userId,
                },
            });
        } else {
            await this.deleteFavoriteRecipe({userId, recipeId});
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

    public async findFavoriteRecipe({userId, recipeId}) {
        return await prisma.favorite.findMany({
            where: {
                userId,
                recipeId: parseInt(recipeId),
            },
        });
    }

    public async getAllUsers() {
        return await prisma.user.findMany();
    }
}
