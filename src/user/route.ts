import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/register', controller.creatUser)
router.post('/login', controller.loginUser)

export = router
