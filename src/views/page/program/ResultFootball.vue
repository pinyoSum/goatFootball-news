<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import api from '@/api/axiosConfig'
import router from '@/router';
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()

const GetMatchResult = async () => {
    const res = await api.get('/api/match_result_ball')
    matchResult.value = res.data.data
}
const RouterPush = (id: number) => {
    const routePath = `/lead-football/${id}/today`;
    router.push(routePath)
}
const RouterPushDetails = (id: number) => {
    const routePath = `/match-football/${id}`
    router.push(routePath)
}

const matchResult = ref([] as any[])

onMounted( async() => {
    await GetMatchResult()
    defaulApp.HideLoading()
})
</script>

<template>
    <div>
        <template v-for="(item) of matchResult" :key="item">
            <div class="card mb-3">
                <div class="card-header d-flex justify-content-between">
                    <span style="font-size: 1.1rem; font-weight:500">{{ item.match_day[0]?.league_name_th }}</span>
                    <div class="wrapper-button-detail-all">
                        <button @click="RouterPush(item.match_day[0].league_id)" type="button"
                            class="btn-detail-all">ดูข้อมูลทั้งหมด</button>
                    </div>
                </div>
                <div class="card-body">
                    <template v-for="(match) of item.match_day" :key="match">
                        <div class="match">
                            <div class="text-start mb-2 mt-2">
                                <span class=" text-primary">จบการแข่งขัน</span>
                                <div class="d-flex justify-content-center mt-2">
                                    <div class="teamBattle" style="width: 100px;">
                                        <div class="d-flex flex-column align-items-center position-relative">
                                            <img style="width: 50px;border-radius: 50%; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);"
                                                :src="match.teama_img" alt="">
                                            <div class="text-center mt-2" style="font-size: 0.9rem; color: #101452;">{{
                                                match.teama_name_th }}</div>
                                        </div>
                                    </div>
                                    <div class="mx-2 mt-4 text-primary" style="font-weight: 600;"> {{
                                        match.scorea }} - {{ match.scoreb }}
                                    </div>
                                    <div class="teamBattle" style="width: 100px;">
                                        <div class="d-flex flex-column align-items-center position-relative">
                                            <img style="width: 50px;border-radius: 50%; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);"
                                                :src="match.teamb_img" alt="">
                                            <div class="text-center mt-2" style="font-size: 0.9rem; color: #101452;">{{
                                                match.teamb_name_th }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div @click="RouterPushDetails(match.match_id)"
                                class="mt-2 text-center text-decoration-underline"
                                style="color: #2E3168; font-style: italic; font-size: 0.9rem; cursor: pointer;">
                                ดูรายละเอียดการแข่งขัน</div>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.card {
    background-color: #fff !important;
    border: none;

    .card-header {
        background-color: #fff !important;
        color: #101452;
        border: 0;
        padding: 0.7rem 0.7rem 0 0.7rem;
    }

    .card-body {
        color: #fff;
        padding: 0 0.7rem 0.7rem 0.7rem;

        .match {
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #C6C6C6;
        }
    }
}

.wrapper-button-detail-all {
    width: auto;

    .btn-detail-all {
        border: none;
        border-radius: 5px;
        font-size: 14px;
        background-color: $primary-color ;
        color: #fff;
        white-space: nowrap;
    }
}
</style> 