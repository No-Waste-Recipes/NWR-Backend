import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/create', controller.creatUser)

export = router
