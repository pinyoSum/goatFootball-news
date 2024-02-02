export interface ILeadScorerTable {
    leadNameTh: string | null,
    leadNameEn: string | null,
    leadImg: string | null,
    scorerTable: IScorerTable[]
}

export interface IScorerTable{
    teamID: number,
    teamNameTh: string | null,
    teamNameEn: string | null,
    teamImg: string | null,
    rank: number,
    play: number,
    win: number,
    draw: number,
    lose: number,
    FA: string,
    goalDifference: string,
    standPoint: number,
    standColorCode: string,
    standColorId: string
}
