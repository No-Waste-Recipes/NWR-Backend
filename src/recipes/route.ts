import express from 'express';
import controller from './controller';

const router = express.Router();

router.get('/all', controller.getAllRecipes)
router.get('/popular', controller.getPopularRecipes)

export = router
