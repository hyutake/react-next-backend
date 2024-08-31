import { Request, Response } from 'express';
import { CONSTANTS } from '../utils/constants';
import editor from '../utils/data';
import Logger from '../utils/logger';
import { DungeonRecommendation } from '../model/expedition';

class ExpeditionController {
    private logger: Logger;

    constructor() {
        this.logger = new Logger("ExpeditionController");
        this.findAll = this.findAll.bind(this);
        this.findByDungeon = this.findByDungeon.bind(this);
        this.findAllRecs = this.findAllRecs.bind(this);
        this.findRecsByDungeon = this.findRecsByDungeon.bind(this);
        this.updateRecsByDungeon = this.updateRecsByDungeon.bind(this);
    }

    async findAll(req: Request, res: Response) {
        this.logger.debug("findAll called!");
        const storedData = await editor.readData(CONSTANTS.EXPEDITION_DATA_FILEPATH);
        res.status(200).json("Not yet implemented!");
    }

    async findByDungeon(req: Request, res: Response) {
        this.logger.debug("findByDungeon called!");
        const { id } = req.params;
        res.status(200).json("Not yet implemented!");
    }

    async findAllRecs(req: Request, res: Response) {
        this.logger.debug("findAllRecs called!");
        const storedData = await editor.readData(CONSTANTS.EXPEDITION_DATA_FILEPATH);
        console.log(storedData.recommendations);
        res.status(200).json(storedData.recommendations);
    }

    async findRecsByDungeon(req: Request, res: Response) {
        this.logger.debug("findRecsByDungeon called!");
        const storedData = await editor.readData(CONSTANTS.EXPEDITION_DATA_FILEPATH);
        const { id } = req.params;
        const dungeonId: number = parseInt(id);
        // this.logger.debug(storedData);
        res.status(200).json(storedData.recommendations[dungeonId]);
    }

    async updateRecsByDungeon(req: Request, res: Response) {
        this.logger.debug("updateRecsByDungeon called!");
        const { id } = req.params;
        const dungeonId: number = parseInt(id);
        const storedData = await editor.readData(CONSTANTS.EXPEDITION_DATA_FILEPATH);
        const updatedRec = req.body;  // should structure the body to be exact to the stored data prolly

        await editor.writeData(CONSTANTS.EXPEDITION_DATA_FILEPATH, {
            expeditions: storedData.expeditions,
            recommendations: storedData.recommendations.map((rec: DungeonRecommendation, index: number) => {
                if(index === dungeonId) return updatedRec;
                return rec;
            })
        });

        res.status(200).json({message: "Successfully updated dungeon recommendations!"});
    }
}

export default ExpeditionController;