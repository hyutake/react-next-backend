import express from 'express';
import asyncHandler from 'express-async-handler';
import authController from '../controller/authController';

const router = express.Router();

router.post('/login', asyncHandler(authController.postLogin));

router.post('/signup', asyncHandler(authController.postSignup));

export default router;
