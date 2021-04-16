import express from 'express';
import controller from './controller';
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', controller.creatUser)
router.post('/login', controller.loginUser)
router.get('/favorites', auth(), controller.getFavoriteRecipes)
router.post('/favorites', auth(), controller.setFavoriteRecipe)
router.delete('/favorites', auth(), controller.deleteFavoriteRecipe)
router.get('', auth(), controller.getUser)
router.delete('',auth(),controller.deleteUser)
router.put('',auth(),controller.updateUser)

export = router
