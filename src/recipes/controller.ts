import {NextFunction, Request, Response} from "express";
import {Connect, Query} from "../config/mysql";

const getAllRecipes = (req: Request, res: Response, next: NextFunction) => {
    let query = 'SELECT * FROM recipes';

    Connect()
    .then((connection) => {
        Query(connection, query)
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
}

export default {getAllRecipes}
