import express from 'express';
import controller from './controller';
const auth = require('../middleware/auth');
const Role = require('../utils/userRoles');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, "") + file.originalname);
    }
});

const upload = multer({storage: storage});

const router = express.Router();

router.get('', controller.getRecipes)
router.post('', auth(), upload.single('photo'), controller.CreateRecipe)
router.delete('/:id', auth(), controller.deleteRecipe)
router.get('/popular', controller.getPopularRecipes)
router.get('/approve', auth(Role.Admin), controller.getApproveRecipes)
router.post('/approve/:slug', auth(Role.Admin), controller.approveRecipe)
router.get('/:slug', controller.getRecipe)
router.post('/:slug/comment', auth(), controller.createComment)
router.delete('/:slug/comment/:id', auth(), controller.deleteComment)

export = router
