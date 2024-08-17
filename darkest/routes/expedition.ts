import express from 'express';
import asyncHandler from 'express-async-handler';
import { expeditionController } from '../controller';

const router = express.Router();

// get all expeditions
router.get('/', asyncHandler(expeditionController.findAll));

// get all recommendations
router.get('/recommendations', asyncHandler(expeditionController.findAllRecs));

// get all expeditions by dungeon id
router.get('/:id', asyncHandler(expeditionController.findByDungeon));

// get all recommendations by dungeon id
router.get('/recommendations/:id', asyncHandler(expeditionController.findRecsByDungeon));

// update a recommendation by dungeon id
router.post('/recommendations/:id', asyncHandler(expeditionController.updateRecsByDungeon))

export default router;
