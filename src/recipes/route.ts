import express from 'express';
import controller from './controller';

const router = express.Router();

router.get('/all', controller.getAllRecipes)
router.post('/create', controller.CreateRecipe)
router.get('/filtered', controller.getFilteredRecipes)

export = router
