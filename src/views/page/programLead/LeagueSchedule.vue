<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { FetchLeadInfoMonthly } from '@/services/api/football';
import type { ILeadInfoMonthly } from '../../../model/IMatchComingLeague'
import { useRoute, useRouter } from 'vue-router';
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const route = useRoute() as any
const router = useRouter() as any
const dataFootballMonthly = ref<ILeadInfoMonthly | null>();

const RouterPushDetails = async (id: number) => {
    const routePath = `/match-football/${id}`
    router.push(routePath)
}
const RouterPushMatchDetailPage = (id: number) => {
    const routePath = `/match-football/${id}`
    router.push(routePath)
}
onMounted(async () => {
    try {
        dataFootballMonthly.value = await FetchLeadInfoMonthly(route.params.leadFootball);
    } catch (error) {
        console.error('Error fetch data:', error)
    }
    defaulApp.HideLoading()
})
</script>

<template>
    <div class="wrapper-accordion mb-4">
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree"
                        aria-expanded="true" aria-controls="collapseThree">
                        <div class="d-flex" style="font-size: 18px;">
                            ตารางแข่งประจำเดือน
                            <div class="ms-2" style="color: #BD0720;">{{ dataFootballMonthly?.month }}</div>
                        </div>
                    </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse show" aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample">
                    <div v-for="(item, index) in dataFootballMonthly?.matchComing" :key="index">
                        <div class="accordion-body text-white m-1" style="background-color: #fff;">
                            <div style="color: #2E3168;" class="wrapper-body-accordion text-center">
                                <div>{{ item.dateStart }}</div>
                                <div class="d-flex justify-content-center">
                                    <div class="teamBattle">
                                        <div class="d-flex flex-column align-items-center position-relative">
                                            <img style="width: 50px;border-radius: 50%; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);"
                                                :src="item.teamAImg!" alt="">
                                            <div class=" text-center mt-2" style="font-size: 0.9rem; color: #2E3168;">{{
                                                item.teamANameTh }}</div>
                                        </div>
                                    </div>
                                    <div class="mx-2 mt-4 text-primary">{{ item.timeStart }}</div>
                                    <div class="teamBattle">
                                        <div class="d-flex flex-column align-items-center position-relative">
                                            <img style="width: 50px;border-radius: 50%; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);"
                                                :src="item.teamBImg!" alt="">
                                            <div class=" text-center mt-2" style="font-size: 0.9rem; color: #2E3168;">{{
                                                item.teamBNameTh }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div @click="RouterPushDetails(item.matchID)"
                                    class="mt-2 text-center text-decoration-underline"
                                    style="color: #2E3168; font-style: italic; font-size: 0.9rem;cursor: pointer;">
                                    ดูรายละเอียดการแข่งขัน</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ผลการแข่งขัน -->
    <div class="wrapper-accordion mb-4">
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingThreeResult">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        style="font-size: 18px;" data-bs-target="#collapseResult" aria-expanded="true"
                        aria-controls="collapseResult">
                        ผลการแข่งขัน
                    </button>
                </h2>
                <div id="collapseResult" class="accordion-collapse collapse show" aria-labelledby="headingThree"
                    data-bs-parent="#accordionExampleResult">
                    <div v-for="(item, index) in dataFootballMonthly?.matchEnd" :key="index">
                        <div class="accordion-body  m-1" style="background-color: #fff;">
                            <div style="color: #2E3168;" class="wrapper-body-accordion text-center">
                                <div>{{ item.dateStart }}</div>
                                <!-- ---------------------- -->
                                <div class="d-flex justify-content-center">
                                    <div class="teamBattle">
                                        <div class="d-flex flex-column align-items-center position-relative">
                                            <img style="width: 50px;border-radius: 50%; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);"
                                                :src="item.teamAImg!" alt="">
                                            <div style="font-size: 0.9rem;color: #2E3168;" class=" mt-2">{{ item.teamANameTh
                                            }}</div>
                                        </div>
                                    </div>
                                    <div class="mx-2 mt-4 text-primary" style="font-size: 18px;font-weight: 600;"> {{
                                        item.score }}</div>
                                    <div class="teamBattle">
                                        <div class="d-flex flex-column align-items-center position-relative">
                                            <img style="width: 50px;border-radius: 50%; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);"
                                                :src="item.teamBImg!" alt="">
                                            <div style="font-size: 0.9rem;color: #2E3168;" class=" mt-2">{{ item.teamBNameTh
                                            }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center text-center text-decoration-underline"
                                    style="color: #2E3168; font-style: italic; font-size: 0.9rem; cursor: pointer;"
                                    @click="RouterPushMatchDetailPage(item.matchID)">
                                    ดูรายละเอียดการแข่งขัน
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ดาวซัลโวเดนมาร์ก -->
    <div v-if="dataFootballMonthly?.topScorer && dataFootballMonthly?.topScorer.length > 0" class="wrapper-accordion">
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingThreeResult">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        style="font-size: 18px;" data-bs-target="#collapsTopScore" aria-expanded="true"
                        aria-controls="collapsTopScore">
                        ดาวซัลโว{{ dataFootballMonthly.leadNameTh }}
                    </button>
                </h2>
                <div id="collapsTopScore" class="accordion-collapse collapse show" aria-labelledby="headingThree"
                    data-bs-parent="#accordionExampleResult">
                    <div v-for="(item, index) in dataFootballMonthly?.topScorer" :key="index">
                        <div class="accordion-body text-white m-1" style="background-color: #fff;">
                            <div style="display: flex; align-items: center;">
                                <div>
                                    <img style="width: 30px; height: 30px; object-fit: cover; border-radius: 50%; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);"
                                        :src="item.playerImg" alt="">
                                </div>
                                <div style="color: #101452;" class="d-block ms-3 w-100">
                                    <div>
                                        {{ item.playerNameTh }}
                                    </div>
                                    <div>
                                        {{ item.teamName }}
                                    </div>
                                </div>
                                <div style="margin-left: auto;color: #101452;">
                                    {{ item.goalsScored }}
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
.teamBattle {
    width: 100px;
}

.accordion-button {
    background-color: #DEDFE4;
    color: #101452;
}

.accordion-item {
    border-color: #DEDFE4 !important;
}

.accordion {
    --bs-accordion-active-bg: none;
    --bs-accordion-btn-focus-box-shadow: none;
    --bs-accordion-border-color: rgba(255, 255, 255, 0);
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


