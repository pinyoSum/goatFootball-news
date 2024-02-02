<script setup lang="ts">
import { FetchMatchAllFootballToDay } from '@/services/api/football';
import { onMounted, ref, onUnmounted, type Ref } from 'vue';
import type { IMatchToDayAllLead } from '@/model/IMatchToDay';
import router from '@/router';
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()

const dataFootballToday = ref<IMatchToDayAllLead[] | null>([]);
const intervalRef: Ref<number | undefined> = ref(undefined);


const RouterPush = (id: number) => {
    const routePath = `/lead-football/${id}/today`;
    router.push(routePath)
}
const RouterPushDetails = async (id: number, status: string) => {
    let routePath = ''
    if (status == '-1') {
         routePath = `/match-football/${id}`
    }else{
        routePath = `/match-football/${id}/analysis`
    }
    router.push(routePath)
}
const GetMatchAll = async () => {
    try {
        dataFootballToday.value = await FetchMatchAllFootballToDay();
    } catch (error) {
        console.error('Error fetch data:', error)
    }
}
const ReturnTime = (status: string, timeStart: string, timeGamet: string) => {
    if (status == '0') {
        return timeStart
    }
    if (status == '1' || status == '2' || status == '3' || status == '4' || status == '5' || status == '') {
        return timeGamet
    }
    return ''
}
const ReturnScore = (status: string, score: string,) => {
    if (status == '1' || status == '2' || status == '3' || status == '4' || status == '5' || status == '' || status == '-1') {
        return score
    }
    return 'VS'
}
onMounted(async () => {
    await GetMatchAll()
    intervalRef.value = setInterval(GetMatchAll, 1000 * 60);
    defaulApp.HideLoading()
})
onUnmounted(() => {
    clearInterval(intervalRef.value);
})
</script>
<template>
    <div class="text-center" style="background-color: #DEDFE4; border-radius: 14px;">
        <div class="p-3 mb-3" style="background-color: #fff; border-radius: 10px;"
            v-for="(item, index) in dataFootballToday" :key="index">
            <div class="d-flex pb-3"
                style="border-bottom: 2px solid #101452; justify-content: center; align-items: center;">
                <div style="color: #2E3168;" class="w-100 text-start ">
                    {{ item.leadNameTh }}
                </div>
                <div class="wrapper-button-detail-all">
                    <button type="button" class="btn-detail-all  nowrap-btn"
                        @click="RouterPush(item.leadID)">ดูข้อมูลทั้งหมด</button>
                </div>
            </div>
            <div v-for="(sub, index) in item.matchDay" :key="index">
                <div class="text-start mb-2 mt-2 text-primary">
                    {{ sub.matchStatusName }} | {{ ReturnTime(sub.matchStatusCode as string, sub.timeStart as string,
                        sub.timeGame as string) }}
                </div>
                <div class="pb-3 mt-4"
                    :style="{ 'border-bottom': index !== item.matchDay.length - 1 ? '1px solid #101452' : 'none' }">
                    <div class="d-flex justify-content-center">
                        <div class="teamBattle">
                            <div class="d-flex flex-column align-items-center position-relative">
                                <span v-if="sub.teamBetRate === 'a' && sub.betRate != '0'" class="price-per left nowrap-btn"
                                    >{{ sub.betRate }}</span>
                                <img style=" box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);width:50px;border-radius: 50%;"
                                    :src="sub.teamAImg!" alt="">
                                <div class=" mt-2" style="font-size: 0.9rem; color: #2E3168;">{{ sub.teamANameTh }}</div>
                            </div>
                        </div>
                        <div class="mx-2 mt-4 text-primary">{{ ReturnScore(sub.matchStatusCode as string,
                            sub.score as string) }}</div>
                        <div class="teamBattle">
                            <div class="d-flex flex-column align-items-center position-relative">
                                <span v-if="sub.teamBetRate === 'b' && sub.betRate != '0'" class="price-per left nowrap-btn"
                                    >0.5</span>
                                <img style=" box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);width: 50px;border-radius: 50%;"
                                    :src="sub.teamBImg!" alt="">
                                <div class=" mt-2" style="font-size: 0.9rem;  color: #2E3168;">{{ sub.teamBNameTh }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="fst-italic" style="text-align: center; color: #C6C6C6;font-size: 0.9rem;">{{
                        sub.predictionSubText }}</div>
                    <div class="text-decoration-underline"
                        style="color: #2E3168; font-style: italic; font-size: 0.9rem; cursor: pointer;"
                        @click="RouterPushDetails(sub.matchID, sub.matchStatusCode as string)">ดูรายละเอียดการแข่งขัน</div>
                    <div class="text-start" style="color: #ffc107;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.disabled {
    pointer-events: none;
    opacity: 0.6;
}

.text-white {
    color: white;
}

.wrapper-button-detail-all {
    width: auto;
}

.btn-detail-all {
    border: none;
    border-radius: 5px;
    font-size: 14px;
    background-color: $primary-color ;
    color: #fff;
    white-space: nowrap;
}


.teamBattle {
    width: 100px;
}

.price-per {
    position: absolute;
    padding-left: 6px;
    padding-right: 6px;
    color: white;
    border-radius: 6px;
    top: -12px;
    right: 10px;
    background-color: $primary-color;
    font-size: 0.9rem;
}</style>
