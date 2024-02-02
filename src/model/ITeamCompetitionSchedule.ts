export interface ITeamDetails{
    teamID: number,
    matchComing: ITeamMatchDetails[],
    matchEnd: ITeamMatchDetails[],
    players: IPlayers[]
}

export interface ITeamMatchDetails{
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

export interface IPlayers {
    playerNameTh: string,
    playerNameEn: string,
    playerID: number,
    playerImg: string,
    playerNumber: string,
    position:string
}
