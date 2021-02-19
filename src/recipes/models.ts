import { DBconnection } from  '../config/mysql'

export class RecipeModel {
    tableName = 'recipe';

    getAllRecipes = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`

        return await new DBconnection().query(sql, '')
    }

    getPopularRecipes = async (params = {}) => {

    }

}
