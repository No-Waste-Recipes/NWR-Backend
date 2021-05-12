import express from 'express';
import controller from './controller';
const auth = require('../middleware/auth');
const Role = require('../utils/userRoles');

const router = express.Router();

router.post('/register', controller.creatUser)
router.post('/login', controller.loginUser)
router.get('/favorites', auth(), controller.getFavoriteRecipes)
router.post('/favorites', auth(), controller.setFavoriteRecipe)
router.delete('/favorites', auth(), controller.deleteFavoriteRecipe)
router.get('/favorites/:id', auth(), controller.findFavoriteRecipe)
router.get('', auth(), controller.getUser)
router.delete('', auth(), controller.deleteUser)
router.put('', auth(), controller.updateUser)
router.get('/users', auth(Role.Admin), controller.getAllUsers)
router.delete('/:id', auth(Role.Admin), controller.deleteSpecificUser)

export = router
