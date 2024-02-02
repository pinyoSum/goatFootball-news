<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import Api from '@/api/axiosConfig'
import { useRoute } from 'vue-router'
import type { IModalLineUp } from '@/model/IModalLineUp'
import { FetchModalsLineUpDetails } from '@/services/api/football'
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const route = useRoute()

const GetMatchDetails = async () => {
  const res = await Api.get(`/api/match_detail/${route.params.id}`)
  const res2 = await Api.get(`/api/player_injury_match/${route.params.id}`)
  matchDetails.value = res.data.data
  playerInjuryMatch.value = res2.data.data
}
const GetPriceBall = async (type: number) => {
  if (type == 1) {
    if (handicap.value.length > 0) {
      return
    }
    const res = await Api.get(`/api/get_rate/${route.params.id}/${type}`)
    handicap.value = res.data.data
  }
  if (type == 2) {
    if (oneTwo.value.length > 0) {
      return
    }
    const res = await Api.get(`/api/get_rate/${route.params.id}/${type}`)
    oneTwo.value = res.data.data
  }
  if (type == 3) {
    if (over.value.length > 0) {
      return
    }
    const res = await Api.get(`/api/get_rate/${route.params.id}/${type}`)
    over.value = res.data.data
  }
}

const matchDetails = ref<any>()
const playerInjuryMatch = ref<any>()
const handicap = ref<any[]>([])
const oneTwo = ref<any[]>([])
const over = ref<any[]>([])
const lineUpModalData = ref<IModalLineUp | null>(null)
const justLineUpA = ref<undefined | number>(undefined)
const justLineUpB = ref<undefined | number>(undefined)
const justSwitchPlayerA = ref<undefined | number>(undefined)
const justSwitchPlayerB = ref<undefined | number>(undefined)
const justSubLineUpA = ref<undefined | number>(undefined)
const justSubLineUpB = ref<undefined | number>(undefined)
const justPlayerConditionA = ref<undefined | number>(undefined)
const justPlayerConditionB = ref<undefined | number>(undefined)
const lineUpTeamA = ref<{ playerName: string; position: number }[]>([]);
const lineUpTeamB = ref<{ playerName: string; position: number }[]>([]);

const FetchModalLineup = async () => {
  lineUpModalData.value = await FetchModalsLineUpDetails(Number(route.params.id))
  justLineUpA.value = lineUpModalData.value?.lineUp?.LineUpteamA.length
  justLineUpB.value = lineUpModalData.value?.lineUp?.LineUpteamB.length
  justPlayerConditionA.value = lineUpModalData.value?.playerConditions?.teamA.injury?.length
  justPlayerConditionB.value = lineUpModalData.value?.playerConditions?.teamB.injury?.length
  justSubLineUpA.value = lineUpModalData.value?.subLineUp?.LineUpteamA.length
  justSubLineUpB.value = lineUpModalData.value?.subLineUp?.LineUpteamB.length
  justSwitchPlayerA.value = lineUpModalData.value?.switchPlayer?.teamA.length
  justSwitchPlayerB.value = lineUpModalData.value?.switchPlayer?.teamB.length
  lineUpTeamA.value =  MapRealLineUpList(lineUpModalData.value?.lineUp?.LineUpteamA)
  lineUpTeamB.value = MapRealLineUpList(lineUpModalData.value?.lineUp?.LineUpteamB)
  
}
const rate_open = ref('')
const rate_last = ref('')
const val_Integer_last = ref<string>('')
const val_Integer_open = ref<string>('')
const val_decimal = ref<string | null>(null)

function MapRealLineUpList(lineUpData:any) {
  if(lineUpData!=null || undefined){
    return lineUpData.map((team:any) => {
        return team.rowLineUp.map((player:any) => {
            return {
                playerName: player.playerNameTh,
                position: player.jerseyNumber
            };
        });
    }).flat();
  }
  else return undefined
}

const formatPriceLast = (value: string) => {
    if(value!=null||undefined){
      if (value.charAt(0) === '-') {
        value = value.slice(1);
        rate_last.value = value;  
    }

    const parts = value.split('.');
    val_Integer_last.value = parts[0];
    val_decimal.value = `.${parts[1]}`;
    
    if (val_decimal.value === '.25') {
        rate_last.value = `${val_Integer_last.value}/${parseFloat(rate_last.value) + 0.25}`;
    } else if (val_decimal.value === '.75') {
        rate_last.value = `${parseFloat(rate_last.value) - 0.25}/${parseFloat(rate_last.value) + 0.25}`;
    }
    }
}

const formatPriceOpen = (value: string) => {
   if(value!=null||undefined){
    if (value.charAt(0) === '-') {
        value = value.slice(1);
        rate_open.value = value;
    }

    const parts = value.split('.');
    val_Integer_open.value = parts[0];
    val_decimal.value = `.${parts[1]}`;

    if (val_decimal.value === '.25') {
        rate_open.value = `${val_Integer_open.value}/${parseFloat(rate_open.value) + 0.25}`;
    } else if (val_decimal.value === '.75') {
        rate_open.value = `${parseFloat(rate_open.value) - 0.25}/${parseFloat(rate_open.value) + 0.25}`;

    }
   }
}

const formatDifferentOpen = (value:string) => {
 if(value!=null||undefined){
  if (value.charAt(0) === '-') {
        value = value.slice(1);
        val_Integer_open.value = value;  
    }
  val_Integer_open.value = value
 }
}
const formatDifferentLast = (value:string) => {
  if(value!=null||undefined){
    if (value.charAt(0) === '-') {
        value = value.slice(1);
        val_Integer_last.value = value;  
    }
    val_Integer_last.value = value
  }
}

onMounted(async () => {
  await GetMatchDetails()
  await nextTick()
  rate_open.value = matchDetails.value?.match_detail[0]?.rate_open
  rate_last.value = matchDetails.value?.match_detail[0]?.rate_last
  formatPriceLast(rate_last.value);
  formatPriceOpen(rate_open.value);
  formatDifferentOpen(matchDetails.value?.match_detail[0]?.rate_open)
  formatDifferentLast(matchDetails.value?.match_detail[0]?.rate_last)
  defaulApp.HideLoading()
})
</script>
<template>
  <div>
    <div class="d-flex">
      <div class="me-1" style="font-size: 20px; color: #101452;font-weight: 700;">ตารางราคาบอล</div>
      <img style="width: 20px" src="../../../assets/icon/football.svg" alt="" />
    </div>
    <div class="mt-3 mb-4">
      <button @click="GetPriceBall(3)" class="btn-bet me-2" data-bs-toggle="modal" data-bs-target="#exampleModalHandy">
        แฮนดี้แคพ
      </button>
      <button @click="GetPriceBall(2)" class="btn-bet me-2" data-bs-toggle="modal" data-bs-target="#exampleModal1x2">
        1 x 2
      </button>
      <button @click="GetPriceBall(1)" class="btn-bet" data-bs-toggle="modal" data-bs-target="#exampleModalhightLow">
        ราคา สูง/ต่ำ
      </button>
    </div>

    <div class="text-center pt-2 mb-2" style="color: #101452; background-color: #DEDFE4; border-radius: 15px">
      <div>
        {{ matchDetails?.match_detail[0]?.league_name_th }}
      </div>
      <div class="d-flex center w-100">
          <div class="wrapper-team" style="width: 160px;">
            <div v-if="parseFloat(matchDetails?.match_detail[0]?.rate_last) > 0" class="price">
              {{ matchDetails?.match_detail[0]?.rate_last.replace('-', '') }}
            </div>
            <img style="width: 60px; height: 60px; border-radius: 50%" :src="matchDetails?.match_detail[0]?.teama_img"
              alt="" />
            <div>{{ matchDetails?.match_detail[0]?.teama_name_th }}</div>
            <div class="d-flex align-center">
              <div style="background-color: #ffcc02" class="box-result me-1">
                <div style="color: white;">
                  {{ matchDetails?.match_detail[0]?.teamayellow }}
                </div>
              </div>
              <div style="background-color: #bd0720" class="box-result">
                <div style="color: white;">
                  {{ matchDetails?.match_detail[0]?.teamared }}
                </div>
              </div>
            </div>
          </div>
        <div class="text-primary" v-if="matchDetails?.match_detail[0]?.match_status == '-1'" style="font-size: 18px; font-weight: 600;width: 50px;">
          {{ matchDetails?.match_detail[0]?.scorea }} - {{ matchDetails?.match_detail[0]?.scoreb }}
        </div>
        <div class="text-primary" v-else style=" font-size: 18px; font-weight: 600;width:50px;">VS</div>
          <div class="wrapper-team" style="width: 160px;">
            <div v-if="parseFloat(matchDetails?.match_detail[0]?.rate_last) < 0" class="priceB">
              {{ matchDetails?.match_detail[0]?.rate_last.replace('-', '') }}
            </div>
            <img style="width: 60px; height: 60px; border-radius: 50%" :src="matchDetails?.match_detail[0]?.teamb_img"
              alt="" />
            <div>{{ matchDetails?.match_detail[0]?.teamb_name_th }}</div>
            <div class="d-flex align-center">
              <div style="background-color: #ffcc02" class="box-result me-1">
                <div style="color: white;">
                  {{ matchDetails?.match_detail[0]?.teambyellow }}
                </div>
              </div>
              <div style="background-color: #bd0720" class="box-result">
                <div style="color: white;">
                  {{ matchDetails?.match_detail[0]?.teambred }}
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="mt-3 d-flex justify-content-center">ราคาเปิด :
        <div class="ms-1 text-primary" >
          {{ rate_open }}
        </div>
      </div>
      <div class="d-flex center">
        <div class="me-1">ราคาปัจจุบัน :</div>
        <div class="text-primary">
          {{ rate_last }}
          <img v-if="val_Integer_open < val_Integer_last" src="../../../assets/icon/bet-arrow-down/bet-up-arrow-green.svg" alt="" />
          <img v-if="val_Integer_open > val_Integer_last" src="../../../assets/icon/bet-arrow-down/bet-down-arrow-red.svg" alt="" />
        </div>
      </div>
      <div class="mt-2 text-primary" style=" font-style: italic">
        {{ matchDetails?.match_detail[0]?.noteopen }}
      </div>
      <button class="btn-line-up" style="background-color: #bd0720" type="button" data-bs-toggle="modal"
        data-bs-target="#exampleModal" @click="FetchModalLineup">
        LINE-UPS
      </button>
    </div>
    <!-- modal  แฮนดี้แคพ-->
    <div class="modal fade" id="exampleModalHandy" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" style="margin-top: 145px">
        <div class="modal-content">
          <div class="modal-headers">
            <div class="d-flex justify-content-between" style="justify-content: space-between">
              <div id="exampleModalLabel">ราคาบอลสด / ราคาเปิด</div>
              <img class="me-2" style="cursor: pointer" data-bs-dismiss="modal" aria-label="Close"
                src="../../../assets/icon/close.svg" alt="" />
            </div>
          </div>
          <div style="
              border-radius: 0 0 10px 10px;
              border-bottom: 1px solid rgb(146, 52, 52);
              border: 1px solid white;
              overflow: hidden;
              border-top: none;
            ">
            <div>
              <table class="w-100">
                <thead style="background-color: #fff">
                  <tr>
                    <th class="ps-2 sticky-column"
                      style="width: 40%; background-color: #fff; color: #bd0720;font-size: 16px;font-weight: 400;">
                      บริษัท
                    </th>
                    <th class="text-center"
                      style="width: 20%; background-color: #fff; color: #bd0720;font-size: 16px;font-weight: 400;">
                      เหย้าชนะ
                    </th>
                    <th class="text-center"
                      style="width: 20%; background-color: #fff; color: #bd0720;font-size: 16px;font-weight: 400;">
                      เสมอ
                    </th>
                    <th class="text-center"
                      style="width: 20%; background-color: #fff; color: #bd0720;font-size: 16px;font-weight: 400;">
                      เยือนชนะ
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div style="max-height: 295px; overflow-y: auto">
              <table class="w-100" style="border-radius: 0 0 10px 10px; overflow: hidden">
                <tbody style="background-color: #DEDFE4; border-radius: 0 0 10px 10px; color: #101452">
                  <template v-if="Array.isArray(handicap)">
                    <tr v-for="(item, index) in handicap" :key="index" class="wrapper-rows" :style="{
                      'border-bottom': index !== handicap.length - 1 ? '1px solid white' : 'none'
                    }">
                      <td style="width: 40%;font-size: 14px;font-weight: 400;" class="ps-2">{{ item.cn }}</td>
                      <td style="width: 20%;font-size: 14px;font-weight: 400;" class="text-center">{{ item.datalast1 }}
                      </td>
                      <td style="width: 20%;font-size: 14px;font-weight: 400;" class="text-center">{{ item.datalast2 }}
                      </td>
                      <td style="width: 20%;font-size: 14px;font-weight: 400;" class="text-center">{{ item.datalast3 }}
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td class="text-center" colspan="4">not data.....</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal 1 x 2 -->
    <div class="modal fade" id="exampleModal1x2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" style="margin-top: 145px">
        <div class="modal-content">
          <div class="modal-headers">
            <div class="d-flex justify-content-between" style="justify-content: space-between">
              <div id="exampleModalLabel">1 x 2</div>
              <img class="me-2" style="cursor: pointer" data-bs-dismiss="modal" aria-label="Close"
                src="../../../assets/icon/close.svg" alt="" />
            </div>
          </div>
          <div style="
              border-radius: 0 0 10px 10px;
              border-bottom: 1px solid rgb(146, 52, 52);
              border: 1px solid white;
              overflow: hidden;
              border-top: none;
            ">
            <div>
              <table class="w-100">
                <thead style="background-color: #fff">
                  <tr>
                    <th class="ps-2 sticky-column"
                      style="width: 40%; background-color: #fff; color: #bd0720;font-size: 16px;font-weight: 400;">
                      บริษัท
                    </th>
                    <th class="text-center"
                      style="width: 20%; background-color: #fff; color: #bd0720;font-size: 16px;font-weight: 400;">
                      เหย้าชนะ
                    </th>
                    <th class="text-center"
                      style="width: 20%; background-color: #fff; color: #bd0720;font-size: 16px;font-weight: 400;">
                      เสมอ
                    </th>
                    <th class="text-center"
                      style="width: 20%; background-color: #fff; color: #bd0720;font-size: 16px;font-weight: 400;">
                      เยือนชนะ
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div style="max-height: 295px; overflow-y: auto">
              <table class="w-100" style="border-radius: 0 0 10px 10px; overflow: hidden">
                <tbody style="background-color: #DEDFE4; border-radius: 0 0 10px 10px; color: #101452">
                  <template v-if="Array.isArray(oneTwo)">
                    <tr v-for="(item, index) in oneTwo" :key="index" class="wrapper-rows" :style="{
                      'border-bottom': index !== oneTwo.length - 1 ? '1px solid white' : 'none'
                    }">
                      <td style="width: 40%;font-size: 14px;font-weight: 400;" class="ps-2">{{ item.cn }}</td>
                      <td style="width: 20%;font-size: 14px;font-weight: 400;" class="text-center">{{ item.datalast1 }}
                      </td>
                      <td style="width: 20%;font-size: 14px;font-weight: 400;" class="text-center">{{ item.datalast2 }}
                      </td>
                      <td style="width: 20%;font-size: 14px;font-weight: 400;" class="text-center">{{ item.datalast3 }}
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td class="text-center" colspan="4">not data.....</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal สูง/ต่ำ -->
    <div class="modal fade" id="exampleModalhightLow" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" style="margin-top: 145px">
        <div class="modal-content">
          <div class="modal-headers">
            <div class="d-flex justify-content-between" style="justify-content: space-between">
              <div id="exampleModalLabel">ราคา สูง/ต่ำ</div>
              <img class="me-2" style="cursor: pointer" data-bs-dismiss="modal" aria-label="Close"
                src="../../../assets/icon/close.svg" alt="" />
            </div>
          </div>
          <div class="" style="
              border-radius: 0 0 10px 10px;
              border-bottom: 1px solid rgb(146, 52, 52);
              border: 1px solid white;
              overflow: hidden;
              border-top: none;
            ">
            <div>
              <table class="w-100">
                <thead style="background-color: #d9d9d9">
                  <tr>
                    <th class="ps-2 sticky-column"
                      style="width: 40%; background-color: #fff; color: #bd0720;font-size: 16px;font-weight: 400;">
                      บริษัท
                    </th>
                    <th class="text-center"
                      style="width: 20%; background-color: #fff; color: #bd0720;font-size: 16px;font-weight: 400;">
                      เหย้าชนะ
                    </th>
                    <th class="text-center"
                      style="width: 20%; background-color: #fff; color: #bd0720;font-size: 16px;font-weight: 400;">
                      เสมอ
                    </th>
                    <th class="text-center"
                      style="width: 20%; background-color: #fff; color: #bd0720;font-size: 16px;font-weight: 400;">
                      เยือนชนะ
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div style="max-height: 295px; overflow-y: auto">
              <table class="w-100" style="border-radius: 0 0 10px 10px; overflow: hidden">
                <tbody style="background-color: #DEDFE4; border-radius: 0 0 10px 10px; color: #101452">
                  <template v-if="Array.isArray(over)">
                    <tr v-for="(item, index) in over" :key="index" class="wrapper-rows" :style="{
                      'border-bottom': index !== over.length - 1 ? '1px solid white' : 'none'
                    }">
                      <td style="width: 40%;font-size: 14px;font-weight: 400;" class="ps-2">{{ item.cn }}</td>
                      <td style="width: 20%;font-size: 14px;font-weight: 400;" class="text-center">{{ item.datalast1 }}
                      </td>
                      <td style="width: 20%;font-size: 14px;font-weight: 400;" class="text-center">{{ item.datalast2 }}
                      </td>
                      <td style="width: 20%;font-size: 14px;font-weight: 400;" class="text-center">{{ item.datalast3 }}
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td class="text-center" colspan="4">not data.....</td>
                    </tr>
                  </template>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal line-ups-->
    <div style="padding-top: 100px">
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
      style="margin-top: 60px">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">LINE-UPS</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="wrapper-body-modal">
            <div class="body-modal" style="overflow-y: auto">
              <div v-if="lineUpModalData?.lineUp?.LineUpteamA.length! > 0 &&
                lineUpModalData?.lineUp?.LineUpteamB.length! > 0
                " class="mb-1 d-flex align-items-center">
                {{ matchDetails?.match_detail[0]?.teamb_name_th }}
                <img class="ms-1" style="width: 25px; height: 25px; border-radius: 50%"
                  :src="matchDetails?.match_detail[0]?.teamb_img" alt="" />
              </div>
              <div v-if="lineUpModalData?.lineUp?.LineUpteamA.length! > 0 &&
                lineUpModalData?.lineUp?.LineUpteamB.length! > 0
                " style="position: relative; width: 100%; height: 100%">
                <img src="../../../assets//img/soccer-green-field_225004-1137.png" alt="" style="width: 100%" />
                <!-- lin-ups team B -->
                <div style="position: absolute; top: 5%; height: 45%; width: 100%">
                  <div class="container">
                    <div v-for="(item, index) in lineUpModalData?.lineUp?.LineUpteamB" :key="index" class="w-100">
                      <div class="d-flex w-100 justify-content-around">
                        <div v-for="(item2, indexs) in item.rowLineUp" :key="indexs">
                          <div class="text-center">
                            <div class="wrapper-node-a" style="font-size: 12px">
                              <div class="w-100">
                                {{ item2.jerseyNumber }}
                              </div>
                            </div>
                            <!-- <div style="font-size: 12px;color: white;">
                                {{ item2.playerNameTh }}
                              </div> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- line-ups team A -->
                <div style="position: absolute; bottom: 5%; height: 45%; width: 100%">
                  <div class="container">
                    <div v-for="(item, index) in lineUpModalData?.lineUp?.LineUpteamA" :key="index" class="w-100">
                      <div class="d-flex w-100 justify-content-around">
                        <div v-for="(item2, indexs) in item.rowLineUp" :key="indexs">
                          <div class="text-center" style="position: relative">
                            <div class="wrapper-node-b" style="font-size: 12px">
                              <div class="w-100">
                                {{ item2.jerseyNumber }}
                              </div>
                            </div>
                            <!-- <div style="font-size: 12px;color: white; position: absolute;top:;">
                                ppppppppppp
                              </div> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="lineUpModalData?.lineUp?.LineUpteamA.length! > 0 &&
                lineUpModalData?.lineUp?.LineUpteamB.length! > 0
                " class="mb-1 d-flex align-items-center">
                {{ matchDetails?.match_detail[0]?.teama_name_th }}
                <img class="ms-1" style="width: 25px; height: 25px; border-radius: 50%"
                  :src="matchDetails?.match_detail[0]?.teama_img" alt="" />
              </div>
              <!-- ผู้เล่นตัวจริงทีม A -->
              <div v-if="lineUpTeamA != undefined" class="accordion mt-3" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapsRealPlayerA" aria-expanded="true" aria-controls="collapsRealPlayerA">
                      <div class="text-decoration-underline" style="font-size: 18px; font-weight: 600;color: #101452;">
                        ผู้เล่นตัวจริง {{ matchDetails?.match_detail[0]?.teama_name_th }}
                      </div>
                    </button>
                  </h2>
                  <div id="collapsRealPlayerA" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <!-- body -->
                    <div class="wrapper-body-accordion-modal pt-3">
                      <div class="d-flex align-items-center" style="flex-wrap: wrap; justify-content: space-between">
                        <div v-for="(item, index) in lineUpTeamA" :key="index" class="item"
                          style="width: 48%; margin-bottom: 28px">
                          <div class="d-flex w-100 ps-4 align-items-center">
                            <div class="circle-number me-2" style="font-size: 0.9rem">
                              <div class="d-flex align-items-center justify-content-center"
                                style="width: 22px; font-size: 14px">
                                {{ item.position }}
                              </div>
                            </div>
                            <div style="font-size: 0.9rem">
                              {{ item.playerName }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ผู้เล่นตัวจริงทีม B -->
              <div v-if="lineUpTeamB != undefined" class="accordion mt-3" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapsRealPlayerB" aria-expanded="true" aria-controls="collapsRealPlayerB">
                      <div class="text-decoration-underline" style="font-size: 18px; font-weight: 600;color: #101452;">
                        ผู้เล่นตัวจริง {{ matchDetails?.match_detail[0]?.teamb_name_th }}
                      </div>
                    </button>
                  </h2>
                  <div id="collapsRealPlayerB" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <!-- body -->
                    <div class="wrapper-body-accordion-modal pt-3">
                      <div class="d-flex align-items-center" style="flex-wrap: wrap; justify-content: space-between">
                        <div v-for="(item, index) in lineUpTeamB" :key="index" class="item"
                          style="width: 48%; margin-bottom: 28px">
                          <div class="d-flex w-100 ps-4 align-items-center">
                            <div class="circle-number me-2" style="font-size: 0.9rem">
                              <div class="d-flex align-items-center justify-content-center"
                                style="width: 22px; font-size: 14px">
                                {{ item.position }}
                              </div>
                            </div>
                            <div style="font-size: 0.9rem">
                              {{ item.playerName }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- การเปลี่ยนตัว team A -->
              <div v-if="lineUpModalData?.switchPlayer?.teamA.length! > 0" class="accordion mt-3" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapsSwitchA" aria-expanded="true" aria-controls="collapsSwitchA">
                      <div class="text-decoration-underline" style="font-size: 18px; font-weight: 600;color: #101452;">
                        การเปลี่ยนตัว {{ matchDetails?.match_detail[0]?.teama_name_th }}
                      </div>
                    </button>
                  </h2>
                  <div id="collapsSwitchA" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <!-- body -->
                    <div class="wrapper-body-accordion-modal pt-3">
                      <div class="d-flex align-items-center" style="flex-wrap: wrap; justify-content: space-between">
                        <div v-for="(item, index) in lineUpModalData?.switchPlayer?.teamA" :key="index" class="item"
                          style="width: 48%; margin-bottom: 28px">
                          <div class="d-flex w-100 ps-4">
                            <div class="d-flex align-items-center me-2" style="font-size: 14px">
                              {{ item.eventTime }}'
                            </div>
                            <div>
                              <div class="d-flex">
                                <div class="d-flex align-items-center">
                                  <img style="width: 20px" :src="item.eventImg1" alt="" />
                                </div>
                                <div class="ms-2" style="font-size: 14px">{{ item.playerName1 }}</div>
                              </div>
                              <div class="d-flex">
                                <div class="d-flex align-items-center">
                                  <img style="width: 20px" :src="item.eventImg2" alt="" />
                                </div>
                                <div class="ms-2" style="font-size: 14px">{{ item.playerName2 }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- การเปลี่ยนตัว team B -->
              <div v-if="lineUpModalData?.switchPlayer?.teamB.length! > 0" class="accordion mt-3" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapsSwitchB" aria-expanded="true" aria-controls="collapsSwitchB">
                      <div class="text-decoration-underline" style="font-size: 18px; font-weight: 600;color: #101452;">
                        การเปลี่ยนตัว {{ matchDetails?.match_detail[0]?.teamb_name_th }}
                      </div>
                    </button>
                  </h2>
                  <div id="collapsSwitchB" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <!-- body -->
                    <div class="wrapper-body-accordion-modal pt-3">
                      <div class="d-flex align-items-center" style="flex-wrap: wrap; justify-content: space-between">
                        <div v-for="(item, index) in lineUpModalData?.switchPlayer?.teamB" :key="index" class="item"
                          style="width: 48%; margin-bottom: 28px">
                          <div class="d-flex w-100 ps-4">
                            <div class="d-flex align-items-center me-2" style="font-size: 14px">
                              {{ item.eventTime }}'
                            </div>
                            <div>
                              <div class="d-flex">
                                <div class="d-flex align-items-center">
                                  <img style="width: 20px" :src="item.eventImg1" alt="" />
                                </div>
                                <div class="ms-2" style="font-size: 14px">{{ item.playerName1 }}</div>
                              </div>
                              <div class="d-flex">
                                <div class="d-flex align-items-center">
                                  <img style="width: 20px" :src="item.eventImg2" alt="" />
                                </div>
                                <div class="ms-2" style="font-size: 14px">{{ item.playerName2 }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ผู้เล่นสำรอง team A -->
              <div v-if="lineUpModalData?.subLineUp?.LineUpteamA.length! > 0" class="accordion mt-3"
                id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapsSubPlayerA" aria-expanded="true" aria-controls="collapsSubPlayerA">
                      <div class="text-decoration-underline" style="font-size: 18px; font-weight: 600;color: #101452;">
                        ผู้เล่นสำรอง {{ matchDetails?.match_detail[0]?.teama_name_th }}
                      </div>
                    </button>
                  </h2>
                  <div id="collapsSubPlayerA" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <!-- body -->
                    <div class="wrapper-body-accordion-modal pt-3">
                      <div class="d-flex  align-items-center" style="flex-wrap: wrap; justify-content: space-between">
                        <div v-for="(item, index) in lineUpModalData?.subLineUp?.LineUpteamA" :key="index" class="item"
                          style="width: 48%; margin-bottom: 28px">
                          <div class="d-flex w-100 ps-4 align-items-center">
                            <div class="circle-number me-2" style="font-size: 0.9rem">
                              <div class="d-flex align-items-center justify-content-center"
                                style="width: 22px; font-size: 14px">
                                {{ item.jerseyNumber }}
                              </div>
                            </div>
                            <div style="font-size: 0.9rem">
                              {{ item.playerNameTh }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ผู้เล่นสำรอง team B -->
              <div v-if="lineUpModalData?.subLineUp?.LineUpteamB.length! > 0" class="accordion mt-3"
                id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapsSubPlayerB" aria-expanded="true" aria-controls="collapsSubPlayerB">
                      <div class="text-decoration-underline" style="font-size: 18px; font-weight: 600;color: #101452;">
                        ผู้เล่นสำรอง {{ matchDetails?.match_detail[0]?.teamb_name_th }}
                      </div>
                    </button>
                  </h2>
                  <div id="collapsSubPlayerB" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <!-- body -->
                    <div class="wrapper-body-accordion-modal pt-3">
                      <div class="d-flex align-items-center" style="flex-wrap: wrap; justify-content: space-between">
                        <div v-for="(item, index) in lineUpModalData?.subLineUp?.LineUpteamB" :key="index" class="item"
                          style="width: 48%; margin-bottom: 28px">
                          <div class="d-flex w-100 ps-4 align-items-center">
                            <div class="circle-number me-2" style="font-size: 0.9rem">
                              <div class="d-flex align-items-center justify-content-center"
                                style="width: 22px; font-size: 14px">
                                {{ item.jerseyNumber }}
                              </div>
                            </div>
                            <div style="font-size: 0.9rem">
                              {{ item.playerNameTh }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- อาการบาดเจ็บและการพักโทษ team A-->
              <div v-if="lineUpModalData?.playerConditions?.teamA.injury?.length! > 0" class="accordion mt-3"
                id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapsHospitalA" aria-expanded="true" aria-controls="collapsHospitalA">
                      <div class="text-decoration-underline" style="font-size: 18px; font-weight: 600;color: #101452;">
                        อาการบาดเจ็บและการพักโทษ {{ matchDetails?.match_detail[0]?.teama_name_th }}
                      </div>
                    </button>
                  </h2>
                  <div id="collapsHospitalA" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <!-- body -->
                    <div class="wrapper-body-accordion-modal pt-3 pb-3">
                      <div class="d-flex" style="flex-wrap: wrap; justify-content: space-between">
                        <div v-for="(item, index) in lineUpModalData?.playerConditions?.teamA.injury" :key="index"
                          class="item" style="width: 48%;">
                          <div class="d-flex w-100 ps-4 align-items-center" style="min-height: 60px;">
                            <img class="hospital-icon-style" style="width: 30px"
                              src="../../../assets/icon/whiteHospital.svg" alt="" />
                            <div class="ms-2" style="font-size: 0.9rem">
                              {{ item.playerNameTh }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- อาการบาดเจ็บและการพักโทษ team B-->
              <div v-if="lineUpModalData?.playerConditions?.teamB.injury?.length! > 0" class="accordion mt-3"
                id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapsHospitalB" aria-expanded="true" aria-controls="collapsHospitalB">
                      <div class="text-decoration-underline" style="font-size: 18px; font-weight: 600;color: #101452;">
                        อาการบาดเจ็บและการพักโทษ {{ matchDetails?.match_detail[0]?.teamb_name_th }}
                      </div>
                    </button>
                  </h2>
                  <div id="collapsHospitalB" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <!-- body -->
                    <div class="wrapper-body-accordion-modal pt-3 pb-3">
                      <div class="d-flex" style="flex-wrap: wrap; justify-content: space-between">
                        <div v-for="(item, index) in lineUpModalData?.playerConditions?.teamB.injury" :key="index"
                          class="item" style="width: 48%;">
                          <div class="d-flex w-100 ps-4 align-items-center" style="min-height: 60px;">
                            <img class="hospital-icon-style" style="width: 30px"
                              src="../../../assets/icon/whiteHospital.svg" alt="" />
                            <div class="ms-2" style="font-size: 0.9rem">
                              {{ item.playerNameTh }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="justLineUpA === undefined &&
                justLineUpB === undefined &&
                justPlayerConditionA === undefined &&
                justPlayerConditionB === undefined &&
                justSubLineUpA === undefined &&
                justSubLineUpB === undefined &&
                justSwitchPlayerA === undefined &&
                justSwitchPlayerB === undefined
                " class="d-flex justify-content-center" style="color: #101452">
                Not Data...
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
.accordion-button {
  background-color: #dedfe4;
  color: white;
}

.accordion-button:not(.collapsed) {
  color: white;
  background-color: none;
  box-shadow: none;
}

.accordion {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  --bs-accordion-border-radius: 10px;
  --bs-accordion-active-bg: none;
  --bs-accordion-btn-focus-box-shadow: none;
  --bs-accordion-border-color: rgba(255, 255, 255, 0);
  --bs-accordion-bg: none;
  --bs-accordion-btn-icon: url('../../../assets/icon/angle-down-solid.svg');
  --bs-accordion-btn-active-icon: url('../../../assets/icon/angle-down-solid.svg');
}
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

.sticky-column {
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: #d9d9d9;
  color: #bd0720;
}

.wrapper-rows {
  border-radius: 0 0 10px 10px;
}

.modal-headers {
  border-radius: 10px 10px 0 0;
  background-color: #bd0720;
  color: white;
  padding: 5px;
  border-bottom: none;
}

.modal {
  --bs-modal-bg: none;
  --bs-modal-padding: none;
  --bs-modal-border-color: none;
}

.btn-bet {
  background-color: #bd0720;
  border: none;
  border-radius: 5px;
  color: white;
  padding-left: 15px;
  padding-right: 15px;
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

.box-result {
  padding-left: 2px;
  padding-right: 2px;
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

.align-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper-team {
  position: relative;
  padding-top: 20px;
}

.d-flex.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
