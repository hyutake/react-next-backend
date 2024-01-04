import express from 'express';
import asyncHandler from 'express-async-handler';
import { checkAuthMiddleware } from '../utils/auth';
import gameController from '../controller/gameController';

const router = express.Router();

router.get('/', asyncHandler(gameController.getScores));

// to restrict 'post' & 'patch' to logged in users
router.use(checkAuthMiddleware);

router.post('/', asyncHandler(gameController.postScore));

export default router;