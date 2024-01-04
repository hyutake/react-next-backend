import { Request, Response } from 'express';
import editor from '../utils/data';
import { CONSTANTS } from '../utils/constants';
import { GameRecord, Scores, StoredGameRecord } from '../model/record';
import { isValidRecord } from '../utils/validation/record';

class GameController {
    async getScores(req: Request, res: Response): Promise<void> {
        console.log("[GameController]: getScores called!")
        const storedData = await editor.readData(CONSTANTS.GAME_DATA_FILEPATH);
	    res.status(201).json({message: "getScores called!", records: storedData.game});
    }

    async postScore(req: Request, res: Response): Promise<void> {
        // req.body contains { score: number, state: string, playerId: string }
        console.log(req.body);

        const {score, state, playerId} = req.body as GameRecord;

        // get all the current users
        const storedData = await editor.readData(CONSTANTS.GAME_DATA_FILEPATH);
        // initialise the users array if there were none (i.e., no users yet) -- technically impossible since post method is only triggered for a signed in user
        if (!storedData.game) {
            storedData.game = [];
        }

        // data validation 
        const errors = isValidRecord({ score, state, playerId });
        if (Object.keys(errors).length > 0) {
            res.status(422).json({
                message: "postScore() failed due to validation errors.",
                errors,
            });
            return;
        }

        // update scores
        // frontend side should already have checked once - this is insurance
        const updatedData = storedData.game.map((record: StoredGameRecord) => {
            if(record.id === playerId) {
                const recordedScore: number = record.scores[state as keyof Scores];
                if(recordedScore < score) return {...record, [state]: score};
                else {
                    console.log('Not highscore!');
                    return record;
                }
            }
            return record;
        })

        storedData.game = updatedData;

        await editor.writeData(CONSTANTS.GAME_DATA_FILEPATH, storedData);
        res.status(201).json({ message: "postScore() success!" });
    }
}

const gameController = new GameController();
export default gameController;