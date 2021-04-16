import express from 'express';
import controller from './controller';
const auth = require('../middleware/auth');

const router = express.Router();

router.get('', controller.getRecipes)
router.post('', controller.CreateRecipe)
router.get('/popular', controller.getPopularRecipes)
router.get('/approve', auth(), controller.getApproveRecipes)
router.post('/approve/:slug', auth(), controller.approveRecipe)
router.get('/:slug', controller.getRecipe)
router.post('/:slug/comment', auth(), controller.createComment)
router.delete('/:slug/comment/:id', auth(), controller.deleteComment)

export = router
