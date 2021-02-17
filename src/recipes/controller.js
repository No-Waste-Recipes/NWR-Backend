"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../config/mysql");
const getAllRecipes = (req, res, next) => {
    console.log("reached");
    let query = 'SELECT * FROM recipes';
    mysql_1.Connect()
        .then((connection) => {
        mysql_1.Query(connection, query)
            .then((results) => {
            return res.status(200).json({
                results
            });
        })
            .catch((error) => {
            return res.status(200).json({
                message: error.message,
                error
            });
        })
            .finally(() => {
            connection.end();
        });
    })
        .catch((error) => {
        return res.status(200).json({
            message: error.message,
            error
        });
    });
};
exports.default = { getAllRecipes };
//# sourceMappingURL=controller.js.map