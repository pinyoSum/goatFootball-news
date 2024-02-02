<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import { FetchModalsLineUpDetails } from '@/api/football'
import { useRoute } from 'vue-router'
import type { IModalLineUp } from '@/model/IModalLineUp'

const route = useRoute()

const props = withDefaults(defineProps<{ matchDetail: any }>(), {
    matchDetail: null
})

const FetchModalLineup = async () => {
    lineUpModalData.value = await FetchModalsLineUpDetails(Number(route.params.id))
    lineUp.teamA = MapRealLineUpList(lineUpModalData.value?.lineUp?.LineUpteamA)
    lineUp.teamB = MapRealLineUpList(lineUpModalData.value?.lineUp?.LineUpteamB)
}
const MapRealLineUpList = (lineUpData: any) => {
    if (lineUpData != null || undefined) {
        return lineUpData.map((team: any) => {
            return team.rowLineUp.map((player: any) => {
                return {
                    playerName: player.playerNameTh,
                    position: player.jerseyNumber
                };
            });
        }).flat();
    }
    else return []
}
const FormatPrice = (value: string | null) => {
    if (value && value != null) {
        const rate = value.replace('-', '')
        const parts = rate.split('.')
        if (parts[1] === '25') {
            return `${parts[0]}/${parseFloat(rate) + 0.25}`
        } else if (parts[1] === '75') {
            return `${parseFloat(rate) - 0.25}/${parseFloat(rate) + 0.25}`
        }
        return rate
    } else return `-`
}

const matchDetail = computed(() => props.matchDetail)
const lineUpModalData = ref<IModalLineUp | null>(null)
const lineUp = reactive({
    teamA: [] as { playerName: string; position: number }[],
    teamB: [] as { playerName: string; position: number }[],
})

</script>

<template>
    <div class="text-center pt-2 mb-2" style="color: #fff; background-color: #dedfe4; border-radius: 15px">
        <div class="normal-text">
            {{ matchDetail?.league_name_th }}
        </div>
        <div class="d-flex center w-100">
            <div class="wrapper-team" style="width: 160px">
                <div v-if="parseFloat(matchDetail?.rate_last) > 0" class="price">
                    {{ matchDetail?.rate_last.replace('-', '') }}
                </div>
                <img style="width: 60px; height: 60px; border-radius: 50%" :src="matchDetail?.teama_img" />
                <div class="normal-text">{{ matchDetail?.teama_name_th }}</div>
                <div class="d-flex align-center">
                    <div style="background-color: #ffcc02" class="box-result me-1">
                        {{ matchDetail?.teamayellow }}
                    </div>
                    <div style="background-color: #bd0720" class="box-result">
                        {{ matchDetail?.teamared }}
                    </div>
                </div>
            </div>
            <div class="text-primary" v-if="matchDetail?.match_status == '-1'"
                style="font-size: 18px; font-weight: 600; width: 50px">
                {{ matchDetail?.scorea }} - {{ matchDetail?.scoreb }}
            </div>
            <div v-else class="text-primary" style="font-size: 18px; font-weight: 600; width: 50px">
                VS
            </div>
            <div class="wrapper-team" style="width: 160px">
                <div v-if="parseFloat(matchDetail?.rate_last) < 0" class="priceB">
                    {{ matchDetail?.rate_last.replace('-', '') }}
                </div>
                <img style="width: 60px; height: 60px; border-radius: 50%" :src="matchDetail?.teamb_img" alt="" />
                <div class="normal-text">{{ matchDetail?.teamb_name_th }}</div>
                <div class="d-flex align-center">
                    <div style="background-color: #ffcc02" class="box-result me-1">
                        {{ matchDetail?.teambyellow }}
                    </div>
                    <div style="background-color: #bd0720" class="box-result">
                        {{ matchDetail?.teambred }}
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-3 normal-text d-flex justify-content-center">
            ราคาเปิด :
            <div class="normal-text ms-1 text-primary">
                {{ FormatPrice(matchDetail?.rate_open) }}
            </div>
        </div>
        <div class="d-flex center">
            <div class="me-1 normal-text">ราคาปัจจุบัน :</div>
            <div class="normal-text ms-1 me-1 text-primary">
                {{ FormatPrice(matchDetail?.rate_last) }}
            </div>
            <img v-if="matchDetail?.rate_open && matchDetail?.rate_last && parseFloat(matchDetail?.rate_open.replace('-', '')) < parseFloat(matchDetail?.rate_last.replace('-', ''))"
                src="../assets/icon/bet-arrow-down/bet-up-arrow-green.svg" />
            <img v-if="matchDetail?.rate_open && matchDetail?.rate_last && parseFloat(matchDetail?.rate_open.replace('-', '')) > parseFloat(matchDetail?.rate_last.replace('-', ''))"
                src="../assets/icon/bet-arrow-down/bet-down-arrow-red.svg" />
        </div>
        <div class="mt-2 text-primary" style="font-style: italic">
            {{ matchDetail?.noteopen }}
        </div>
        <button class="btn-line-up" style="background-color: #bd0720" type="button" data-bs-toggle="modal"
            data-bs-target="#exampleModal" @click="FetchModalLineup">
            LINE-UPS
        </button>
    </div>
    <!-- modal -->
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
                                {{ matchDetail?.teamb_name_th }}
                                <img class="ms-1" style="width: 25px; height: 25px; border-radius: 50%"
                                    :src="matchDetail?.teamb_img" alt="" />
                            </div>
                            <div v-if="lineUpModalData?.lineUp?.LineUpteamA.length! > 0 &&
                                lineUpModalData?.lineUp?.LineUpteamB.length! > 0
                                " style="position: relative; width: 100%; height: 100%">
                                <img src="../assets//img/soccer-green-field_225004-1137.png" alt=""
                                    style="width: 100%" />
                                <!-- lin-ups team B -->
                                <div style="position: absolute; top: 5%; height: 45%; width: 100%">
                                    <div class="container">
                                        <div v-for="(item, index) in lineUpModalData?.lineUp?.LineUpteamB" :key="index"
                                            class="w-100">
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
                                        <div v-for="(item, index) in lineUpModalData?.lineUp?.LineUpteamA" :key="index"
                                            class="w-100">
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
                                " class="mt-1 d-flex align-items-center">
                                {{ matchDetail?.teama_name_th }}
                                <img class="ms-1" style="width: 25px; height: 25px; border-radius: 50%"
                                    :src="matchDetail?.teama_img" alt="" />
                            </div>
                            <!-- ผู้เล่นตัวจริงทีม A -->
                            <div v-if="lineUp.teamA != undefined" class="accordion mt-3" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapsRealPlayerA" aria-expanded="true"
                                            aria-controls="collapsRealPlayerA">
                                            <div class="text-decoration-underline"
                                                style="font-size: 18px; font-weight: 600; color: #101452">
                                                ผู้เล่นตัวจริง {{ matchDetail?.teama_name_th }}
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapsRealPlayerA" class="accordion-collapse collapse show"
                                        aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <!-- body -->
                                        <div class="wrapper-body-accordion-modal pt-3">
                                            <div class="d-flex align-items-center"
                                                style="flex-wrap: wrap; justify-content: space-between">
                                                <div v-for="(item, index) in lineUp.teamA" :key="index" class="item"
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
                            <div v-if="lineUp.teamB != undefined" class="accordion mt-3" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapsRealPlayerB" aria-expanded="true"
                                            aria-controls="collapsRealPlayerB">
                                            <div class="text-decoration-underline"
                                                style="font-size: 18px; font-weight: 600; color: #101452">
                                                ผู้เล่นตัวจริง {{ matchDetail?.teamb_name_th }}
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapsRealPlayerB" class="accordion-collapse collapse show"
                                        aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <!-- body -->
                                        <div class="wrapper-body-accordion-modal pt-3">
                                            <div class="d-flex align-items-center"
                                                style="flex-wrap: wrap; justify-content: space-between">
                                                <div v-for="(item, index) in lineUp.teamB" :key="index" class="item"
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
                            <div v-if="lineUpModalData?.switchPlayer?.teamA.length! > 0" class="accordion mt-3"
                                id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapsSwitchA" aria-expanded="true"
                                            aria-controls="collapsSwitchA">
                                            <div class="text-decoration-underline"
                                                style="font-size: 18px; font-weight: 600; color: #101452">
                                                การเปลี่ยนตัว {{ matchDetail?.teama_name_th }}
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapsSwitchA" class="accordion-collapse collapse show"
                                        aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <!-- body -->
                                        <div class="wrapper-body-accordion-modal pt-3">
                                            <div class="d-flex align-items-center"
                                                style="flex-wrap: wrap; justify-content: space-between">
                                                <div v-for="(item, index) in lineUpModalData?.switchPlayer?.teamA"
                                                    :key="index" class="item" style="width: 48%; margin-bottom: 28px">
                                                    <div class="d-flex w-100 ps-4">
                                                        <div class="d-flex align-items-center me-2" style="font-size: 14px">
                                                            {{ item.eventTime }}'
                                                        </div>
                                                        <div>
                                                            <div class="d-flex">
                                                                <div class="d-flex align-items-center">
                                                                    <img style="width: 20px" :src="item.eventImg1" alt="" />
                                                                </div>
                                                                <div class="ms-2" style="font-size: 14px">
                                                                    {{ item.playerName1 }}
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="d-flex align-items-center">
                                                                    <img style="width: 20px" :src="item.eventImg2" alt="" />
                                                                </div>
                                                                <div class="ms-2" style="font-size: 14px">
                                                                    {{ item.playerName2 }}
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
                            <!-- การเปลี่ยนตัว team B -->
                            <div v-if="lineUpModalData?.switchPlayer?.teamB.length! > 0" class="accordion mt-3"
                                id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapsSwitchB" aria-expanded="true"
                                            aria-controls="collapsSwitchB">
                                            <div class="text-decoration-underline"
                                                style="font-size: 18px; font-weight: 600; color: #101452">
                                                การเปลี่ยนตัว {{ matchDetail?.teamb_name_th }}
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapsSwitchB" class="accordion-collapse collapse show"
                                        aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <!-- body -->
                                        <div class="wrapper-body-accordion-modal pt-3">
                                            <div class="d-flex align-items-center"
                                                style="flex-wrap: wrap; justify-content: space-between">
                                                <div v-for="(item, index) in lineUpModalData?.switchPlayer?.teamB"
                                                    :key="index" class="item" style="width: 48%; margin-bottom: 28px">
                                                    <div class="d-flex w-100 ps-4">
                                                        <div class="d-flex align-items-center me-2" style="font-size: 14px">
                                                            {{ item.eventTime }}'
                                                        </div>
                                                        <div>
                                                            <div class="d-flex">
                                                                <div class="d-flex align-items-center">
                                                                    <img style="width: 20px" :src="item.eventImg1" alt="" />
                                                                </div>
                                                                <div class="ms-2" style="font-size: 14px">
                                                                    {{ item.playerName1 }}
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="d-flex align-items-center">
                                                                    <img style="width: 20px" :src="item.eventImg2" alt="" />
                                                                </div>
                                                                <div class="ms-2" style="font-size: 14px">
                                                                    {{ item.playerName2 }}
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
                            <!-- ผู้เล่นสำรอง team A -->
                            <div v-if="lineUpModalData?.subLineUp?.LineUpteamA.length! > 0" class="accordion mt-3"
                                id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapsSubPlayerA" aria-expanded="true"
                                            aria-controls="collapsSubPlayerA">
                                            <div class="text-decoration-underline"
                                                style="font-size: 18px; font-weight: 600; color: #101452">
                                                ผู้เล่นสำรอง {{ matchDetail?.teama_name_th }}
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapsSubPlayerA" class="accordion-collapse collapse show"
                                        aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <!-- body -->
                                        <div class="wrapper-body-accordion-modal pt-3">
                                            <div class="d-flex align-items-center"
                                                style="flex-wrap: wrap; justify-content: space-between">
                                                <div v-for="(item, index) in lineUpModalData?.subLineUp?.LineUpteamA"
                                                    :key="index" class="item" style="width: 48%; margin-bottom: 28px">
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
                                            data-bs-target="#collapsSubPlayerB" aria-expanded="true"
                                            aria-controls="collapsSubPlayerB">
                                            <div class="text-decoration-underline"
                                                style="font-size: 18px; font-weight: 600; color: #101452">
                                                ผู้เล่นสำรอง {{ matchDetail?.teamb_name_th }}
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapsSubPlayerB" class="accordion-collapse collapse show"
                                        aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <!-- body -->
                                        <div class="wrapper-body-accordion-modal pt-3">
                                            <div class="d-flex align-items-center"
                                                style="flex-wrap: wrap; justify-content: space-between">
                                                <div v-for="(item, index) in lineUpModalData?.subLineUp?.LineUpteamB"
                                                    :key="index" class="item" style="width: 48%; margin-bottom: 28px">
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
                                            data-bs-target="#collapsHospitalA" aria-expanded="true"
                                            aria-controls="collapsHospitalA">
                                            <div class="text-decoration-underline"
                                                style="font-size: 18px; font-weight: 600; color: #101452">
                                                อาการบาดเจ็บและการพักโทษ {{ matchDetail?.teama_name_th }}
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapsHospitalA" class="accordion-collapse collapse show"
                                        aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <!-- body -->
                                        <div class="wrapper-body-accordion-modal pt-3 pb-3">
                                            <div class="d-flex" style="flex-wrap: wrap; justify-content: space-between">
                                                <div v-for="(item, index) in lineUpModalData?.playerConditions?.teamA.injury"
                                                    :key="index" class="item" style="width: 48%">
                                                    <div class="d-flex w-100 ps-4 align-items-center"
                                                        style="min-height: 60px">
                                                        <img class="hospital-icon-style" style="width: 30px"
                                                            src="../assets/icon/whiteHospital.svg" alt="" />
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
                                            data-bs-target="#collapsHospitalB" aria-expanded="true"
                                            aria-controls="collapsHospitalB">
                                            <div class="text-decoration-underline"
                                                style="font-size: 18px; font-weight: 600; color: #101452">
                                                อาการบาดเจ็บและการพักโทษ {{ matchDetail?.teamb_name_th }}
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapsHospitalB" class="accordion-collapse collapse show"
                                        aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <!-- body -->
                                        <div class="wrapper-body-accordion-modal pt-3 pb-3">
                                            <div class="d-flex" style="flex-wrap: wrap; justify-content: space-between">
                                                <div v-for="(item, index) in lineUpModalData?.playerConditions?.teamB.injury"
                                                    :key="index" class="item" style="width: 48%">
                                                    <div class="d-flex w-100 ps-4 align-items-center"
                                                        style="min-height: 60px">
                                                        <img class="hospital-icon-style" style="width: 30px"
                                                            src="../assets/icon/whiteHospital.svg" alt="" />
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
                            <div v-if="!lineUpModalData?.lineUp && !lineUpModalData?.playerConditions && !lineUpModalData?.subLineUp && !lineUpModalData?.switchPlayer
                                " class="d-flex justify-content-center" style="color: #101452">
                                Not Data...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<style scoped lang="scss">
.normal-text {
    font-size: 16px;
    font-weight: 400;
    color: #101452;
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

.wrapper-body-accordion-modal {
    background-color: #ededed;
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

.result-match {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.result-match {
    background-color: #ffc008;
    padding: 5px;
}

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

.price {
    border-radius: 4px;
    padding-right: 4px;
    padding-left: 4px;
    background-color: #bd0720;
    position: absolute;
    left: 52%;
    top: 5px;
}

.priceB {
    border-radius: 4px;
    padding-right: 4px;
    padding-left: 4px;
    background-color: #bd0720;
    position: absolute;
    left: 55%;
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
}</style>