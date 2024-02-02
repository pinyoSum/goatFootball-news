import api from './axiosConfig'
// import tipsFromSiean from './tipsFromSiean.json'
// import test from '../mappers/test.json'
import {
  MapTipsFromSiean,
  MapMatchToDayAllLead,
  MapLeadInfoMonthly,
  MapLeadScoreboard,
  MapTeamCompetitionSchedule,
  MapPageMatchDetails,
  MapModalLineUp
} from '../mappers/football'

export const FetchFootballTipsFromSiean = async () => {
  try {
    const response = await api.get('/api/tips')
    if (Array.isArray(response.data.data) && response.data.data.length > 0) {
      return MapTipsFromSiean(response.data.data)
    } else {
      // const transformedData = MapTipsFromSiean(tipsFromSiean.data)
      // return transformedData
      return []
    }
  } catch (error) {
    console.error('Error fetching football tips:', error)
    return null
  }
}
export const FetchMatchAllFootballToDay = async () => {
  try {
    const response = await api.get('/api/match_all')
    if (Array.isArray(response.data.data) && response.data.data.length > 0) {
      return MapMatchToDayAllLead(response.data.data)
    } else {
      return []
    }
  } catch (error) {
    console.error('Error fetching football Match All Football ToDay:', error)
    return null
  }
}
export const FetchLeadInfoMonthly = async (leadID: number) => {
  try {
    const response = await api.get(`/api/league_detail/${leadID}`)
    return MapLeadInfoMonthly(response.data.data)
  } catch (error) {
    console.error('Error Fetch Lead Info Monthly:', error)
    return null
  }
}
export const FetchLeagueScoreboardTable = async (leagueID: number) => {
  try {
    const response = await api.get(`/api/league_stand/${leagueID}`)
    if (Array.isArray(response.data.data.stand) && response.data.data.stand.length > 0) {
      return MapLeadScoreboard(response.data.data)
    }else{
      return []
    }
  } catch (error) {
    console.error('Error Fetch Lead Info Monthly:', error)
    return null
  }
}
export const FetchTeamDetails = async (teamID: number) => {
  try {
    const response = await api.get(`/api/team_details/${teamID}`)
    return MapTeamCompetitionSchedule(response.data.data)
  } catch (error) {
    console.error('Error Fetch Lead Info Monthly:', error)
    return null
  }
}
export const FetchDataPageMatchDetails = async (matchID: number) => {
  try {
    const dataMatchDetail = await api.get(`/api/match_detail/${matchID}`)
    const dataMatchPredic = await api.get(`/api/match_predict/${matchID}`)
    const dataEvent = await api.get(`/api/match_event/${matchID}`)
    const dataStat = await api.get(`/api/match_stat/${matchID}`)
    const dataPlayerRatingTeamA = await api.get(`/api/match_rating/${matchID}/0`)
    const dataPlayerRatingTeamB = await api.get(`/api/match_rating/${matchID}/1`)
    return MapPageMatchDetails(
      dataMatchDetail.data.data,
      dataMatchPredic.data.data,
      dataEvent.data.data,
      dataStat.data.data,
      dataPlayerRatingTeamA.data.data,
      dataPlayerRatingTeamB.data.data
    )
  } catch (error) {
    console.error('Error Fetch FetchDataPageMatchDetails:', error)
    return null
  }
}
export const FetchModalsLineUpDetails = async (matchID: number) => {
  try {
    const dataMatchDetail = await api.get(`/api/match_lineup/${matchID}`)
    const dataSwitchPlayer = await api.get(`/api/player_subtention_match/${matchID}`)
    const playerConditions = await api.get(`/api/player_injury_match/${matchID}`)
    return MapModalLineUp(
      dataMatchDetail.data.data,
      dataSwitchPlayer.data.data,
      playerConditions.data.data,
    )
  } catch (error) {
    console.error('Error Fetch Modal Line up:', error)
    return null
  }
}
