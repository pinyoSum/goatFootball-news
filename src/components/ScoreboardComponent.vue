<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Api from '@/api/axiosConfig'
import { FetchTeamDetails } from '@/services/api/football';
import router from '@/router';

interface ITeamDetails {
    teamID: number,
    matchComing: ITeamMatchDetails[],
    matchEnd: ITeamMatchDetails[],
    players: IPlayers[]
}
interface ITeamMatchDetails {
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
interface IPlayers {
    playerNameTh: string,
    playerNameEn: string,
    playerID: number,
    playerImg: string,
    playerNumber: string
    position: string
}

const props = withDefaults(defineProps<{ id: string, typeOfId: string }>(), {
})

// typeOfId = leagueID, matchID
const GetScoreboard = async () => {
    if (props.typeOfId == 'leagueID') {
        const res = await Api.get(`/api/league_stand/${props.id}`)
        scoreBoardData.value = res.data.data.stand
    } else {
        const res = await Api.get(`/api/get_stand/${props.id}`)
        scoreBoardData.value = res.data.data
    }
}
const ModalTableScorer = async (id: any) => {
    modalTeamDetail.value = await FetchTeamDetails(id) as ITeamDetails;
}
const GotoPagePlayerPowerByPlayer = (playerId: number) => {
    router.push(`/player-power/team/${props.id}/player/${playerId}`)
}
const RouterPushMatchDetailPage = (id: number) => {
    const routePath = `/match-football/${id}`
    router.push(routePath)
}

const scoreBoardData = ref<any[]>([])
const modalTeamDetail = ref<ITeamDetails>()
const statusModalShow = ref('schedule')

onMounted(async () => {
    await GetScoreboard()
})
</script>

<template>
    <div class="wrapper-table">
        <table style="width: 100%;">
            <thead style="background-color:#DEDFE4; color: #101452; height: 40px;">
                <tr>
                    <th style="width: 50%;">
                        <div class="ps-3 text-start" style="font-size: 16px;font-weight: 400;">
                            TEAM
                        </div>
                    </th>
                    <th style="width: 8%;">
                        <div class="column-font-size text-end">
                            P
                        </div>
                    </th>
                    <th style="width: 8%;">
                        <div class="column-font-size text-end">
                            W
                        </div>
                    </th>
                    <th style="width: 8%;">
                        <div class="column-font-size text-end">
                            D
                        </div>
                    </th>
                    <th style="width: 8%;">
                        <div class="column-font-size text-end">
                            L
                        </div>
                    </th>
                    <th style="width: 20%;">
                        <div class="column-font-size text-center">
                            F:A
                        </div>
                    </th>
                    <th style="width: 10%;">
                        <div class="column-font-size text-center">
                            +/-
                        </div>
                    </th>
                    <th style="width: 10%;">
                        <div class="column-font-size text-end ">
                            PTS
                        </div>
                    </th>
                    <th style="width: 15%;">
                        <div class="footer-text">
                            ACTION
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody style="background-color:#FEFEFE; color: #101452;">
                <template v-if="Array.isArray(scoreBoardData) && scoreBoardData.length > 0">
                    <template v-for="(item, index) in scoreBoardData" :key="index">
                        <tr class="table-row-border">
                            <td>
                                <div class="pt-2 ps-3 pb-0 text-start d-flex align-items-center">
                                    <img style="width: 30px; border-radius: 50%" :src="item.team_img!" alt="">
                                    <div style="font-size: 14px;" class="ms-2">
                                        {{ item.team_name_th }}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="column-font-size text-end ">
                                    {{ item.play }}
                                </div>
                            </td>
                            <td>
                                <div class="column-font-size text-end ">
                                    {{ item.win }}
                                </div>
                            </td>
                            <td>
                                <div class="column-font-size text-end ">
                                    {{ item.draw }}
                                </div>
                            </td>
                            <td>
                                <div class="column-font-size text-end ">
                                    {{ item.lose }}
                                </div>
                            </td>
                            <td>
                                <div class="column-font-size text-center">
                                    {{ item.goal }}/{{ item.goallose }}
                                </div>
                            </td>
                            <td>
                                <div class="column-font-size text-center">
                                    {{ item.goalplus }}
                                </div>
                            </td>
                            <td>
                                <div class="column-font-size text-end me-1">
                                    {{ item.standpoint }}
                                </div>
                            </td>
                            <td>
                                <div class="text-center" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    data-bs-whatever="@mdo" @click="ModalTableScorer(item.team_id)">
                                    <img src="../assets/icon/button/menu.svg" alt="">
                                </div>
                            </td>
                        </tr>
                    </template>
                </template>
                <template v-else>
                    <tr>
                        <td class="text-center" colspan="9">not data.....</td>
                    </tr>
                </template>
            </tbody>
            <tfoot style="background-color: #DEDFE4;">
                <tr>
                    <td>
                        <div class="text-start footer-text">
                        </div>
                    </td>
                    <td>
                        <div class="footer-text">
                        </div>
                    </td>
                    <td>
                        <div class="footer-text">
                        </div>
                    </td>
                    <td>
                        <div class="footer-text">
                        </div>
                    </td>
                    <td>
                        <div class="footer-text">
                        </div>
                    </td>
                    <td>
                        <div class="footer-text">
                        </div>
                    </td>
                    <td>
                        <div class="footer-text">
                        </div>
                    </td>
                    <td>
                        <div class="m-1 footer-text">
                        </div>
                    </td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    </div>
    <!-- Modal -->
    <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="margin-top: 145px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div v-if="Array.isArray(scoreBoardData) && scoreBoardData.length > 0 && scoreBoardData[0].league_image != undefined"
                        class="d-flex align-items-center">
                        <img style="width: 40px;     background: #fff;
    border-radius: 50%;" :src="scoreBoardData[0].league_image" alt="">
                        <h5 v-if="Array.isArray(scoreBoardData) && scoreBoardData.length > 0 && scoreBoardData[0].league_name_th != undefined"
                            class="modal-title ms-2" id="exampleModalLabel">{{ scoreBoardData[0].league_name_th
                            }}</h5>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div style="background-color: #DEDFE4; padding: 1px; border-radius: 0px 0px 10px 10px; overflow: hidden;">
                    <div class="d-flex p-2">
                        <div class="me-2"
                            :class="{ 'text-decoration-underline': statusModalShow === 'schedule', 'text-red': statusModalShow === 'schedule' }"
                            @click="statusModalShow = 'schedule'" style="cursor: pointer;font-size: 18px;">ตารางแข่ง</div>
                        <div class="me-2"
                            :class="{ 'text-decoration-underline': statusModalShow === 'matchResult', 'text-red': statusModalShow === 'matchResult' }"
                            @click="statusModalShow = 'matchResult'" style="cursor: pointer;font-size: 18px;">ผลการแข่ง
                        </div>
                        <div :class="{ 'text-decoration-underline': statusModalShow === 'listPlayer', 'text-red': statusModalShow === 'listPlayer' }"
                            @click="statusModalShow = 'listPlayer'" style="cursor: pointer;font-size: 18px;">รายชื่อนักเตะ
                        </div>
                    </div>
                    <!-- ตารางแข่ง -->
                    <div v-if="statusModalShow === 'schedule'"
                        style="color: #101452;background-color: #FEFEFE;padding-bottom: 0px;border-radius: 0px 0px 10px 10px;max-height: 300px; overflow: auto;">
                        <div v-for="(item, index) in modalTeamDetail?.matchComing" :key="index">
                            <div class="px-2">
                                <div class="pb-3"
                                    :style="{ 'border-bottom': index !== modalTeamDetail?.matchComing.length! - 1 ? '1px solid #101452' : 'none' }">
                                    <div class="pt-3 normal-text">{{ scoreBoardData[0].league_name_th }} : {{ item.dateStart
                                    }}
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center mt-3">
                                        <div class="text-center" style="width: 40%;">
                                            <div class="d-flex align-items-center align-items-center"
                                                style="max-width: 100%;">
                                                <div class="d-flex justify-content-end flex-grow-1">
                                                    <div class="text-end sm-text">
                                                        {{ item.teamANameTh }}
                                                    </div>
                                                </div>
                                                <!-- <img style="width: 30px; margin-left: 10px;" :src="item.teamAImg!" alt=""> -->
                                                <img style="width: 50px; margin-left: 10px; border-radius: 50%;"
                                                    :src="(item.teamAImg as string)" alt="">
                                            </div>
                                        </div>
                                        <div class="mx-2 text-center text-primary"
                                            style="width: 20%;font-size: 14px;font-weight: 500;">
                                            {{ item.timeStart }}
                                        </div>
                                        <div class="text-start" style="width: 40%;">
                                            <div class="d-flex align-items-center" style="max-width: 100%;">
                                                <!-- <img style="width: 30px; margin-right: 10px;" :src="item.teamBImg!" alt=""> -->
                                                <img style="width: 50px; margin-right: 10px; border-radius: 50%;"
                                                    :src="(item.teamBImg as string)" alt="">
                                                <div class="sm-text">
                                                    {{ item.teamBNameTh }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-center text-center text-decoration-underline"
                                        style="color: #2E3168; font-style: italic; font-size: 0.9rem; cursor: pointer;"
                                        @click="RouterPushMatchDetailPage(item.matchID)" data-bs-dismiss="modal"
                                        aria-label="Close">
                                        ดูรายละเอียดการแข่งขัน
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="statusModalShow === 'matchResult'"
                        style="color: white;background-color: #FEFEFE;padding-bottom: 0px;border-radius: 0px 0px 10px 10px;max-height: 300px; overflow: auto;">
                        <div v-for="(item, index) in modalTeamDetail?.matchEnd" :key="index">
                            <div class="text-white px-2">
                                <div class="pb-3"
                                    :style="{ 'border-bottom': index !== modalTeamDetail?.matchEnd.length! - 1 ? '1px solid #101452' : 'none' }">
                                    <div class="pt-3 normal-text">{{ scoreBoardData[0].league_name_th }} : {{ item.dateStart
                                    }}
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center mt-3">
                                        <div class="text-center" style="width: 45%;">
                                            <div class="d-flex align-items-center align-items-center"
                                                style="max-width: 100%;">
                                                <div class="d-flex justify-content-end flex-grow-1">
                                                    <div class="text-end sm-text">
                                                        {{ item.teamANameTh }}
                                                    </div>
                                                </div>
                                                <!-- <img style="width: 30px; margin-left: 10px;" src="item.teamAImg!" alt=""> -->
                                                <img style="width: 50px; margin-left: 10px; border-radius: 50%;"
                                                    :src="(item.teamAImg as string)" alt="">
                                            </div>
                                        </div>
                                        <div class="mx-4 text-center text-primary"
                                            style="width: 10%;font-size: 14px;font-weight: 500;">
                                            {{ item.score }}
                                        </div>
                                        <div class="text-start" style="width: 45%;">
                                            <div class="d-flex align-items-center" style="max-width: 100%;">
                                                <!-- <img style="width: 30px; margin-right: 10px;" :src="item.teamBImg!" alt=""> -->
                                                <img style="width: 50px; margin-right: 10px; border-radius: 50%;"
                                                    :src="(item.teamBImg as string)" alt="">
                                                <div class="sm-text">
                                                    {{ item.teamBNameTh }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-center text-center text-decoration-underline"
                                        style="color: #2E3168; font-style: italic; font-size: 0.9rem; cursor: pointer;"
                                        @click="RouterPushMatchDetailPage(item.matchID)" data-bs-dismiss="modal"
                                        aria-label="Close">
                                        ดูรายละเอียดการแข่งขัน
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="statusModalShow === 'listPlayer'"
                        style="color: white;background-color: #FEFEFE;padding-bottom: 0px;border-radius: 0px 0px 10px 10px;max-height: 300px; overflow: auto;">
                        <div v-for="(item, index) in modalTeamDetail?.players" :key="index">
                            <div class="text-white px-2">
                                <div class="pb-2 pt-2"
                                    :style="{ 'border-bottom': index !== modalTeamDetail?.players.length! - 1 ? '1px solid #101452' : 'none' }">
                                    <div class="d-flex align-items-center"
                                        @click="GotoPagePlayerPowerByPlayer(item.playerID)">
                                        <!-- <img style="width: 35px;" :src="item.playerImg" alt=""> -->
                                        <img style="width: 35px; height: 35px; border-radius: 50%;" :src="item.playerImg"
                                            alt="">
                                        <div data-bs-dismiss="modal" aria-label="Close" class="d-flex justify-content-between w-100">
                                            <div class="ms-2 sm-text" style="max-width: 150px;min-width: 150px;">{{
                                                item.playerNameTh }}</div>
                                            <div class="text-start sm-text">{{ item.position }}</div>
                                            <div class="me-3 text-end sm-text"
                                                style="max-width: 20px;min-width: 20px;">{{
                                                    item.playerNumber }}</div>
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
</template>

<style scoped>
.modal-header {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 0px;
}

.sm-text {
    font-size: 14px;
    font-weight: 400;
    color: #101452;
}

.normal-text {
    font-size: 16px;
    font-weight: 400;
    color: #101452;
}

.text-red {
    color: #BD0720;
    font-weight: 600;
}

.wrapper-teamA {
    display: flex;
}

table tbody td {
    height: 60px;
}

.modal {
    overflow: hidden;
    --bs-modal-bg: none;
}

.modal-footer {
    border-top: none;
}

.column-font-size {
    font-size: 14px;
    font-weight: 400;
}

.table-row-border {
    border-bottom: 2px solid #DEDFE4;
}

.wrapper-table {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 14px;
    overflow: hidden;
}

table {
    width: 100%;
    table-layout: fixed;
}

.modal-header {
    background-color: #DEDFE4;
    color: #101452;
}

.footer-text {
    visibility: hidden;
}

tfoot {
    height: 20px !important;
}
</style>
