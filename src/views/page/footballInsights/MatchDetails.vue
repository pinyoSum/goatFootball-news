<script setup lang="ts">
import { onMounted, ref, nextTick, reactive } from 'vue'
import { useDefaul } from "@/stores/useDefault"
import MatchDetailsComponent from '@/components/MatchDetailsComponent.vue';
import Api from '@/api/axiosConfig'
import { useRoute } from 'vue-router'

interface IMatchEvent {
  eventNo: number
  eventID: number
  eventTeam: string
  typeEvent: string // มี 2 type   single = event เดียว, pair = event คู่
  eventDetails: IEventDetails
}
interface IEventDetails {
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
interface IMatchStatistics {
  name: string,
  teamAProgress: IProgressDetails,
  teamBProgress: IProgressDetails,
}
interface IProgressDetails {
  percent: number,
  text: string
}
interface IMactchPlayerRatings {
  playerID: string,
  rating: number,
  playerNameTh: string,
  playerNameEn: string,
  playerPosition: string,
  playerImg: string
}

const defaulApp = useDefaul()
const route = useRoute()

const GetMatchDetails = async () => {
  try {
    const res = await Api.get(`/api/match_detail/${route.params.id}`)
    const data = res.data.data
    // เช็คข้อมูล match_details
    if (data.match_detail && Array.isArray(data.match_detail) && data.match_detail.length > 0) {
      matchDetails.matchDetail = data.match_detail[0]
    }

  } catch {
    console.log('----------------')
  }
}
const GetMatchEvent = async () => {
  try {
    const res = await Api.get(`/api/match_event/${route.params.id}`)
    const dataEvent = res.data.data
    // เช็คข้อมูล match_event
    if (dataEvent && Array.isArray(dataEvent) && dataEvent.length > 0) {
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

        matchDetails.matchEvent.push({ ...event })
      }

    }

  } catch {
    console.log('----------------')
  }
}
const GetMatchStat = async () => {
  try {
    const res = await Api.get(`/api/match_stat/${route.params.id}`)
    const dataStat = res.data.data
    // เช็คข้อมูล match_stat
    if (dataStat && Array.isArray(dataStat) && dataStat.length > 0) {
      for (const item of dataStat) {
        const stat = {} as IMatchStatistics
        const teamAprogressDetails = {} as IProgressDetails
        const teamBprogressDetails = {} as IProgressDetails

        const teamAValue = Number(item.home_value.replace('%', ''))
        const teamBValue = Number(item.away_value.replace('%', ''))

          ; (teamAprogressDetails.percent = Math.round((100 * teamAValue) / (teamAValue + teamBValue))),
            (teamAprogressDetails.text = item.home_value)
          ; (teamBprogressDetails.percent = Math.round((100 * teamBValue) / (teamAValue + teamBValue))),
            (teamBprogressDetails.text = item.away_value)

        stat.name = item.type_stat_name
        stat.teamAProgress = { ...teamAprogressDetails }
        stat.teamBProgress = { ...teamBprogressDetails }

        matchDetails.matchStat.push({ ...stat })
      }
    }

  } catch {
    console.log('----------------')
  }
}
const GetPlayerRating = async () => {
  try {
    const res1 = await Api.get(`/api/match_rating/${route.params.id}/0`)
    const res2 = await Api.get(`/api/match_rating/${route.params.id}/1`)
    const dataPlayerRatingTeamA = res1.data.data
    const dataPlayerRatingTeamB = res2.data.data
    if (dataPlayerRatingTeamA && Array.isArray(dataPlayerRatingTeamA) && dataPlayerRatingTeamA.length > 0) {
      for (const item of dataPlayerRatingTeamA) {
        const ratingPlayer = {} as IMactchPlayerRatings

        ratingPlayer.playerID = item.player_id
        ratingPlayer.rating = Number(item.rating)
        ratingPlayer.playerNameTh = item.player_name_th
        ratingPlayer.playerNameEn = item.player_name_th
        ratingPlayer.playerPosition = item.player_position_th
        ratingPlayer.playerImg = item.player_img

        matchDetails.playerRatingTeamA.push({ ...ratingPlayer })
      }
    }
    if (dataPlayerRatingTeamB && Array.isArray(dataPlayerRatingTeamB) && dataPlayerRatingTeamB.length > 0) {
      for (const item of dataPlayerRatingTeamB) {
        const ratingPlayer = {} as IMactchPlayerRatings

        ratingPlayer.playerID = item.player_id
        ratingPlayer.rating = Number(item.rating)
        ratingPlayer.playerNameTh = item.player_name_th
        ratingPlayer.playerNameEn = item.player_name_th
        ratingPlayer.playerPosition = item.player_position_th
        ratingPlayer.playerImg = item.player_img

        matchDetails.playerRatingTeamB.push({ ...ratingPlayer })
      }
    }

  } catch {
    console.log('----------------')
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
const GetPlayerRatingStyle = (playerRating: number) => {
  if (playerRating * 10 <= 60) {
    return {
      backgroundColor: '#d6573b'
    }
  } else if (playerRating * 10 <= 70) {
    return {
      backgroundColor: '#f6bb43'
    }
  } else if (playerRating * 10 <= 89) {
    return {
      backgroundColor: '#8dc153'
    }
  } else if (playerRating * 10 >= 90) {
    return {
      backgroundColor: '#239454'
    }
  }
}

const matchDetails = reactive({
  matchDetail: null as any,
  matchEvent: [] as IMatchEvent[],
  matchStat: [] as IMatchStatistics[],
  playerRatingTeamA: [] as IMactchPlayerRatings[],
  playerRatingTeamB: [] as IMactchPlayerRatings[]
})

onMounted(async () => {
  await GetMatchDetails()
  await GetMatchEvent()
  await GetMatchStat()
  await GetPlayerRating()
  defaulApp.HideLoading()
})
</script>

<template>
  <div>
    <MatchDetailsComponent :match-detail="matchDetails.matchDetail" />
  </div>
  <!-- event -->
  <div v-if="matchDetails.matchEvent && matchDetails.matchEvent.length > 0" style="border-radius: 15px" class="mb-2">
    <div class="wrapper-accordion">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThreeResult">
            <button class="accordion-button collapsed" style="color: #101452; font-size: 20px; font-weight: 600"
              type="button" data-bs-toggle="collapse" data-bs-target="#collapsestatistics1" aria-expanded="false"
              aria-controls="collapsestatistics1">
              เหตุการณ์
              <img class="ms-1" style="width: 20px" src="../../../assets/icon/football.svg" alt="" />
            </button>
          </h2>
          <div id="collapsestatistics1" class="accordion-collapse collapse" aria-labelledby="headingThree"
            data-bs-parent="#accordionExampleResult">
            <div v-for="item of matchDetails.matchEvent" class="p-1" :key="item.eventNo">
              <!-- teamA -->
              <div v-if="item.eventTeam == 'b'" class="d-flex"
                style="color: #101452; font-size: 14px; font-weight: 400; background-color: #fefefe">
                <div class="d-flex justify-content-end" style="width: 45%; padding: 0; margin: 0">
                  <div>
                    <div class="d-flex justify-content-end my-1">
                      <div class="player-name">{{ item.eventDetails.playerName1 }}</div>
                      <div class="d-flex justify-content-end align-items-center" style="width: 30px">
                        <img style="width: 15px; height: 15px" :src="item.eventDetails.eventImg1" alt="" />
                      </div>
                    </div>
                    <div v-if="item.typeEvent == 'pair'" class="d-flex justify-content-end my-1">
                      <div class="player-name">{{ item.eventDetails.playerName2 }}</div>
                      <div class="d-flex justify-content-end align-items-center" style="width: 30px">
                        <img style="width: 15px; height: 15px" :src="item.eventDetails.eventImg2" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center align-items-center"
                  style="color: #203cb3; width: 50px; font-size: 16px; font-weight: 500">
                  {{ item.eventDetails.eventTime }}
                </div>
                <div style="width: 45%"></div>
              </div>
              <!-- TeamB -->
              <div v-if="item.eventTeam == 'a'" class="d-flex"
                style="color: #101452; font-size: 14px; font-weight: 400; background-color: #fefefe">
                <div style="width: 45%; padding: 0; margin: 0"></div>
                <div class="d-flex justify-content-center align-items-center"
                  style="color: #203cb3; font-size: 16px; font-weight: 500; width: 10%">
                  {{ item.eventDetails.eventTime }}
                </div>
                <div class="d-flex" style="width: 45%">
                  <div>
                    <div class="d-flex my-1">
                      <div class="d-flex align-items-center" style="width: 30px">
                        <img style="width: 15px; height: 15px" :src="item.eventDetails.eventImg1" alt="" />
                      </div>
                      <!-- <div class="d-flex justify-content-end player-name"> -->
                      <div class="player-name text-end">
                        {{ item.eventDetails.playerName1 }}
                      </div>
                    </div>
                    <div v-if="item.typeEvent == 'pair'" class="d-flex my-1">
                      <div class="d-flex align-items-center" style="width: 30px">
                        <img style="width: 15px; height: 15px" :src="item.eventDetails.eventImg2" alt="" />
                      </div>
                      <!-- <div class="d-flex justify-content-end player-name"> -->
                      <div class=" player-name text-end">
                        {{ item.eventDetails.playerName2 }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- สถิติการแข่งขัน -->
  <div v-if="matchDetails.matchStat && matchDetails.matchStat.length > 0" style="border-radius: 15px" class="mb-2">
    <div class="wrapper-accordion">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThreeResult">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapsestatistics" aria-expanded="false" aria-controls="collapsestatistics"
              style="color: #101452">
              สถิติการแข่งขัน
            </button>
          </h2>
          <div id="collapsestatistics" class="accordion-collapse collapse pb-1" aria-labelledby="headingThree"
            data-bs-parent="#accordionExampleResult">
            <div style="background-color: #fefefe" class="mb-2 mx-1">
              <div v-for="(item, index) in matchDetails.matchStat" :key="index">
                <div v-if="item.teamAProgress.percent != null" class="d-flex wrapper-progress">
                  <div v-if="item.teamAProgress.percent != null" class="w-100 me-2">
                    <div style="color: #101452; font-size: 14px; font-weight: 400">
                      {{ item.teamAProgress.text }}
                    </div>
                    <div class="progress" style="direction: rtl; background-color: #5f5f5f">
                      <div class="progress-bar" role="progressbar" :style="{
                        width:
                          (item.teamAProgress.percent != null ? item.teamAProgress.percent : 0) +
                          '%',
                        '--bs-progress-bar-bg':
                          (item.teamAProgress.percent || 0) < (item.teamBProgress.percent || 0)
                            ? '#D9D9D9'
                            : '#BD0720'
                      }" :aria-valuenow="(item.teamAProgress.percent || 0).toString()" aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div v-if="item.teamAProgress.percent != null" class="name-progress">
                    {{ item.name }}
                  </div>
                  <div v-if="item.teamBProgress.percent != null" class="w-100 ms-2">
                    <div class="text-end" style="color: #101452; font-size: 14px; font-weight: 400">
                      {{ item.teamBProgress.text }}
                    </div>
                    <div class="progress" style="background-color: #5f5f5f">
                      <div class="progress-bar" role="progressbar" :style="{
                        width:
                          (item.teamBProgress.percent != null ? item.teamBProgress.percent : 0) +
                          '%',
                        '--bs-progress-bar-bg':
                          (item.teamAProgress.percent || 0) > (item.teamBProgress.percent || 0)
                            ? '#D9D9D9'
                            : '#BD0720'
                      }" :aria-valuenow="(item.teamBProgress.percent || 0).toString()" aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                <div class="text-center mt-2" v-if="item.teamAProgress.percent === null" style="color: white">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!-- คะแนนนักเตะ team A -->
    <div v-if="matchDetails.playerRatingTeamA && matchDetails.playerRatingTeamA.length > 0" class="mb-2">
    <div class="wrapper-accordion">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThreeResult">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseScore" aria-expanded="false" aria-controls="collapseScore">
              คะแนนนักเตะ{{ matchDetails.matchDetail.teama_name_th }}
            </button>
          </h2>
          <div id="collapseScore" class="accordion-collapse collapse mb-2" aria-labelledby="headingThree"
            data-bs-parent="#accordionExampleScore">
            <div class="pb-2">
              <div v-for="(item, index) in matchDetails.playerRatingTeamA" :key="index">
                <div class="p-2 text-white m-1 pb-2" style="background-color: #FEFEFE;">
                  <table style="width: 100%">
                    <tr>
                      <td style="width: 65%; font-size: 14px; font-weight: 400;color: #101452;">
                        {{ item.playerNameTh }}
                      </td>
                      <td style="width: 35%; font-size: 14px; font-weight: 400; text-align: left;color: #101452;">
                        {{ item.playerPosition }}
                      </td>
                      <td>
                        <div :style="GetPlayerRatingStyle(item.rating)" style="
                          min-width: 40px;
                          font-size: 0.75rem;
                          font-weight: 400;
                          padding: 3px;
                          border-radius: 4px;
                          text-align: center;
                        ">
                          {{ item.rating }}
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!-- คะแนนนักเตะ team B -->
    <div v-if="matchDetails.playerRatingTeamB && matchDetails.playerRatingTeamB.length > 0" class="mb-2">
    <div class="wrapper-accordion">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThreeResult">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collabsTeamB" aria-expanded="false" aria-controls="collabsTeamB">
              คะแนนนักเตะ{{ matchDetails.matchDetail.teamb_name_th }}
            </button>
          </h2>
          <div id="collabsTeamB" class="accordion-collapse collapse mb-2" aria-labelledby="headingThree"
            data-bs-parent="#accordionExampleScore">
            <div class="pb-2">
              <div v-for="(item, index) in matchDetails.playerRatingTeamB" :key="index">
                <div class="p-2 text-white m-1 pb-2" style="background-color: #FEFEFE">
                  <table style="width: 100%">
                    <tr>
                      <td style="width: 65%; font-size: 14px; font-weight: 400;color: #101452;">
                        {{ item.playerNameTh }}
                      </td>
                      <td style="width: 35%; font-size: 14px; font-weight: 400; text-align: left;;color: #101452;">
                        {{ item.playerPosition }}
                      </td>
                      <td>
                        <div :style="GetPlayerRatingStyle(item.rating)" style="
                          min-width: 40px;
                          font-size: 0.75rem;
                          font-weight: 400;
                          padding: 3px;
                          border-radius: 4px;
                          text-align: center;
                        ">
                          {{ item.rating }}
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper-body-accordion-modal {
  background-color: #ededed;
}

.hospital-icon-style {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.wrapper-node-a {
  display: flex;
  flex-grow: 1;
  align-items: center;
  width: 30px;
  font-weight: 500;
  color: white;
  border-radius: 50%;
  padding: 6px;
  background-color: #1b1c21;
}

.wrapper-node-b {
  display: flex;
  flex-grow: 1;
  align-items: center;
  width: 30px;
  color: #1b1c21;
  border-radius: 50%;
  font-weight: 600;
  padding: 6px;
  background-color: white;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.circle-number {
  border: 1px solid #101452;
  padding: 8px;
  border-radius: 50%;
}

.wrapper-reserve-player {
  background-color: #ededed;
  margin-top: 14px;
}

.wrapper-change {
  background-color: #ededed;
  margin-top: 14px;
}

.wrapper-body-modal {
  overflow: auto;
  background-color: white;
  border-radius: 0 0 10px 10px;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}

.modal-content {
  border-radius: 10px;
  overflow: hidden;
}

.body-modal {
  padding: 10px;
  color: #101452;
  background-color: #dedfe4;
  overflow: hidden;
}

.modal-header {
  padding: 4px;
  background-color: #bd0720;
  border-bottom: none;
}

.modal-title {
  font-size: 0.9rem;
  color: white;
}

.modal-dialog {
  max-height: 79%;
}

.modal {
  --bs-modal-bg: none;
}

.percent {
  color: #fff;
  font-family: Kanit;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  /* 178.571% */
}

.name-progress {
  color: #101452;
  position: absolute;
  top: 40%;
  font-size: 14px;
  font-weight: 400;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}

.wrapper-progress {
  position: relative;
  padding: 5px;
}

.progress {
  --bs-progress-border-radius: none;
  height: 10px;
}

.accordion-button {
  background-color: #dedfe4;
  color: #101452;
  font-size: 20px;
  font-weight: 600;
}

.accordion-button:not(.collapsed) {
  color: #101452;
  background-color: none;
  box-shadow: none;
}

.accordion {
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  --bs-accordion-active-bg: none;
  --bs-accordion-btn-focus-box-shadow: none;
  --bs-accordion-border-color: none;
  --bs-accordion-bg: #dedfe4;
  --bs-accordion-btn-icon: url('../../../assets/icon/angle-down-solid.svg');
  --bs-accordion-btn-active-icon: url('../../../assets/icon/angle-down-solid.svg');
}

.btn-line-up {
  border: none;
  border-radius: 10px;
  color: white;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
}

.box-result {
  padding-left: 2px;
  padding-right: 2px;
  color: white;
}

.align-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper-team {
  position: relative;
  padding-top: 20px;
}

.price {
  border-radius: 4px;
  padding-right: 4px;
  color: white;
  padding-left: 4px;
  background-color: $primary-color;
  position: absolute;
  left: 52%;
  top: 5px;
}

.priceB {
  border-radius: 4px;
  padding-right: 4px;
  color: white;
  padding-left: 4px;
  background-color: $primary-color;
  position: absolute;
  left: 55%;
  top: 5px;
}

.d-flex.center {
  display: flex;
  justify-content: center;
  align-items: center;
  /* สามารถเพิ่ม properties เพิ่มเติมได้ตามความต้องการ */
}

.player-name {
  width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (min-width: 720px) {
  .player-name {
    width: auto;
  }
}
</style>