export interface IPageMatchDetail {
  matchID: number
  info: IMatchInfo
  event: IMatchEvent[]
  statistics: IMatchStatistics[]
  playerRatingsTeamA: IMactchPlayerRatings[]
  playerRatingsTeamB: IMactchPlayerRatings[]
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
export interface IMatchEvent {
  eventNo: number
  eventID: number
  eventTeam: string
  typeEvent: string // มี 2 type   single = event เดียว, pair = event คู่
  eventDetails: IEventDetails
}
export interface IMatchStatistics {
  name: string,
  teamAProgress: IProgressDetails,
  teamBProgress: IProgressDetails,
}
export interface IMactchPlayerRatings {
  playerID: string,
  rating: number,
  playerNameTh: string,
  playerNameEn: string,
  playerPosition: string,
  playerImg: string
}

export interface IEventDetails {
  playerName1: string,
  playerName2: string,
  playerImg1: string,
  playerImg2: string,
  playerID1: string,
  playerID2: string,
  eventTime: string,
  eventOverTime: string,
  eventTimeType: string, // มี 2 type 0,1    0 = event ครึ่งแรก, 1 = event ครึ่งหลัง
  eventImg1: string,
  eventImg2: string,
}
export interface IProgressDetails{
  percent: number,
  text: string
}