import { DBconnection } from  '../config/mysql'

export class IngredientModel {
    tableName = 'ingredients';

    getIngredients = async (name = {}) => {

        // TODO: fix that name gets used in value
        let sql = `SELECT * FROM ${this.tableName} WHERE name LIKE '%${name}%'`

        return await new DBconnection().query(sql, [])
    }
}
