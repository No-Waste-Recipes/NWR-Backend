import prisma from '../../client'
import { Prisma } from "@prisma/client";
import slugify from "slugify"

export class RecipeModel {

    async getRecipe({slug}) {
        const recipe = await prisma.recipe.findUnique({
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

        await prisma.recipe.update({
            where: {
                slug: slug,
            },
            data: {
                popularity: {
                    increment: 1,
                }
            }
        })

        return recipe
    }

    async getRecipes({ingredients}) {
        if(ingredients) {
            const ids = []
            if (Array.isArray(ingredients) && ingredients.length > 1) {
                ingredients.forEach((id) => {
                    ids.push(parseInt(id))
                })
            } else {
                ids.push(parseInt(ingredients))
            }
            const recipes = await prisma.$queryRaw`SELECT r.* FROM recipe r join recipeingredients ri on ri.recipeId = r.id where ri.ingredientId in (${Prisma.join(ids)}) group by r.id order by ri.ingredientId DESC`;

            let ingredientsList = await prisma.ingredient.findMany({
                where: {
                    id: {
                        in: ids
                    }
                }
            })

            return {'ingredients': ingredientsList, 'recipes': recipes }
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

    async createRecipe({ title, description, ingredients}, userId, file_name) {
        const recipe = await prisma.recipe.create({
            data: {
                title: title,
                slug: slugify(title),
                description,
                userId: userId,
                photo: `uploads/${file_name}`
            },
        })
        for(let ingredient of JSON.parse(ingredients)){
            await prisma.recipeIngredients.create({
                data: {
                    recipeId: recipe.id, ingredientId: ingredient.id
                }
            })
        }
        return recipe
    }

    async updateRecipe({ title, description, ingredients},slug: string, file_name?) {
        if(file_name == undefined){
            await prisma.recipe.updateMany({
                where: {
                     slug: slug
                },
                data: {
                    title: title,
                    description,
                }
     
             })
        } else {
            await prisma.recipe.update({
                where: {
                     slug: slug
                },
                data: {
                    title: title,
                    description,
                    photo: `uploads/${file_name}`
                }
             })
        }

        const recipe = await prisma.recipe.findFirst({
            where: {
                slug: slug
            }
        })

        // delete ingredients
        await prisma.recipeIngredients.deleteMany({
            where: {
                recipeId: recipe.id
            }
        })

        // create ingredients again.
        for(let ingredient of JSON.parse(ingredients)){
            await prisma.recipeIngredients.create({
                data: {
                    recipeId: recipe.id, ingredientId: ingredient.id
                }
            })
        }

        return recipe
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
            await prisma.recipeIngredients.deleteMany({
                where: {
                    recipeId: parseInt(recipeId)
                }
            })

            await prisma.favorite.deleteMany({
                where: {
                    recipeId: parseInt(recipeId)
                }
            })
            await prisma.comment.deleteMany({
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
