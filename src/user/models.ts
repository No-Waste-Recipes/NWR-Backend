import { DBconnection } from  '../config/mysql'

export class UserModel {
    tableName = 'user';

    getUser = async ({id}) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`
        return await new DBconnection().query(sql, '')
    }

    createUser = async ({username, password, first_name, last_name, email}) => {
        const sql = `INSERT INTO ${this.tableName} (username, password, first_name, last_name, email) VALUES (?,?,?,?,?)`

        return await new DBconnection().query(sql, [username, password, first_name, last_name, email])
    }
}
