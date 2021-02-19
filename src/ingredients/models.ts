import { DBconnection } from  '../config/mysql'

export class IngredientModel {
    tableName = 'ingredient';

    getIngredients = async (name, excluded = {}) => {

        let excludedString = "(" + excluded + ")"
        let nameTransformed: String =  `%${name}%`
        let sql = `SELECT * FROM ${this.tableName} WHERE name LIKE ?`
        if (excluded) {
            sql += ` AND id not in ${excludedString}`
        }

        return await new DBconnection().query(sql, [nameTransformed])
    }
}
