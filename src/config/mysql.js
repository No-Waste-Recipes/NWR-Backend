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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnection = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const config_1 = __importDefault(require("./config"));
class DBconnection {
    constructor() {
        this.query = (sql, values) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const callback = (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                };
                // execute will internally call prepare and query
                this.db.execute(sql, values, callback);
            }).catch(err => {
                throw err;
            });
        });
        this.db = mysql2_1.default.createPool({
            user: config_1.default.mysql.user,
            password: config_1.default.mysql.password,
            host: config_1.default.mysql.host,
            database: config_1.default.mysql.database
        });
        this.checkConnection();
    }
    checkConnection() {
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection) {
                connection.release();
            }
            return;
        });
    }
}
exports.DBconnection = DBconnection;
//# sourceMappingURL=mysql.js.map