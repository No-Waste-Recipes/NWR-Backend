import {json, NextFunction, Request, Response} from "express";
import {UserModel} from "./models";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const creatUser = async (req: Request, res: Response, next: NextFunction) => {

    await hashPassword(req)

    const result = await new UserModel().createUser(req.body)

    const json: any = result

    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign({user_id: json.insertId.toString()}, secretKey, { expiresIn: '24h'})

    res.status(201).send(token)
}

const hashPassword = async (req) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }
}

export default {creatUser}
