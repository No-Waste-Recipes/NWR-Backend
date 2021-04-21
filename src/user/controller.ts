import {NextFunction, Request, Response} from "express";
import {body} from "express-validator";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import {UserModel} from "./models";

const userModel = new UserModel();

const creatUser = async (req: Request, res: Response, next: NextFunction) => {

    const user = await userModel.getUserByEmail(req.body)

    if (user)
        return res.status(201).send({"errors": [{"email": "email already exists"}]})
    await hashPassword(req)

    const result = await userModel.createUser(req.body)

    return res.status(201).send(result)
}

const hashPassword = async (req) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }
};

const updateUser= async (req: any, res: Response, next: NextFunction)=>{
    const user = await userModel.updateUser(req.currentUser.id, {...req.body});
    return res.status(200).json({user,});
};

const deleteUser =async (req: any, res: Response, next: NextFunction) => {
    const user = await userModel.deleteUser({id: req.currentUser.id});

    return res.status(200).json({
        user,
    });
};

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

};

const getUser = async (req: any, res: Response, next: NextFunction) => {
    const user = await userModel.getUser({id: req.currentUser.id});

    return res.status(200).json({
        user,
    });
};

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

const deleteFavoriteRecipe = async (req: any, res: Response, next: NextFunction) => {
    const recipes = await userModel.deleteFavoriteRecipe({userId: req.currentUser.id, recipeId: req.body.recipeId});

    return res.status(200).json({
        recipes
    });
}

const findFavoriteRecipe = async (req: any, res: Response, next: NextFunction) => {
    const recipes = await userModel.findFavoriteRecipe({userId: req.currentUser.id, recipeId: req.params.id})

    return res.status(200).json({
        recipes
    });
}

const getAllUsers = async (req: any, res: Response, next: NextFunction) => {
    if (req.currentUser.role == "ADMIN") {
        const users = await userModel.getAllUsers()

        return res.status(200).json({
            users
        })
    } else {
        return res.status(401)
    }
}

const deleteSpecificUser = async (req: any, res: Response, next: NextFunction) => {
    if (req.currentUser.role == "ADMIN") {
        const user = await userModel.deleteUser({id: parseInt(req.params.id)})

        return res.status(200).json({
            user
        })
    } else {
        return res.status(401)
    }
}

export default {creatUser, loginUser, getFavoriteRecipes, setFavoriteRecipe, deleteFavoriteRecipe, findFavoriteRecipe, getUser, deleteUser, updateUser, getAllUsers, deleteSpecificUser}
