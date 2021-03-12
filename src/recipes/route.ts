import express from 'express';
import controller from './controller';

const router = express.Router();

router.get('', controller.getRecipes)
router.post('', controller.CreateRecipe)
router.get('/popular', controller.getPopularRecipes)
router.get('/:slug', controller.getRecipe)

export = router
