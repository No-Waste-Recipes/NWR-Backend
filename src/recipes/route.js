"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const auth = require('../middleware/auth');
const Role = require('../utils/userRoles');
const fileUploading_1 = require("../utils/fileUploading");
const router = express_1.default.Router();
router.get('', controller_1.default.getRecipes);
router.post('', auth(), fileUploading_1.upload.single('photo'), controller_1.default.CreateRecipe);
router.post('/:slug', auth(), fileUploading_1.upload.single('photo'), controller_1.default.updateRecipe);
router.delete('/:id', auth(), controller_1.default.deleteRecipe);
router.get('/popular', controller_1.default.getPopularRecipes);
router.get('/approve', auth(Role.Admin), controller_1.default.getApproveRecipes);
router.post('/approve/:slug', auth(Role.Admin), controller_1.default.approveRecipe);
router.get('/:slug', controller_1.default.getRecipe);
router.post('/:slug/comment', auth(), controller_1.default.createComment);
router.delete('/:slug/comment/:id', auth(), controller_1.default.deleteComment);
module.exports = router;
//# sourceMappingURL=route.js.map