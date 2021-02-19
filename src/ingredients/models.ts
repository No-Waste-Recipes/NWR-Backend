import { DBconnection } from  '../config/mysql'

export class IngredientModel {
    tableName = 'ingredients';

    getIngredients = async (name = {}) => {

        let nameTransformed: String =  `%${name}%`
        let sql = `SELECT * FROM ${this.tableName} WHERE name LIKE ?`

        return await new DBconnection().query(sql, [nameTransformed])
    }
}
