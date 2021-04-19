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
                        id: true
                    }
                },
                ingredients: {
                    include: {
                        ingredient: true
                    }
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                id: true
                            }
                        }
                    }
                }
            }
        })
    }

    async getRecipes({ingredients}) {
        let ingredientListInt = []
        const payload = {
            where: {
                OR: undefined
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true
                    }
                },
            }
        }
        if(ingredients) {
            const whereAnd = []
            if (Array.isArray(ingredients) && ingredients.length > 1) {
                ingredients.forEach((id) => {
                    whereAnd.push({
                        ingredients: { some: { ingredientId: parseInt(id)}}
                    })
                    ingredientListInt.push(parseInt(id))
                })
            } else {
                whereAnd.push({
                    ingredients: { some: { ingredientId: parseInt(ingredients)}}
                })
                ingredientListInt.push(parseInt(ingredients))
            }
            payload.where.OR = whereAnd

            let ingredientsList = await prisma.ingredient.findMany({
                where: {
                    id: {
                        in: ingredientListInt
                    }
                }
            })

            return {'ingredients': ingredientsList, 'recipes': await prisma.recipe.findMany(payload) }
        }
        return {'recipes': await prisma.recipe.findMany() }



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

    async approveRecipes() {
        return await prisma.recipe.findMany({
            where: {
                status: "TO_BE_APPROVED"
            }
        })
    }

    async approveRecipe(slug: string, status) {
        return await prisma.recipe.update({
            where: {
                slug: slug
            },
            data: {
                status: status
            }
        })
    }

    async deleteRecipe({recipeId, user}) {
        const recipe = await prisma.recipe.findUnique({
            where: {
                id: parseInt(recipeId)
            }
        })

        if (recipe.userId == user.id || user.role == "ADMIN") {
            await  prisma.comment.deleteMany({
                where: {
                    recipeId: parseInt(recipeId)
                }
            })
            return await prisma.recipe.delete({
                where: {
                    id: parseInt(recipeId)
                }
            })
        }
        throw new Error()
    }

    async deleteComment({commentId, user}) {
        const comment = await prisma.comment.findUnique({
            where: {
                id: parseInt(commentId)
            }
        })

        if (comment.userId == user.id || user.role == "ADMIN") {
            return await prisma.comment.delete({
                where: {
                    id: parseInt(commentId)
                }
            })
        }
        throw new Error()
    }

    async createComment({slug, text, userId}) {
        const recipe = await prisma.recipe.findUnique({
            where: {
                slug: slug
            },
            select: {
                id: true
            }
        })

        return await prisma.comment.create({
            data: {
                recipeId: recipe.id,
                userId: userId,
                text: text,
            },
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })

    }


}
