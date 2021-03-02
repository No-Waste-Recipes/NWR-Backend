"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mysql_1 = require("../config/mysql");
class UserModel {
    constructor() {
        this.tableName = 'user';
        this.getUser = ({ id }) => __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;
            return yield new mysql_1.DBconnection().query(sql, '');
        });
        this.createUser = ({ username, password, first_name, last_name, email }) => __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO ${this.tableName} (username, password, first_name, last_name, email) VALUES (?,?,?,?,?)`;
            return yield new mysql_1.DBconnection().query(sql, [username, password, first_name, last_name, email]);
        });
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=models.js.map