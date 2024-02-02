<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import api from '@/api/axiosConfig'
import { useRoute, useRouter } from 'vue-router'
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const route = useRoute()
const router = useRouter()

const GetMatchResult = async () => {
    const res = await api.get(`/api/list_players_team/${route.params.id}`)
    players.value = res.data.data.players
}
const GotoPagePlayerPower = ()=>{
    router.push(`/football/player-power`)
}
const GetTeamInfo = async ()=>{
    const res = await api.get(`/api/team_details/${route.params.id}`)
    teamName.value = res.data.data.team[0].team_name_th
}
const GotoPagePlayerPowerByPlayer = (playerId: number)=>{
    router.push(`/player-power/team/${route.params.id}/player/${playerId}`)
}

const players = ref([] as any[])
const teamName = ref('')

onMounted( async() => {
    await GetMatchResult()
    await GetTeamInfo()
    defaulApp.HideLoading()
})
</script>

<template>
    <div class="container-player-list">
        <div class="header-title"><a @click="GotoPagePlayerPower">ค่าพลังนักเตะ</a> > รายชื่อนักเตะ {{ teamName }}</div>
        <div class="player-list">
            <div class="header">
                <div class="title">รายชื่อนักเตะ</div>
            </div>
            <div class="player-card" v-for="player in players" :key="player.id">
                <div class="player-info">
                    <div class="player-icon">
                        <img style="width: 50px;border-radius: 50%;" :src="player.player_image" alt="">
                    </div>
                    <div class="player-name">{{ player.player_name_th }}</div>
                </div>
                <button @click="GotoPagePlayerPowerByPlayer(player.player_id)" class="btn-show-detail-team">ดูข้อมูล</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container-player-list {
    .header-title {
        margin-bottom: 10px;
        color: #101452;
        font-size: 1.05rem;
        a{
            cursor: pointer;
        }
    }

    .player-list {
        border-radius: 10px 10px 0 0;
        background-color: #BD0720;
        padding-bottom: 3px;
        color: #fff;
        .header {
            color: #fff;
            height: 50px;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            padding: 0 5px;
        }

        .player-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 2px;
            background-color: #FEFEFE;
            height: 65px;
            padding: 0px 10px;

            .player-info {
                display: flex;
                align-items: center;

                .player-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
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

                .player-name {
                    color: #101452;
                }
            }
        }
    }
}

.btn-show-detail-team {
    border: none;
    border-radius: 5px;
    font-size: 14px;
    color: #FEFEFE;
    background-color: $primary-color;
}
</style>