import express from 'express';
import controller from './controller';
const auth = require('../middleware/auth');
const Role = require('../utils/userRoles');
import { upload } from '../utils/fileUploading';

const router = express.Router();

router.get('', controller.getRecipes)
router.post('', auth(), upload.single('photo'), controller.CreateRecipe)
router.delete('/:id', auth(), controller.deleteRecipe)
router.get('/popular', controller.getPopularRecipes)
router.get('/approve', auth(Role.Admin), controller.getApproveRecipes)
router.post('/approve/:slug', auth(Role.Admin), controller.approveRecipe)
router.get('/:slug', controller.getRecipe)
router.put('/:slug/report', auth(), controller.reportRecipe)
router.post('/:slug/comment', auth(), controller.createComment)
router.put('/:slug/comment/:id/report', auth(), controller.reportComment)
router.delete('/:slug/comment/:id', auth(), controller.deleteComment)

export = router
