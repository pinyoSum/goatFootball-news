export interface IModalLineUp {
  matchID: number
  lineUp: ILineUp | null
  subLineUp: ISubLineUp | null
  switchPlayer: ISwitchPlayer | null
  playerConditions: IPlayerConditions | null
}
export interface ILineUp {
  formationTeamA: string
  formationTeamB: string
  LineUpteamA: ILineUpDetails[]
  LineUpteamB: ILineUpDetails[]
}
export interface ILineUpDetails {
  rowNum: number
  rowLineUp: ILineUpRow[]
}
export interface ILineUpRow {
  playerNameTh: string
  playerNameEn: string
  playerImg: string
  playerID: number
  positionsNo: number
  jerseyNumber: string
  rowLineUp: any[]
}

export interface ISubLineUp{
  LineUpteamA: ILineUpRow[]
  LineUpteamB: ILineUpRow[]
}

export interface ISwitchPlayer {
  teamA: IEventDetails[] ,
  teamB: IEventDetails[]
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

export interface IPlayerConditions {
  teamA: IPlayerConditionsDetails ,
  teamB: IPlayerConditionsDetails,
}

export interface IPlayerConditionsDetails{
  injury:IPlayerInfo[] | null,
  suspension: IPlayerInfo[] | null
}
export interface IPlayerInfo{
  playerID: number
  position: string
  playerNameTh: string
  playerNameEN: string
} 

