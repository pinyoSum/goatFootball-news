<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue';
import { useDefaul } from "@/stores/useDefault"


const defaulApp = useDefaul()

onMounted(async () => {
    defaulApp.toggleMenu = false
    defaulApp.pageFootballTips = true
    defaulApp.HideLoading()
    await nextTick()
    const element = document.getElementById(defaulApp.$state.infoPageTips.searchTipsById);
    if (element) {
        setTimeout(() => {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 1000)
    }
})
onUnmounted(() => {
    defaulApp.pageFootballTips = false
    defaulApp.HideLoading()
})
</script>
<template>
    <div class="master-prediction">
        <div>
            <div class="main-title">
                ทีเด็ดการเดิมพันฟุตบอลฟรี
            </div>
            <div class="sub-title">
                เข้ามาดูเคล็ดลับการเดิมพันฟุตบอลฟรีที่ดีที่สุด เคล็ดลับฟุตบอลของเราจัดทำโดยผู้เชี่ยวชาญเฉพาะด้าน
                เพื่อให้คุณทราบข้อมูลเชิงลึกเกี่ยวกับแมตช์ใหญ่ทั้งหมด ดูเคล็ดลับที่เราเลือกไว้ด้านล่าง และขอให้โชคดี!
            </div>
        </div>
        <div class="wrapper-master mt-4" v-for="(item, index) in defaulApp.$state.infoPageTips.data" :key="index"
            style="overflow: hidden; text-align: left;border: 1px solid rgba(128, 128, 128, 0.192);padding-bottom: 17px;">
            <div :id="item.zeanId">
                <div class="master-predict d-flex justify-content-between" style="height: 54px;">
                    {{ item.zeanNameTh }}
                </div>
                <div class="wrapper-match-detail" v-for="(matchDay, index) in item.matchDay" :key="index">
                    <button class="btn-wrapper-accordion w-100" type="button" data-bs-toggle="collapse"
                        :data-bs-target="`#panelsStayOpen-collapseThree${matchDay.idAccordion}${index}`"
                        :aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        <div class="accordion" id="accordionPanelsStayOpenExample">
                            <div class="d-flex mb-2">
                                <div class="time-match pe-4">
                                    <div class="match-time-start">{{ matchDay.timeStart }}</div>
                                    <div class="d-flex mt-2">
                                        <img class="m-auto" :src=matchDay.teamaImg style="width: 20px; height: 20px;">
                                        <img v-if="matchDay.tipType != 1 && matchDay.tipsImgId != 1"
                                            :src=matchDay.teambImg style="width: 20px; height: 20px; margin-left: 5px;">
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between w-100">
                                    <div class="ms-4" style="text-align: left;">
                                        <div class="result-match">{{ matchDay.matchZeanTitle }}</div>
                                        <div style="text-align: left;" class="location-match">{{ matchDay.matchZeanSubTitle
                                        }}</div>
                                    </div>
                                    <div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                                <button class="accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse"
                                                    :data-bs-target="`#panelsStayOpen-collapseThree${matchDay.idAccordion}${index}`"
                                                    :aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                                </button>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div :id="`panelsStayOpen-collapseThree${matchDay.idAccordion}${index}`"
                                class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree"
                                :class="`panelsStayOpen-collapseThree${matchDay.idAccordion}${index}`">
                                <div class="card card-body">
                                    <label class="accordion-title">
                                        ทรรศนะ
                                    </label>
                                    <div class="accordion-text">
                                        <div class="accordion-body">
                                            <!-- {{ matchDay.predict }} -->
                                            <div v-html="matchDay.predict">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.master-predict {
    background-color: $primary-color;
}
</style>
