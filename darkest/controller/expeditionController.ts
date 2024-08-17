import { Request, Response } from 'express';
import { CONSTANTS } from '../utils/constants';
import editor from '../utils/data';
import { log, error } from '../utils/logger';
import { DungeonRecommendation } from '../model/expedition';

class ExpeditionController {
    async findAll(req: Request, res: Response) {
        log("ExpeditionController", "findAll called!");
        res.status(200).json("Not yet implemented!");
    }

    async findByDungeon(req: Request, res: Response) {
        log("ExpeditionController", "findByDungeon called!");
        const { id } = req.params;
        res.status(200).json("Not yet implemented!");
    }

    async findAllRecs(req: Request, res: Response) {
        log("ExpeditionController", "findAllRecs called!");
        const storedData = await editor.readData(CONSTANTS.EXPEDITION_DATA_FILEPATH);
        console.log(storedData.recommendations);
        res.status(200).json(storedData.recommendations);
    }

    async findRecsByDungeon(req: Request, res: Response) {
        log("ExpeditionController", "findRecsByDungeon called!");
        const storedData = await editor.readData(CONSTANTS.EXPEDITION_DATA_FILEPATH);
        const { id } = req.params;
        const dungeonId: number = parseInt(id);
        res.status(200).json(storedData.recommendations[dungeonId]);
    }

    async updateRecsByDungeon(req: Request, res: Response) {
        log("ExpeditionController", "updateRecsByDungeon called!");
        const { id } = req.params;
        const dungeonId: number = parseInt(id);
        const storedData = await editor.readData(CONSTANTS.EXPEDITION_DATA_FILEPATH);
        const updatedRecommendations = req.body;  // should structure the body to be exact to the stored data prolly
        await editor.writeData(CONSTANTS.EXPEDITION_DATA_FILEPATH, {
            expeditions: storedData.expeditions,
            recommendations: storedData.recommendations.map((rec: DungeonRecommendation, index: number) => {
                if(index === dungeonId) return updatedRecommendations;
                return rec;
            })
        });
    }
}

export default ExpeditionController;