<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '@/api/axiosConfig'
import { useRouter } from 'vue-router'
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const router = useRouter()

const GetLeagueAll = async () => {
    const res = await api.get('/api/list_fifa')
    leagueAll.value = res.data.data
}
const GetInfoTeamByLeague = async (leagueId: number) => {
    const res = await api.get(`/api/list_fifa_team/${leagueId}`)
    teamByLeague.value = res.data.data
}
const GoToPagePlayerByTeam = (id: number) => {
    router.push('/player-power/team/' + id)
    document.body.removeAttribute('class');
    document.body.removeAttribute('style');

    const backdropDiv = document.querySelector('.modal-backdrop.fade.show');
    if (backdropDiv) {
        backdropDiv.remove();
    }
}

const leagueAll = ref([] as any[])
const teamByLeague = ref([] as any[])

onMounted( async() => {
    await GetLeagueAll()
    defaulApp.HideLoading()
})

</script>
<template>
    <div class="pb-2" style="background-color: #DEDFE4;border-radius: 10px;">
        <div class="p-2" style="color: #101452;">
            รายการลีค
        </div>
        <div>
            <div v-for="(item, index) in leagueAll" :key="index">
                <div class="d-flex align-items-center mb-1 bd-highlight" style="background-color: #fff;  height: 75px;">
                    <div class="d-flex justify-content-between align-items-center w-100 bd-highlight"
                        style="align-items: center;">
                        <div class="d-flex" style="align-items: center;">
                            <img style="width: 60px; border-radius: 50%;object-fit: co;" :src="item.league_image" alt="">
                            <div class="ms-3">
                                {{ item.league_name_th }}
                            </div>
                        </div>
                        <button type="button" @click="GetInfoTeamByLeague(item.league_id as number)"
                            class="btn-details me-2" data-bs-toggle="modal"
                            data-bs-target="#modalTeamByLeague">ดูข้อมูล</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalTeamByLeague" tabindex="-1" aria-labelledby="modalTeamByLeagueLabel">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTeamByLeagueLabel">{{ teamByLeague.length > 0 ? teamByLeague[0].league_name_th : '' }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body ">
                    <div id="info-league">
                        <div class="header">
                            <div class="team">TEAM</div>
                            <div class="att">ATT</div>
                            <div class="mid">MID</div>
                            <div class="def">DEF</div>
                            <div class="ovr">OVR</div>
                            <div class="action"></div>
                        </div>
                        <div class="warp-row-data">
                            <template v-for="item in teamByLeague" :key="item">
                                <div class="row-data">
                                    <div class="team">
                                        <div class=" d-flex align-items-center">
                                            <div class="icon-team"> <img :src="item.team_img" alt=""></div>
                                            <div class="ms-2 team-name">{{ item.team_name_th }}</div>
                                        </div>
                                    </div>
                                    <div class="att">{{ item.att }}</div>
                                    <div class="mid">{{ item.mid }}</div>
                                    <div class="def">{{ item.def }}</div>
                                    <div class="ovr">{{ item.ovr }}</div>
                                    <div class="action"><button @click="GoToPagePlayerByTeam(item.team_id)"
                                            class="btn-show-detail-team">ดูข้อมูล</button></div>
                                </div>
                            </template>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.modal-content {
    background-color: rgba(217, 217, 217, 1);

    .modal-header {
        background-color: #BD0720;
        color: white;
        padding-top: 8px;
        padding-bottom: 8px;
    }

    .modal-body {
        padding: 2px;
        padding-bottom: 7px;
        background-color: #FEFEFE;
    }
}

#info-league {

    .header,
    .row-data {
        display: flex;
    }

    .warp-row-data {
        max-height: 70vh;
        overflow-y: auto;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .team,
    .att,
    .mid,
    .def,
    .ovr,
    .action {
        display: inline-block;
    }

    .header {
        font-weight: bold;
        font-size: 0.95rem;
        background-color: #FEFEFE;
        .team {
            color: rgba(189, 7, 32, 1);
            padding-left: 5px;
        }
    }

    .row-data {
        font-size: 0.85rem;
        background-color: #DEDFE4;
        color: #101452;
        height: 50px;
        border-bottom: 0.5px solid #101452;
        align-items: center;

        .team {
            padding-left: 5px;

            .icon-team {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                overflow: hidden;
                position: relative;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }

        .team-name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 80px;
        }
    }

    .att,
    .mid,
    .def,
    .ovr {
        width: 40px;
        text-align: center;
    }

    .action {
        width: 80px;
        text-align: center;
    }

    .team {
        flex-grow: 1;
        text-align: left;
    }
}

.table-scrollable {
    height: 300px;
    /* หรือความสูงที่คุณต้องการ */
    overflow-y: auto;
}

.btn-show-detail-team {
    border: none;
    border-radius: 5px;
    font-size: 14px;
    color: #fff;
    background-color: $primary-color;
}

.btn-details {
    border: none;
    border-radius: 5px;
    font-size: 16px;
    color: white;
    background-color: $primary-color;
    padding: 3px 12px;
}

@media (min-width: 992px) {
    #info-league .row-data .team-name[data-v-f47d0013] {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 400px !important;
    }
}
</style>