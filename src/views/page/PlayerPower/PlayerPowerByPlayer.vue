<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import api from '@/api/axiosConfig'
import { useRoute, useRouter } from 'vue-router'
import RadarChartComponent from '@/components/RadarChartComponent.vue'
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const route = useRoute()
const router = useRouter()

const GetPlayerInfo = async () => {
    const res = await api.get(`/api/fifa_player_full/${route.params.playerId}`)
    playerInfo.value = res.data.data
    if (res.data.data.player_avg.ballskill != null) {
        dataRadar.value.push(res.data.data.player_avg.ballskill)
    } else {
        return
    }
    if (res.data.data.player_avg.defence != null) {
        dataRadar.value.push(res.data.data.player_avg.defence)
    } else {
        return
    }
    if (res.data.data.player_avg.mental != null) {
        dataRadar.value.push(res.data.data.player_avg.mental)
    } else {
        return
    }
    if ( res.data.data.player_avg.goalkeeper != null) {
        dataRadar.value.push(res.data.data.player_avg.goalkeeper)
    } else {
        return
    }
    if (res.data.data.player_avg.physical != null) {
        dataRadar.value.push(res.data.data.player_avg.physical)
    } else {
        return
    }
    if (res.data.data.player_avg.shooting != null) {
        dataRadar.value.push(res.data.data.player_avg.shooting)
    } else {
        return
    }
    if (res.data.data.player_avg.passing != null) {
        dataRadar.value.push(res.data.data.player_avg.passing)
    } else {
        return
    }
}
const GotoPagePlayerPower = () => {
    router.push(`/football/player-power`)
}
const GotoPagePlayerTeam = () => {
    router.push(`/player-power/team/${route.params.teamId}`)
}
const GetTeamInfo = async () => {
    const res = await api.get(`/api/team_details/${route.params.teamId}`)
    teamName.value = res.data.data.team
}
const CalculateAge = (birthdate: string): number => {
    const birthDateParts = birthdate.split('-').map(part => parseInt(part, 10));
    const birthDateObject = new Date(birthDateParts[0], birthDateParts[1] - 1, birthDateParts[2]);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDateObject.getFullYear();

    if (currentDate.getMonth() < birthDateObject.getMonth() ||
        (currentDate.getMonth() === birthDateObject.getMonth() && currentDate.getDate() < birthDateObject.getDate())) {
        age--;
    }

    return age;
}
const GetColorFifaPlayerValue = (value: any ): string=>{
    if (value <= 60) {
    return "#d6573b";
} else if (value <= 70) {
    return  "#f6bb43";
} else if (value <= 89) {
    return  "#8dc153";
} else if (value >= 90) {
    return  "#239454";
}
return "#239454"
}
// <div :style="{ 'font-size': fontSize + 'px' }"></div>

const playerInfo = ref({} as any)
const dataRadar = ref([] as number[])
const teamName = ref({} as any)

onMounted(async () => {
    await GetPlayerInfo()
    await GetTeamInfo()
    defaulApp.HideLoading()
})
</script>

<template>
    <div class="container-player-details">
        <div class="header-title"><a @click="GotoPagePlayerPower">ค่าพลังนักเตะ</a> > <a
                @click="GotoPagePlayerTeam">รายชื่อนักเตะ {{ teamName[0]?.team_name_th }}</a></div>
        <template v-if="playerInfo != null && playerInfo != undefined">
            <div v-if="playerInfo.players" class="player-card mb-3">
                <div class="header">
                    <div class="header-left">
                        <div class="player-icon">
                            <img :src="playerInfo.players[0].player_image" alt="">
                        </div>
                        <div class="info">
                            <div class="player-name">{{ playerInfo.players[0].player_name_th }}</div>
                            <div class="sub-title">สัญญาถึง : {{ playerInfo.players[0].player_date_sign }}</div>
                        </div>
                    </div>
                    <div class="header-right team-icon">
                        <img :src="teamName[0]?.team_img" alt="">
                    </div>
                </div>
                <div class="player-info">
                    <div>สัญชาติ : {{ playerInfo.players[0].player_country_th }}</div>
                    <div>วันเกิด : {{ playerInfo.players[0].player_born }}</div>
                    <div>อายุ : {{ CalculateAge(playerInfo.players[0].player_born) }} ปี</div>
                    <div>ส่วนสูง : {{ playerInfo.players[0].player_height }} ซม.</div>
                    <div>น้ำหนัก : {{ playerInfo.players[0].player_weight }} กิโลกรัม</div>
                    <div>ตำแหน่ง : {{ playerInfo.players[0].player_position_th }}</div>
                    <div>หมายเลขเสื้อ : {{ playerInfo.players[0].player_number }}</div>
                    <div class="text-primary">มูลค่าผู้เล่น : {{ playerInfo.players[0].player_value }}M €
                    </div>
                </div>
            </div>
            <div class="player-avg mb-3" v-if="dataRadar.length == 7">
                <div class="header">ภาพรวมแอตทริบิวต์</div>
                <div class="chart-avg">
                    <RadarChartComponent :data-radar="dataRadar" />
                </div>
            </div>
            <div class="player-fifa mb-3" v-if="playerInfo.player_fifa && playerInfo.player_fifa.length > 0">
                <!-- Ball Skills -->
                <div class="wrapper-accordion mb-3">
                    <div class="accordion" id="accordionExample1">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThreeResult">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    style="font-size: 1.1rem;" data-bs-target="#collapsTopScore1" aria-expanded="true"
                                    aria-controls="collapsTopScore1">
                                    Ball Skills
                                </button>
                            </h2>
                            <div id="collapsTopScore1" class="accordion-collapse collapse show"
                                aria-labelledby="headingThree" data-bs-parent="#accordionExample1Result">
                                <div class="accordion-body" style="background-color: #FEFEFE;">
                                    <template v-for="item in playerInfo.player_fifa" :key="item">
                                        <div v-if="item.fifa_catalog_id == 1" class=" d-flex justify-content-between mb-2">
                                            <div style="font-size: 0.9rem; color: #101452;">{{ item.fifa_poperties_name }}
                                            </div>
                                            <div class="fifa-player-value" :style="{ 'background-color': GetColorFifaPlayerValue(item.fifa_player_value) }" style="color: #101452;">{{ item.fifa_player_value }}
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Defence -->
                <div class="wrapper-accordion mb-3">
                    <div class="accordion" id="accordionExample2">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThreeResult">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    style="font-size: 1.1rem;" data-bs-target="#collapsTopScore2" aria-expanded="true"
                                    aria-controls="collapsTopScore2">
                                    Defence
                                </button>
                            </h2>
                            <div id="collapsTopScore2" class="accordion-collapse collapse show"
                                aria-labelledby="headingThree" data-bs-parent="#accordionExample2Result">
                                <div class="accordion-body" style="background-color: #FEFEFE;">
                                    <template v-for="item in playerInfo.player_fifa" :key="item">
                                        <div v-if="item.fifa_catalog_id == 2" class=" d-flex justify-content-between mb-2">
                                            <div style="font-size: 0.9rem; color: #101452;">{{ item.fifa_poperties_name }}
                                            </div>
                                            <div class="fifa-player-value" :style="{ 'background-color': GetColorFifaPlayerValue(item.fifa_player_value) }" style="color: #101452;">{{ item.fifa_player_value }}
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Mental -->
                <div class="wrapper-accordion mb-3">
                    <div class="accordion" id="accordionExample3">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThreeResult">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    style="font-size: 1.1rem;" data-bs-target="#collapsTopScore3" aria-expanded="true"
                                    aria-controls="collapsTopScore3">
                                    Mental
                                </button>
                            </h2>
                            <div id="collapsTopScore3" class="accordion-collapse collapse show"
                                aria-labelledby="headingThree" data-bs-parent="#accordionExample3Result">
                                <div class="accordion-body" style="background-color: #FEFEFE;">
                                    <template v-for="item in playerInfo.player_fifa" :key="item">
                                        <div v-if="item.fifa_catalog_id == 3" class=" d-flex justify-content-between mb-2">
                                            <div style="font-size: 0.9rem; color: #101452;">{{ item.fifa_poperties_name }}
                                            </div>
                                            <div class="fifa-player-value" :style="{ 'background-color': GetColorFifaPlayerValue(item.fifa_player_value) }" style="color: #101452;">{{ item.fifa_player_value }}
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Passing -->
                <div class="wrapper-accordion mb-3">
                    <div class="accordion" id="accordionExample4">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThreeResult">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    style="font-size: 1.1rem;" data-bs-target="#collapsTopScore4" aria-expanded="true"
                                    aria-controls="collapsTopScore4">
                                    Passing
                                </button>
                            </h2>
                            <div id="collapsTopScore4" class="accordion-collapse collapse show"
                                aria-labelledby="headingThree" data-bs-parent="#accordionExample4Result">
                                <div class="accordion-body" style="background-color: #FEFEFE;">
                                    <template v-for="item in playerInfo.player_fifa" :key="item">
                                        <div v-if="item.fifa_catalog_id == 4" class=" d-flex justify-content-between mb-2">
                                            <div style="font-size: 0.9rem; color: #101452;">{{ item.fifa_poperties_name }}
                                            </div>
                                            <div class="fifa-player-value" :style="{ 'background-color': GetColorFifaPlayerValue(item.fifa_player_value) }" style="color: #101452;">{{ item.fifa_player_value }}
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Physical -->
                <div class="wrapper-accordion mb-3">
                    <div class="accordion" id="accordionExample5">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThreeResult">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    style="font-size: 1.1rem;" data-bs-target="#collapsTopScore5" aria-expanded="true"
                                    aria-controls="collapsTopScore5">
                                    Physical
                                </button>
                            </h2>
                            <div id="collapsTopScore5" class="accordion-collapse collapse show"
                                aria-labelledby="headingThree" data-bs-parent="#accordionExample5Result">
                                <div class="accordion-body" style="background-color: #FEFEFE;">
                                    <template v-for="item in playerInfo.player_fifa" :key="item">
                                        <div v-if="item.fifa_catalog_id == 5" class=" d-flex justify-content-between mb-2">
                                            <div style="font-size: 0.9rem; color: #101452;">{{ item.fifa_poperties_name }}
                                            </div>
                                            <div class="fifa-player-value" :style="{ 'background-color': GetColorFifaPlayerValue(item.fifa_player_value) }" style="color: #101452;">{{ item.fifa_player_value }}
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Shooting -->
                <div class="wrapper-accordion mb-3">
                    <div class="accordion" id="accordionExample6">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThreeResult">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    style="font-size: 1.1rem;" data-bs-target="#collapsTopScore6" aria-expanded="true"
                                    aria-controls="collapsTopScore6">
                                    Shooting
                                </button>
                            </h2>
                            <div id="collapsTopScore6" class="accordion-collapse collapse show"
                                aria-labelledby="headingThree" data-bs-parent="#accordionExample6Result">
                                <div class="accordion-body" style="background-color: #FEFEFE;">
                                    <template v-for="item in playerInfo.player_fifa" :key="item">
                                        <div v-if="item.fifa_catalog_id == 6" class=" d-flex justify-content-between mb-2">
                                            <div style="font-size: 0.9rem; color: #101452;">{{ item.fifa_poperties_name }}
                                            </div>
                                            <div class="fifa-player-value" :style="{ 'background-color': GetColorFifaPlayerValue(item.fifa_player_value) }" style="color: #101452;">{{ item.fifa_player_value }}
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Goalkeeper -->
                <div class="wrapper-accordion mb-3">
                    <div class="accordion" id="accordionExample7">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThreeResult">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    style="font-size: 1.1rem;" data-bs-target="#collapsTopScore7" aria-expanded="true"
                                    aria-controls="collapsTopScore7">
                                    Goalkeeper
                                </button>
                            </h2>
                            <div id="collapsTopScore7" class="accordion-collapse collapse show"
                                aria-labelledby="headingThree" data-bs-parent="#accordionExample7Result">
                                <div class="accordion-body" style="background-color: #FEFEFE;">
                                    <template v-for="item in playerInfo.player_fifa" :key="item">
                                        <div v-if="item.fifa_catalog_id == 7" class=" d-flex justify-content-between mb-2">
                                            <div style="font-size: 0.9rem; color: #101452;">{{ item.fifa_poperties_name }}
                                            </div>
                                            <div class="fifa-player-value" :style="{ 'background-color': GetColorFifaPlayerValue(item.fifa_player_value) }" style="color: #101452;">{{ item.fifa_player_value }}
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

    </div>
</template>

<style scoped lang="scss">
.hospital-icon-style {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
.container-player-details {
    .header-title {
        margin-bottom: 10px;
        color: #101452;
        font-size: 1.05rem;

        a {
            cursor: pointer;
        }
    }

    .player-card {
        border-radius: 10px;
        background-color: #DEDFE4;
        color: #101452;
        padding: 8px;

        .header {
            display: flex;
            justify-content: space-between;

            .header-left {
                display: flex;
                align-items: center;

                .player-icon img {
                    height: 50px;
                    width: 50px;
                    border-radius: 50%;
                    margin-right: 10px;
                }

                .info {
                    display: flex;
                    flex-direction: column;
                    margin-left: 5px;

                    .player-name {
                        font-size: 1.1rem;
                        line-height: 20px;
                    }

                    .sub-title {
                        font-size: 0.85rem;
                        color: #101452 !important;
                    }
                }
            }

            .header-right img {
                height: 50px;
                width: 50px;
                border-radius: 50%;
                margin-right: 0px;
            }
        }

        .player-info>div {
            font-size: 0.95rem;
            margin-top: 5px;
        }
    }

    .player-avg {
        .header {
            color: #101452;
        }

        .chart-avg {
            border-radius: 10px;
            background-color: #DEDFE4;
        }
    }
}

.fifa-player-value {
    background-color: rgba(116, 174, 50, 1);
    border-radius: 5px;
    min-width: 25px;
    min-height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.85rem;
}

.accordion-button {
    background-color: #DEDFE4;
    color: #101452;
}
.accordion-item{
    border: none;
    padding: 5px;
}

.accordion {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    --bs-accordion-active-bg: none;
    --bs-accordion-btn-focus-box-shadow: none;
    --bs-accordion-border-color: #101452;
    --bs-accordion-bg: #DEDFE4;
    --bs-accordion-btn-icon: url('../../../assets/icon/angle-down-solid.svg');
    --bs-accordion-btn-active-icon: url('../../../assets/icon/angle-down-solid.svg');
}



.wrapper-body-accordion>div {
    margin: 5px 0;
}

.wrapper-body-accordion .d-flex {
    justify-content: center;
}

.wrapper-body-accordion .d-flex>div {
    margin: 5px;
}

.wrapper-body-accordion img {
    max-width: 100%;
    height: auto;
}

.wrapper-team-info {
    flex: 1;
    /* ทำให้กล่อง .wrapper-team-info มีขนาดเท่ากัน */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-width: 100px;
}</style>