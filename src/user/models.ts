import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export class UserModel {

    async createUser({ email, username, password, first_name, last_name, description }){
        return await prisma.user.create({
            data: {
                email,
                username,
                password,
                first_name,
                last_name,
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
        return await prisma.userRecipe.findMany({
            where: {
                userId: id
            },
            include: {
                recipe: true
            }
        })
    }
}
