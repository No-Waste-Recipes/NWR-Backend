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
exports.RecipeModel = void 0;
const mysql_1 = require("../config/mysql");
class RecipeModel {
    constructor() {
        this.tableName = 'recipe';
        this.getAllRecipes = (params = {}) => __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT * FROM ${this.tableName}`;
            return yield new mysql_1.DBconnection().query(sql, '');
        });
    }
}
exports.RecipeModel = RecipeModel;
//# sourceMappingURL=models.js.map