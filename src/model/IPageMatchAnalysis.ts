export interface IPageMatchAnalysis {
    matchID: number | null
    info: IMatchInfo | null
    matchH2H: IMatchH2H | null
    macthFormTeamA: IMatchDetails[] | null
    macthFormTeamB: IMatchDetails[] | null 
  }
  
  export interface IMatchInfo {
    leagueName: string
    teamANameTh: string | null
    teamBNameTh: string | null
    teamANameEn: string | null
    teamBNameEn: string | null
    teamAImg: string | null
    teamBImg: string | null
    matchStatusCode: string | null
    timeStart: string | null
    dateStart: string | null
    score: string | null
    teamAyellowCard: string | null
    teamByellowCard: string | null
    teamARedCard: string | null
    teamBRedCard: string | null
    rateOpen: string | null
    rateLast: string | null
    predictionSubText: string | null
    teamBetRate: string | null
  }

  export interface IMatchH2H{
    matchH2hTeamAWin: number,
    matchH2hTeamBWin: number,
    matchH2HDraw: number,
    matchH2HDetails: IMatchDetails[]
  }
 export interface IMatchDetails{
    teamANameTh: string
    teamBNameTh: string
    teamAImg: string | null
    teamBImg: string | null
    scoreA: number,
    scoreB: number,
    matchResult: string
    day: string,
    leagueNameTh: string
    leagueImg: string
 }