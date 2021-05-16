"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const auth = require('../middleware/auth');
const Role = require('../utils/userRoles');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, "") + file.originalname);
    }
});
const upload = multer({ storage: storage });
const router = express_1.default.Router();
router.get('', controller_1.default.getRecipes);
router.post('', auth(), upload.single('photo'), controller_1.default.CreateRecipe);
router.delete('/:id', auth(), controller_1.default.deleteRecipe);
router.get('/popular', controller_1.default.getPopularRecipes);
router.get('/approve', auth(Role.Admin), controller_1.default.getApproveRecipes);
router.post('/approve/:slug', auth(Role.Admin), controller_1.default.approveRecipe);
router.get('/:slug', controller_1.default.getRecipe);
router.post('/:slug/comment', auth(), controller_1.default.createComment);
router.delete('/:slug/comment/:id', auth(), controller_1.default.deleteComment);
module.exports = router;
//# sourceMappingURL=route.js.map