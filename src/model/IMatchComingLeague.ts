export interface ILeadInfoMonthly {
    month: string | null,
    leadNameTh: string | null,
    leadNameEn: string | null,
    leadImg: string | null,
    leadID: number | null,
    matchComing: IMatchDetails[],
    matchEnd: IMatchDetails[],
    topScorer: ITopScorer[]
}

export interface IMatchDetails{
    matchID: number,
    teamANameTh: string | null,
    teamBNameTh: string | null,
    teamANameEn: string | null,
    teamBNameEn: string | null,
    teamAImg: string | null,
    teamBImg: string | null,
    matchStatusCode: string | null,
    timeStart: string | null,
    dateStart: string | null,
    score: string | null,
}

export interface ITopScorer {
    playerNameTh: string,
    playerNameEn: string,
    playerID: number,
    playerImg: string,
    teamName: string,
    goalsScored: number
}
