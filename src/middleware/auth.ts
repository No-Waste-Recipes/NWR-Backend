import dotenv from 'dotenv'
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

const jwt = require('jsonwebtoken');
dotenv.config()

const auth = (...roles) => {
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
            req.currentUser = await prisma.user.findUnique({
                where: {
                    id: parseInt(decoded.user_id)
                }
            });

            if (roles.length && !roles.includes(req.currentUser.role)) {
                return res.status(401).send("You don't have the right permissions to edit this.")
            }
            next();

        } catch (e) {
            e.status = 401
            next(e)
        }
    }
}

module.exports = auth;
