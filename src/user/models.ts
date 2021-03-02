import { DBconnection } from  '../config/mysql'

export class UserModel {
    tableName = 'user';

    getUser = async ({id}) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`
        return await new DBconnection().query(sql, '')
    }

    createUser = async ({username, password, firstName, lastName, email}) => {
        const sql = `INSERT INTO ${this.tableName} (username, password, first_name, last_name, email) VALUES (?,?,?,?,?)`
        return await new DBconnection().query(sql, [username, password, firstName, lastName, email])
    }

    findOne = async ({email}) => {

        const sql = `SELECT * FROM ${this.tableName} WHERE email = ?`;

        const result = await new DBconnection().query(sql, [email])

        // return back the first row (user)
        return result[0];
    }
}
