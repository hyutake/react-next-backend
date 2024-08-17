import { Dungeon, DungeonLength } from './darkest';

export interface Expedition {

}

// strictly only for things that you would get from the shop prior to an expedition
export interface Provisions {
    aegisScale: number;
    antivenom: number;
    bandage: number;
    curseCure: number;
    dogTreats: number;
    fireWood: number;
    food: number;
    holyWater: number;
    laudanum: number;
    medicinalHerb: number;
    shovel: number;
    skeletonKey: number;
    theBlood: number;
    torch: number;
}


export interface ProvisionsByDuration {
    [DungeonLength.SHORT]: Provisions;
    [DungeonLength.MEDIUM]: Provisions;
    [DungeonLength.LONG]: Provisions;
}

export interface CostByDuration {
    [DungeonLength.SHORT]: number;
    [DungeonLength.MEDIUM]: number;
    [DungeonLength.LONG]: number;
}

// for 1 specific dungeon type + length
export interface DungeonRecommendation {
    dungeon: Dungeon;
    provisions: ProvisionsByDuration;
    cost: CostByDuration;
    heroes: number[];   // array of hero ids (could change to use custom 'Hero' type)
    tips: string[];
}