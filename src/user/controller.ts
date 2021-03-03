import {NextFunction, Request, Response} from "express";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()


const creatUser = async (req: Request, res: Response, next: NextFunction) => {

    await hashPassword(req)
    const { email, username, password, first_name, last_name, description } = req.body

    const result = await prisma.user.create({
        data: {
            email,
            username,
            password,
            first_name,
            last_name,
            description
        },
    })

    res.status(201).send(result)
}

const hashPassword = async (req) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password: pass} = req.body

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user && !pass) {
        return res.status(401).send("User doesn't exist")
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
        return res.status(401).send('Email or password is wrong')
    }

    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
        expiresIn: '24h'
    });

    const { password, ...userWithoutPassword } = user;

    res.send({ user: {...userWithoutPassword}, token });

}

export default {creatUser, loginUser}
