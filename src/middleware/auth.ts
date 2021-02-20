import dotenv from 'dotenv'
import {UserModel} from "../user/models";

const jwt = require('jsonwebtoken');
dotenv.config()

const auth = () => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if(!authHeader || !authHeader.startsWith(bearer)) {
                return res.status(401).send('Missing authentication')
            }

            const token = authHeader.replace(bearer, '')
            const secretKey = process.env.SECRET_JWT || "";

            const decoded = jwt.verify(token, secretKey)
            const user = await new UserModel().getUser({ id: decoded.user_id })

            req.currentUser = user;
            next();

        } catch (e) {
            e.status = 401
            next(e)
        }
    }
}

module.exports = auth;
