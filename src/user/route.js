"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const auth = require('../middleware/auth');
const Role = require('../utils/userRoles');
const router = express_1.default.Router();
router.post('/register', controller_1.default.creatUser);
router.post('/login', controller_1.default.loginUser);
router.get('/favorites', auth(), controller_1.default.getFavoriteRecipes);
router.post('/favorites', auth(), controller_1.default.setFavoriteRecipe);
router.delete('/favorites', auth(), controller_1.default.deleteFavoriteRecipe);
router.get('/favorites/:id', auth(), controller_1.default.findFavoriteRecipe);
router.get('/myrecipes', auth(), controller_1.default.getMyRecipes);
router.get('', auth(), controller_1.default.getUser);
router.delete('', auth(), controller_1.default.deleteUser);
router.put('', auth(), controller_1.default.updateUser);
router.get('/users', auth(Role.Admin), controller_1.default.getAllUsers);
router.delete('/:id', auth(Role.Admin), controller_1.default.deleteSpecificUser);
module.exports = router;
//# sourceMappingURL=route.js.map