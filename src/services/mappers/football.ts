import type { IMatchToDayAllLead, IMatchToDayByLead } from '../../model/IMatchToDay'
import type { ILeadInfoMonthly, IMatchDetails, ITopScorer } from '../../model/IMatchComingLeague'
import type { ILeadScorerTable, IScorerTable } from '../../model/IScoreboard'
import type {
  ITeamDetails,
  ITeamMatchDetails,
  IPlayers
} from '../../model/ITeamCompetitionSchedule'
import type {
  IPageMatchDetail,
  IMatchInfo,
  IMatchEvent,
  IEventDetails,
  IMatchStatistics,
  IProgressDetails,
  IMactchPlayerRatings
} from '../../model/IPageMatchDetail'
import type {
  IModalLineUp,
  ILineUp,
  ILineUpDetails,
  ILineUpRow,
  ISubLineUp,
  ISwitchPlayer,
  IPlayerConditions,
  IPlayerConditionsDetails,
  IPlayerInfo
} from '../../model/IModalLineUp'
import type {
  IPageMatchAnalysis,
  IMatchInfo as IMatchInfoAnalysis
} from '../../model/IPageMatchAnalysis'
import { useDefaul } from "@/stores/useDefault"

type Match = {
  predict: string
  teamaNameTh: string
  teambNameTh: string
  teamaNameEn: string
  teambNameEn: string
  leagueImage: string
  teamaImg: string
  teambImg: string
  timeStart: string
  matchZeanTitle: string
  matchZeanSubTitle: string
  matchId: string
  tipType: number
  idAccordion: string
  tipsImgId: number
}

type Zean = {
  zeanId: string
  zeanNameTh: string
  zeanNameEn: string
  zeanImage: string
  matchDay: Match[]
}

const STATUS_MATCH = [
  {
    name: 'รอการแข่งขัน',
    value: '0'
  },
  {
    name: 'ครึ่งแรก',
    value: '1'
  },
  {
    name: 'พักครึ่ง',
    value: '2'
  },
  {
    name: 'ครี่งหลัง',
    value: '3'
  },
  {
    name: 'ต่อเวลาพิเศษ',
    value: '4'
  },
  {
    name: 'เตะลูกโทษ',
    value: '5'
  },
  {
    name: 'จบการแข่งขัน',
    value: '-1'
  },
  {
    name: 'ยกเลิกการแข่งขัน',
    value: '-10'
  },
  {
    name: 'ยังไม่ยืนยันเวลาแข่ง',
    value: '-11'
  },
  {
    name: 'ยุติการแข่ง',
    value: '-12'
  },
  {
    name: 'หยุดกระทันหัน',
    value: '-13'
  },
  {
    name: 'เลื่อนการแข่งขัน',
    value: '-14'
  }
]

const GetStatusNameByValue = (value: string): string | null => {
  const match = STATUS_MATCH.find((status) => status.value === value)
  return match != undefined ? match.name : 'ไม่มีข้อมูล!!'
}
const ConvertDateTimeToTime = (dateTime: string) => {
  const hoursAndMinutes = dateTime.slice(0, 5)
  return hoursAndMinutes
}
const GetCurrentThaiMonth = () => {
  const thaiMonths = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม'
  ]

  const currentMonth = new Date().getMonth()
  return thaiMonths[currentMonth]
}
const ExtractDateAndTime = (data: string) => {
  const [datePart, timePart] = data.split(' ')

  // แปลงวันที่เป็นรูปแบบ dd/mm/yyyy
  const [year, month, day] = datePart.split('-')
  const formattedDate = `${day}/${month}/${year}`

  // แปลงเวลาเป็นรูปแบบ hh:mm
  const formattedTime = timePart.slice(0, 5)

  return {
    day: formattedDate,
    time: formattedTime
  }
}
const SetEventImagesURLs = (
  kind: string,
  player2: any
): { eventImg1: string; eventImg2: string } => {
  const URL_IMG = 'https://www.apiball.vip/event/'
  const imgEven = {
    eventImg1: '',
    eventImg2: ''
  }
  if (kind == '1') {
    imgEven.eventImg1 = URL_IMG + 1 + '.png'
    imgEven.eventImg2 = player2 != null ? URL_IMG + 12 + '.png' : ''
  } else if (kind == '11') {
    imgEven.eventImg1 = URL_IMG + 5 + '.png'
    imgEven.eventImg2 = player2 != null ? URL_IMG + 4 + '.png' : ''
  } else {
    imgEven.eventImg1 = URL_IMG + kind + '.png'
    imgEven.eventImg2 = ''
  }
  return imgEven
}
const GenerateId =()=> {
  const length = 5; 
  const text = "accordion"; 
  const randomDigits = Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  const randomLetters = Array.from({ length: text.length }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
  return `${randomDigits}${text}${randomLetters}`;
}
const GenerateZeanID = () => {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 1000);
  return `element-${timestamp}-${randomNum}`;
};

export const MapTipsFromSiean = (data: any[]): Zean[] => {
  const tipsFromSiean = [] as Zean[]
  const defaulApp = useDefaul()
  defaulApp.$state.infoPageTips.menuSub.length = 0
  defaulApp.$state.infoPageTips.data.length = 0
  for (let index = 0; index < data.length; index++) {
    const catalogData = data[index]
    const matchDay = [] as Match[]
    for (let i = 0; i < catalogData.catalog_data.length; i++) {
      const match = catalogData.catalog_data[i]
      matchDay.push({
        predict: match.predict,
        teamaNameTh: match.teama_name_th,
        teambNameTh: match.teamb_name_th,
        teamaNameEn: match.teama_name_en,
        teambNameEn: match.teamb_name_en,
        leagueImage: match.league_image,
        teamaImg: match.teama_img,
        teambImg: match.teamb_img,
        timeStart: ConvertDateTimeToTime(match.tips_time),
        matchZeanTitle: match.tips_title,
        matchId: match.tips_result_id,
        matchZeanSubTitle: match.tips_title_description,
        tipType: match.tips_type_id,
        idAccordion: GenerateId(),
        tipsImgId: match.tips_img_id
      })
    }
    const ID = GenerateZeanID()
    defaulApp.$state.infoPageTips.menuSub.push({ label: catalogData.catalog_name, id: `${ID + index}`})
    tipsFromSiean.push({
      zeanId: `${ID + index}`,
      zeanNameTh: catalogData.catalog_name,
      zeanNameEn: '',
      zeanImage: '',
      matchDay: [...matchDay]
    })
  }
  defaulApp.$state.infoPageTips.data = [...tipsFromSiean]
  return tipsFromSiean
}
export const MapMatchToDayAllLead = (data: any[]): IMatchToDayAllLead[] => {
  const matchToDayAllLead = [] as IMatchToDayAllLead[]
  for (let index = 0; index < data.length; index++) {
    const matchByLead = data[index]
    const matchToDayByLead = [] as IMatchToDayByLead[]
    if (matchByLead.match_day.length > 0) {
      for (let x = 0; x < matchByLead.match_day.length; x++) {
        const matchInfo = matchByLead.match_day[x]
        const timeStart = matchInfo.time_start.split(' ')[1]
        matchToDayByLead.push({
          matchID: matchInfo.match_id,
          teamANameTh: matchInfo.teama_name_th,
          teamBNameTh: matchInfo.teamb_name_th,
          teamANameEn: matchInfo.teama_name_en,
          teamBNameEn: matchInfo.teamb_name_en,
          teamAImg: matchInfo.teama_img,
          teamBImg: matchInfo.teamb_img,
          matchStatusCode: matchInfo.match_status,
          matchStatusName: GetStatusNameByValue(matchInfo.match_status as string),
          predictionSubText: matchInfo.win_bet_th,
          betRate: matchInfo.rate_open != null ? matchInfo.rate_open.replace('-', '') : '0',
          teamBetRate:
            matchInfo.rate_open != null ? (matchInfo.rate_open.startsWith('-') ? 'b' : 'a') : null,
          timeStart: timeStart.slice(0, 5),
          timeGame: matchInfo.time_game,
          score: `${matchInfo.scorea} - ${matchInfo.scoreb}`
        })
      }
      matchToDayAllLead.push({
        leadNameTh: matchByLead.match_day[0].league_name_th,
        leadNameEn: matchByLead.match_day[0].league_name_en,
        leadID: matchByLead.match_day[0].league_id,
        matchDay: [...matchToDayByLead]
      })
    }
  }
  return matchToDayAllLead
}
export const MapLeadInfoMonthly = (data: any): ILeadInfoMonthly => {

  const matchComing = [] as IMatchDetails[]
  const matchEnd = [] as IMatchDetails[]
  const topScorer = [] as ITopScorer[]
  for (const item of data.matchs) {
    const dateTime = ExtractDateAndTime(item.time_start)
    matchComing.push({
      matchID: item.match_id,
      teamANameTh: item.teama_name_th,
      teamBNameTh: item.teamb_name_th,
      teamANameEn: item.teama_name_en,
      teamBNameEn: item.teamb_name_en,
      teamAImg: item.teama_img,
      teamBImg: item.teamb_img,
      matchStatusCode: item.match_status,
      timeStart: dateTime.time,
      dateStart: dateTime.day,
      score: item.score
    })
  }
  for (const item of data.matchs_end) {
    const dateTime = ExtractDateAndTime(item.time_start)
    matchEnd.push({
      matchID: item.match_id,
      teamANameTh: item.teama_name_th,
      teamBNameTh: item.teamb_name_th,
      teamANameEn: item.teama_name_en,
      teamBNameEn: item.teamb_name_en,
      teamAImg: item.teama_img,
      teamBImg: item.teamb_img,
      matchStatusCode: item.match_status,
      timeStart: dateTime.time,
      dateStart: dateTime.day,
      score: item.score
    })
  }
  if (data.players_top_goals && Array.isArray(data.players_top_goals)) {
    for (const item of data.players_top_goals) {
      topScorer.push({
        playerNameTh: item.player_name_th,
        playerNameEn: item.player_name_en,
        playerID: item.player_id,
        playerImg: item.player_img,
        teamName: item.team_name_th,
        goalsScored: Number(item.goals)
      })
    }
  }

  const leadMonthlyInfo = {
    month: GetCurrentThaiMonth(),
    leadNameTh: data.info[0].league_name_th,
    leadNameEn: data.info[0].league_name_en,
    leadImg: data.info[0].league_image,
    leadID: data.info[0].league_id,
    matchComing: [...matchComing],
    matchEnd: [...matchEnd],
    topScorer: [...topScorer]
  } as ILeadInfoMonthly
  return leadMonthlyInfo
}
export const MapLeadScoreboard = (data: any): ILeadScorerTable => {
  const scorerTable = [] as IScorerTable[]
  for (const item of data.stand) {
    scorerTable.push({
      teamID: item.team_id,
      teamNameTh: item.team_name_th,
      teamNameEn: item.team_name_en,
      teamImg: item.team_img,
      rank: item.rank,
      play: item.play,
      win: item.win,
      draw: item.draw,
      lose: item.lose,
      FA: `${item.goal}:${item.goallose}`,
      goalDifference: item.goalplus,
      standPoint: item.standpoint,
      standColorCode: item.stand_color_code,
      standColorId: item.stand_color_id
    })
  }
  const leadScorerTable = {
    leadNameTh: data.stand[0].league_name_th,
    leadNameEn: data.stand[0].league_name_en,
    leadImg: data.stand[0].league_image,
    scorerTable: [...scorerTable]
  } as ILeadScorerTable
  return leadScorerTable
}
export const MapTeamCompetitionSchedule = (data: any): ITeamDetails => {
  const matchs = [] as ITeamMatchDetails[]
  const matchsEnd = [] as ITeamMatchDetails[]
  const players = [] as IPlayers[]
  for (const item of data.matchs) {
    const dateTime = ExtractDateAndTime(item.time_start)
    matchs.push({
      matchID: item.match_id,
      teamANameTh: item.teama_name_th,
      teamBNameTh: item.teamb_name_th,
      teamANameEn: item.teama_name_en,
      teamBNameEn: item.teamb_name_en,
      teamAImg: item.teama_img,
      teamBImg: item.teamb_img,
      matchStatusCode: item.match_status,
      timeStart: dateTime.time,
      dateStart: dateTime.day,
      score: item.score
    })
  }
  for (const item of data.matchs_end) {
    const dateTime = ExtractDateAndTime(item.time_start)
    matchsEnd.push({
      matchID: item.match_id,
      teamANameTh: item.teama_name_th,
      teamBNameTh: item.teamb_name_th,
      teamANameEn: item.teama_name_en,
      teamBNameEn: item.teamb_name_en,
      teamAImg: item.teama_img,
      teamBImg: item.teamb_img,
      matchStatusCode: item.match_status,
      timeStart: dateTime.time,
      dateStart: dateTime.day,
      score: item.score
    })
  }
  for (const item of data.players) {
    players.push({
      playerNameTh: item.player_name_th,
      playerNameEn: item.player_name_en,
      playerID: item.player_id,
      playerImg: item.player_image,
      playerNumber: item.player_number,
      position: item.player_position_th
    })
  }
  const teamDetails = {
    teamID: data.team[0].team_id,
    matchComing: [...matchs],
    matchEnd: [...matchsEnd],
    players: [...players]
  } as ITeamDetails
  return teamDetails
}
export const MapPageMatchDetails = (
  dataMatchDetail: any,
  dataMatchPredic: any,
  dataEvent: any[],
  dataStat: any[],
  dataPlayerRatingTeamA: any[],
  dataPlayerRatingTeamB: any[]
): IPageMatchDetail => {
  const pageMatchDetail = {} as IPageMatchDetail
  const matchInfo = {} as IMatchInfo
  const matchEvent = [] as IMatchEvent[]
  const matchStat = [] as IMatchStatistics[]
  const playerRatTeamA = [] as IMactchPlayerRatings[]
  const playerRatTeamB = [] as IMactchPlayerRatings[]

  const matchDetails = dataMatchDetail.match_detail[0]
  const matchPredic = dataMatchPredic.match_predic[0]

  const dateTime = ExtractDateAndTime(matchDetails.time_start)
  matchInfo.leagueName = matchDetails.league_name_th
  matchInfo.teamANameTh = matchDetails.teama_name_th
  matchInfo.teamBNameTh = matchDetails.teamb_name_th
  matchInfo.teamANameEn = matchDetails.teama_name_en
  matchInfo.teamBNameEn = matchDetails.teamb_name_en
  matchInfo.teamAImg = matchDetails.teama_img
  matchInfo.teamBImg = matchDetails.teamb_img
  matchInfo.matchStatusCode = matchDetails.match_status
  matchInfo.timeStart = dateTime.time
  matchInfo.dateStart = dateTime.day
  matchInfo.score = matchDetails.score
  matchInfo.teamAyellowCard = matchDetails.teamayellow
  matchInfo.teamByellowCard = matchDetails.teambyellow
  matchInfo.teamARedCard = matchDetails.teamared
  matchInfo.teamBRedCard = matchDetails.teambred
  matchInfo.rateOpen = matchDetails.rate_open
  matchInfo.rateLast = matchDetails.rate_last
  matchInfo.predictionSubText = matchPredic != undefined ? matchPredic.win_bet_th : ''
  matchInfo.teamBetRate =
    matchDetails.rate_open != null ? (matchDetails.rate_open.startsWith('-') ? 'b' : 'a') : null

  for (const [index, item] of dataEvent.entries()) {
    const eventDetails = {} as IEventDetails
    const event = {} as IMatchEvent

    const eventImg = SetEventImagesURLs(item.kind, item.player_name2)
    eventDetails.playerName1 = item.player_name1
    eventDetails.playerName2 = item.player_name2
    eventDetails.playerImg1 = item.player_img1
    eventDetails.playerImg2 = item.player_img2
    eventDetails.playerID1 = item.player_id
    eventDetails.playerID2 = item.player_id2
    eventDetails.eventTime = item.event_time
    eventDetails.eventOverTime = item.overtime
    eventDetails.eventTimeType = Number(item.event_time) < 46 ? '0' : '1' // มี 2 type 0,1    0 =  event ครึ่งแรก, 1 =  event ครึ่งหลัง
    eventDetails.eventImg1 = eventImg.eventImg1
    eventDetails.eventImg2 = eventImg.eventImg2

    event.eventNo = index + 1
    event.eventID = item.event_id
    event.eventTeam = item.ishome == '0' ? 'a' : 'b'
    event.typeEvent = item.player_name2 == null ? 'single' : 'pair'
    event.eventDetails = { ...eventDetails }

    matchEvent.push({ ...event })
  }

  for (const item of dataStat) {
    const stat = {} as IMatchStatistics
    const teamAprogressDetails = {} as IProgressDetails
    const teamBprogressDetails = {} as IProgressDetails

    const teamAValue = Number(item.home_value.replace('%', ''))
    const teamBValue = Number(item.away_value.replace('%', ''))

    ;(teamAprogressDetails.percent = Math.round((100 * teamAValue) / (teamAValue + teamBValue))),
      (teamAprogressDetails.text = item.home_value)
    ;(teamBprogressDetails.percent = Math.round((100 * teamBValue) / (teamAValue + teamBValue))),
      (teamBprogressDetails.text = item.away_value)

    stat.name = item.type_stat_name
    stat.teamAProgress = { ...teamAprogressDetails }
    stat.teamBProgress = { ...teamBprogressDetails }

    matchStat.push({ ...stat })
  }

  if (typeof dataPlayerRatingTeamA != 'string' && typeof dataPlayerRatingTeamB != 'string') {
    for (const item of dataPlayerRatingTeamA) {
      const ratingPlayer = {} as IMactchPlayerRatings

      ratingPlayer.playerID = item.player_id
      ratingPlayer.rating = Number(item.rating)
      ratingPlayer.playerNameTh = item.player_name_th
      ratingPlayer.playerNameEn = item.player_name_th
      ratingPlayer.playerPosition = item.player_position_th
      ratingPlayer.playerImg = item.player_img

      playerRatTeamA.push({ ...ratingPlayer })
    }

    for (const item of dataPlayerRatingTeamB) {
      const ratingPlayer = {} as IMactchPlayerRatings

      ratingPlayer.playerID = item.player_id
      ratingPlayer.rating = Number(item.rating)
      ratingPlayer.playerNameTh = item.player_name_th
      ratingPlayer.playerNameEn = item.player_name_th
      ratingPlayer.playerPosition = item.player_position_th
      ratingPlayer.playerImg = item.player_img

      playerRatTeamB.push({ ...ratingPlayer })
    }
  }
  pageMatchDetail.matchID = matchDetails.match_id
  pageMatchDetail.info = matchInfo
  pageMatchDetail.event = [...matchEvent]
  pageMatchDetail.statistics = [...matchStat]
  pageMatchDetail.playerRatingsTeamA = [...playerRatTeamA]
  pageMatchDetail.playerRatingsTeamB = [...playerRatTeamB]
  return pageMatchDetail
}
export const MapModalLineUp = (
  dataLineUp: any,
  dataSwitchPlayer: any,
  dataplayerConditions: any
): IModalLineUp => {
  const modalLineUp = {} as IModalLineUp
  const lineUp = {} as ILineUp
  const subLineUp = {} as ISubLineUp
  const switchPlayer = {} as ISwitchPlayer
  const playerConditions = {} as IPlayerConditions

  if (dataLineUp.match_lineup_a.length > 0 && dataLineUp.match_lineup_b.length > 0) {
    lineUp.formationTeamA = dataLineUp.formation_teama
    lineUp.formationTeamB = dataLineUp.formation_teamb
    lineUp.LineUpteamA = [] as ILineUpDetails[]
    lineUp.LineUpteamB = [] as ILineUpDetails[]

    let positionTeamA = 100
    for (const item of dataLineUp.match_lineup_a) {
      const lineUpDetail = {} as ILineUpDetails
      const lineUpRow = {} as ILineUpRow
      let nextNewRowTeamA = false

      lineUpDetail.rowLineUp = [] as ILineUpRow[]
      lineUpRow.playerNameTh = item.player_name_th
      lineUpRow.playerNameEn = item.player_name_en
      lineUpRow.playerImg = item.player_image
      lineUpRow.playerID = item.player_id
      lineUpRow.positionsNo = item.position_id
      lineUpRow.jerseyNumber = item.number_shirt

      nextNewRowTeamA = item.position_id != positionTeamA
      if (nextNewRowTeamA) {
        lineUpDetail.rowNum = lineUp.LineUpteamA.length + 1
        lineUpDetail.rowLineUp.push({ ...lineUpRow })
        lineUp.LineUpteamA.push({ ...lineUpDetail })
      } else {
        lineUp.LineUpteamA[lineUp.LineUpteamA.length - 1].rowLineUp.push({ ...lineUpRow })
      }
      positionTeamA = item.position_id
    }

    let positionTeamB = 100
    for (const item of dataLineUp.match_lineup_b) {
      const lineUpDetail = {} as ILineUpDetails
      const lineUpRow = {} as ILineUpRow
      let nextNewRowTeamB = false

      lineUpDetail.rowLineUp = [] as ILineUpRow[]
      lineUpRow.playerNameTh = item.player_name_th
      lineUpRow.playerNameEn = item.player_name_en
      lineUpRow.playerImg = item.player_image
      lineUpRow.playerID = item.player_id
      lineUpRow.positionsNo = item.position_id
      lineUpRow.jerseyNumber = item.number_shirt

      nextNewRowTeamB = item.position_id != positionTeamB
      if (nextNewRowTeamB) {
        lineUpDetail.rowNum = lineUp.LineUpteamB.length + 1
        lineUpDetail.rowLineUp.push({ ...lineUpRow })
        lineUp.LineUpteamB.push({ ...lineUpDetail })
      } else {
        lineUp.LineUpteamB[lineUp.LineUpteamB.length - 1].rowLineUp.push({ ...lineUpRow })
      }
      positionTeamB = item.position_id
    }
    modalLineUp.lineUp = { ...lineUp }
  } else {
    modalLineUp.lineUp = null
  }
  if (dataLineUp.match_line_sub_a.length > 0 && dataLineUp.match_line_sub_b.length > 0) {
    subLineUp.LineUpteamA = [] as ILineUpRow[]
    subLineUp.LineUpteamB = [] as ILineUpRow[]
    for (const item of dataLineUp.match_line_sub_a) {
      const lineUpRow = {} as ILineUpRow

      lineUpRow.playerNameTh = item.player_name_th
      lineUpRow.playerNameEn = item.player_name_en
      lineUpRow.playerImg = item.player_image
      lineUpRow.playerID = item.player_id
      lineUpRow.positionsNo = item.position_id
      lineUpRow.jerseyNumber = item.number_shirt

      subLineUp.LineUpteamA.push({ ...lineUpRow })
    }
    for (const item of dataLineUp.match_line_sub_b) {
      const lineUpRow = {} as ILineUpRow

      lineUpRow.playerNameTh = item.player_name_th
      lineUpRow.playerNameEn = item.player_name_en
      lineUpRow.playerImg = item.player_image
      lineUpRow.playerID = item.player_id
      lineUpRow.positionsNo = item.position_id
      lineUpRow.jerseyNumber = item.number_shirt

      subLineUp.LineUpteamB.push({ ...lineUpRow })
    }
    modalLineUp.subLineUp = { ...subLineUp }
  } else {
    modalLineUp.subLineUp = null
  }
  if (Array.isArray(dataSwitchPlayer) && dataSwitchPlayer.length > 0) {
    switchPlayer.teamA = [] as IEventDetails[]
    switchPlayer.teamB = [] as IEventDetails[]

    for (const item of dataSwitchPlayer) {
      const switchPlayerDetails = {} as IEventDetails
      switchPlayerDetails.playerName1 = item.player_name1
      switchPlayerDetails.playerName2 = item.player_name2
      switchPlayerDetails.playerImg1 = item.player_img1
      switchPlayerDetails.playerImg2 = item.player_img2
      switchPlayerDetails.playerID1 = item.player_id
      switchPlayerDetails.playerID2 = item.player_id2
      switchPlayerDetails.eventTime = item.event_time
      switchPlayerDetails.eventOverTime = item.overtime
      switchPlayerDetails.eventTimeType = Number(item.event_time) < 46 ? '0' : '1' // มี 2 type 0,1    0 = event ครึ่งแรก, 1 = event ครึ่งหลัง
      switchPlayerDetails.eventImg1 = `https://www.apiball.vip/event/5.png`
      switchPlayerDetails.eventImg2 = `https://www.apiball.vip/event/4.png`

      if (item.ishome == '0') {
        switchPlayer.teamA.push({ ...switchPlayerDetails })
      } else {
        switchPlayer.teamB.push({ ...switchPlayerDetails })
      }
    }
    modalLineUp.switchPlayer = { ...switchPlayer }
  } else {
    modalLineUp.switchPlayer = null
  }
  if (dataplayerConditions) {
    const playerConditionsTeamA = {} as IPlayerConditionsDetails
    const playerConditionsTeamB = {} as IPlayerConditionsDetails

    playerConditionsTeamA.injury = []
    playerConditionsTeamA.suspension = []
    playerConditionsTeamB.injury = []
    playerConditionsTeamB.suspension = []

    const playerInjuryTeamA = dataplayerConditions.match_injury_home
    const playerInjuryTeamB = dataplayerConditions.match_injury_away
    const playerDonBanTeamA = dataplayerConditions.match_ban_home
    const playerDonBanTeamB = dataplayerConditions.match_ban_away

    if (Array.isArray(playerInjuryTeamA) && playerInjuryTeamA.length > 0) {
      for (const item of playerInjuryTeamA) {
        const player = {} as IPlayerInfo
        player.playerID = item.player_id
        player.position = item.position
        player.playerNameTh = item.player_name_th
        player.playerNameEN = item.player_name_en
        playerConditionsTeamA.injury.push({ ...player })
      }
    } else {
      playerConditionsTeamA.injury = null
    }
    if (Array.isArray(playerInjuryTeamB) && playerInjuryTeamB.length > 0) {
      for (const item of playerInjuryTeamB) {
        const player = {} as IPlayerInfo
        player.playerID = item.player_id
        player.position = item.position
        player.playerNameTh = item.player_name_th
        player.playerNameEN = item.player_name_en
        playerConditionsTeamB.injury.push({ ...player })
      }
    } else {
      playerConditionsTeamB.injury = null
    }
    if (Array.isArray(playerDonBanTeamA) && playerDonBanTeamA.length > 0) {
      for (const item of playerDonBanTeamA) {
        const player = {} as IPlayerInfo
        player.playerID = item.player_id
        player.position = item.position
        player.playerNameTh = item.player_name_th
        player.playerNameEN = item.player_name_en
        playerConditionsTeamB.suspension.push({ ...player })
      }
    } else {
      playerConditionsTeamA.suspension = null
    }
    if (Array.isArray(playerDonBanTeamB) && playerDonBanTeamB.length > 0) {
      for (const item of playerDonBanTeamB) {
        const player = {} as IPlayerInfo
        player.playerID = item.player_id
        player.position = item.position
        player.playerNameTh = item.player_name_th
        player.playerNameEN = item.player_name_en
        playerConditionsTeamB.suspension.push({ ...player })
      }
    } else {
      playerConditionsTeamB.suspension = null
    }

    playerConditions.teamA = { ...playerConditionsTeamA }
    playerConditions.teamB = { ...playerConditionsTeamB }
    modalLineUp.playerConditions = { ...playerConditions }
  }

  return modalLineUp
}
export const MapPageMatchAnalysis = (dataMatchDetails: any): IPageMatchAnalysis => {
  const matchInfo = {} as IMatchInfoAnalysis

  if (Array.isArray(dataMatchDetails.match_detail) && dataMatchDetails.match_detail.length > 0) {
    const dateTime = ExtractDateAndTime(dataMatchDetails.match_detail[0].time_start)
    matchInfo.leagueName = dataMatchDetails.match_detail[0].league_name_th
    matchInfo.teamANameTh = dataMatchDetails.match_detail[0].teama_name_th
    matchInfo.teamBNameTh = dataMatchDetails.match_detail[0].teamb_name_th
    matchInfo.teamANameEn = dataMatchDetails.match_detail[0].teama_name_en
    matchInfo.teamBNameEn = dataMatchDetails.match_detail[0].teamb_name_en
    matchInfo.teamAImg = dataMatchDetails.match_detail[0].teama_img
    matchInfo.teamBImg = dataMatchDetails.match_detail[0].teamb_img
    matchInfo.matchStatusCode = dataMatchDetails.match_detail[0].match_status
    matchInfo.timeStart = dateTime.time
    matchInfo.dateStart = dateTime.day
    matchInfo.score = dataMatchDetails.match_detail[0].score
    matchInfo.teamAyellowCard = dataMatchDetails.match_detail[0].teamayellow
    matchInfo.teamByellowCard = dataMatchDetails.match_detail[0].teambyellow
    matchInfo.teamARedCard = dataMatchDetails.match_detail[0].teamared
    matchInfo.teamBRedCard = dataMatchDetails.match_detail[0].teambred
    matchInfo.rateOpen = dataMatchDetails.match_detail[0].rate_open
    matchInfo.rateLast = dataMatchDetails.match_detail[0].rate_last
    matchInfo.predictionSubText = null
    matchInfo.teamBetRate =
      dataMatchDetails.match_detail[0].rate_open != null
        ? dataMatchDetails.match_detail[0].rate_open.startsWith('-')
          ? 'b'
          : 'a'
        : null

    if (Array.isArray(dataMatchDetails.match_predic) && dataMatchDetails.match_predic.length > 0) {
      matchInfo.predictionSubText = dataMatchDetails.match_predic[0].win_bet_th
    }
  }
  return {} as IPageMatchAnalysis
}
