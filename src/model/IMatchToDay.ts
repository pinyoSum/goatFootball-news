export interface IMatchToDayAllLead{
    leadNameTh: string,
    leadNameEn: string,
    leadID: number,
    matchDay: IMatchToDayByLead[]
}

export interface IMatchToDayByLead{
    matchID: number,
    teamANameTh: string | null,
    teamBNameTh: string | null,
    teamANameEn: string | null,
    teamBNameEn: string | null,
    teamAImg: string | null,
    teamBImg: string | null,
    matchStatusCode: string | null,
    matchStatusName: string | null,
    predictionSubText: string | null,
    betRate: string | null,
    teamBetRate: string | null,
    timeStart: string | null,
    timeGame: string,
    score: string
}