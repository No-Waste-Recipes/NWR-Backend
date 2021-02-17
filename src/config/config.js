"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MYSQL_HOST = process.env.HOST || "localhost";
const MYSQL_DB_DATABASE = process.env.DB_DATABASE || "no-waste-recipes";
const MYSQL_DB_USER = process.env.DB_USER || "root";
const MYSQL_DB_PASS = process.env.DB_PASS || "";
const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DB_DATABASE,
    user: MYSQL_DB_USER,
    password: MYSQL_DB_PASS
};
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3306;
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
const config = {
    mysql: MYSQL,
    server: SERVER
};
exports.default = config;
//# sourceMappingURL=config.js.map