import { DBconnection } from  '../config/mysql'

export class RecipeModel {
    tableName = 'recipe';

    getAllRecipes = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`

        return await new DBconnection().query(sql, '')
    }

    getFilteredRecipes = async (ingredients ={}) => {

        let ingredientsString = "(" + ingredients + ")"

        let ingredientsAmount = ingredients.toString().replace(/,/g, '').length

        let sql = `SELECT id, name FROM ${this.tableName} r join recipe_ingredient ri on ri.recipe_id = r.id where ri.ingredient_id in ${ingredientsString} group by r.id having count(distinct ri.ingredient_id) = ${ingredientsAmount}`

        return await new DBconnection().query(sql, '')
    }
}
