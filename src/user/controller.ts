import {NextFunction, Request, Response} from "express";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import {UserModel} from './models'
const userModel = new UserModel()



const creatUser = async (req: Request, res: Response, next: NextFunction) => {

    await hashPassword(req)

    const result = await userModel.createUser(req.body)

    res.status(201).send(result)
}

const hashPassword = async (req) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password: pass} = req.body

    const user = await userModel.loginUser(req.body)

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

const getFavoriteRecipes = async (req: any, res: Response, next: NextFunction) => {
    const recipes = await userModel.getFavoriteRecipes({id: req.currentUser.id});

    return res.status(200).json({
        recipes
    });
}

const setFavoriteRecipe = async (req: any, res: Response, next: NextFunction) => {
    const recipes = await userModel.setFavoriteRecipe({userId: req.currentUser.id, recipeId: req.body.recipeId});

    return res.status(200).json({
        recipes
    });
}

export default {creatUser, loginUser, getFavoriteRecipes, setFavoriteRecipe}
