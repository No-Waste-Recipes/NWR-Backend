import express from 'express';
import controller from './controller';
const auth = require('../middleware/auth');
const Role = require('../utils/userRoles');

const router = express.Router();

router.get('', controller.getRecipes)
router.post('', controller.CreateRecipe)
router.delete('/:id', auth(), controller.deleteRecipe)
router.get('/popular', controller.getPopularRecipes)
router.get('/approve', auth(Role.Admin), controller.getApproveRecipes)
router.post('/approve/:slug', auth(), controller.approveRecipe)
router.get('/:slug', controller.getRecipe)
router.post('/:slug/comment', auth(), controller.createComment)
router.delete('/:slug/comment/:id', auth(), controller.deleteComment)

export = router
