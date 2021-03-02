"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const auth = require('../middleware/auth');
const router = express_1.default.Router();
router.get('/all', auth(), controller_1.default.getAllRecipes);
module.exports = router;
//# sourceMappingURL=route.js.map