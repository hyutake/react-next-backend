import { GameRecord } from "../../model/record";

const isNumber = (value: number): boolean => {
    return typeof value === 'number';
}

const isNumeric = (value: string): boolean => {
    return /^\d+$/.test(value);
}

const isValidScore = (score: number, error: any) => {
    console.log('Checking score type...');
    if(!isNumber(score)) {
        error.score = `Invalid score of ${score}`;
    }
}

const isValidGameState = (state: string, error: any) => {
    console.log('Checking gamestate...');
    const validWindowSizes = ['s', 'm', 'l'];
    const validTimers = [15, 30, 45, 60];
    const [windowSize, timer] = state.split('_');
    if(!isNumeric(timer)) {  // if not numeric
        error.timer = `Invalid timer of ${timer}`;
    } else if(!validTimers.includes(parseInt(timer))) {
        error.timer = `Invalid timer value of ${timer}`;
    }
    if(!validWindowSizes.includes(windowSize)) {
        error.window = `Invalid window size '${windowSize}'`;
    }
}

const isValidPlayerID = (id: string, errors: any) => {
    console.log('Checking player id...');
    if(id === '-1') {
        errors.playerId = 'Invalid or expired player id';
    };
}

export const isValidRecord = (record: GameRecord) => {
    const errors = {};
    isValidScore(record.score, errors);
    isValidGameState(record.state, errors);
    isValidPlayerID(record.playerId, errors);
    return errors;
}