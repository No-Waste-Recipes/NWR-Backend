import express from 'express';
import controller from './controller';
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', controller.creatUser)
router.post('/login', controller.loginUser)
router.get('/favorites', auth(), controller.getFavoriteRecipes)

export = router
