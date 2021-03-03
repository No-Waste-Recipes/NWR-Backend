"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const router = express_1.default.Router();
router.get('/all', controller_1.default.getAllRecipes);
router.get('/popular', controller_1.default.getPopularRecipes);
router.get('/filtered', controller_1.default.getFilteredRecipes);
module.exports = router;
//# sourceMappingURL=route.js.map