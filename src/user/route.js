"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const auth = require('../middleware/auth');
const router = express_1.default.Router();
router.post('/register', controller_1.default.creatUser);
router.post('/login', controller_1.default.loginUser);
router.get('/favorites', auth(), controller_1.default.getFavoriteRecipes);
router.post('/favorites', auth(), controller_1.default.setFavoriteRecipe);
router.delete('/favorites', auth(), controller_1.default.deleteFavoriteRecipe);
module.exports = router;
//# sourceMappingURL=route.js.map