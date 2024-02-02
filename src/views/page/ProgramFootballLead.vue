<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watchEffect } from 'vue'
import { FetchLeadInfoMonthly } from '@/api/football'

const route = useRoute()
const router = useRouter()

const currentPath = ref<string>("");
const fetchLeadInfoMonthly = ref<any>()
const menuActive = ref({
    menu1: false,
    menu2: false,

})

const NavigateToPath = (path: string) => {
    router.push(path)
}
// const IsCurrentPath = (path: string): boolean => {
//     // return  currentPath.value === path || currentPath.value.startsWith(path + '/');
//     return true
// };

onMounted(async () => {
    fetchLeadInfoMonthly.value = await FetchLeadInfoMonthly(Number(route.params.leadFootball))
})
watchEffect(() => {
    const arr = router.currentRoute.value.path.split('/')
    if (arr[3] == 'today') {
        menuActive.value.menu1 = true
        menuActive.value.menu2 = false
    }
    if (arr[3] == 'scoreboard') {
        menuActive.value.menu1 = false
        menuActive.value.menu2 = true
    }

    currentPath.value = router.currentRoute.value.path;
});
</script>

<template>
    <div>
        <div class="d-flex justify-content-start">
            <div>
                <h4 style="color: #484B7B;">โปรแกรมการแข่งขัน</h4>
                <img style="" class=" ms-2" src="../../assets/icon/football.svg" alt="">
            </div>
        </div>
        <div>
            <p style="color: #484B7B;"><span class="hoverEffect" @click="NavigateToPath('/football')">ผลบอลสด</span> >
                ข้อมูลทั้งหมด {{ fetchLeadInfoMonthly?.leadNameTh }}</p>
        </div>
        <div class="d-flex align-items-center" style="color: #484B7B;">
            <div class="img-lead" style=" width: 60px; height: 60px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);      border-radius: 50%;
    background: #fff;     margin-right: 10px;"> <img style="width: 100%;
    height: auto;
    display: block;
    border-radius: 50%;" :src="fetchLeadInfoMonthly?.leadImg" alt=""></div>
            <div class=" two-menu">
                <span>{{ fetchLeadInfoMonthly?.leadNameTh }}</span> <br>
                <span style="font-size: 14px;"><span
                        @click="NavigateToPath(`/lead-football/${fetchLeadInfoMonthly.leadID}/today`)" class="menu-sub"
                        :class="{ 'active-sub-menu': menuActive.menu1 }">ตารางแข่ง</span>
                    | <span class="menu-sub" :class="{ 'active-sub-menu': menuActive.menu2 }"
                        @click="NavigateToPath(`/lead-football/${fetchLeadInfoMonthly.leadID}/scoreboard`)">ตารางคะแนน</span></span>
            </div>
        </div>
        <div class="mt-2">
            <router-view />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.two-menu {
    .menu-sub {
        cursor: pointer;
    }

    .active-sub-menu {
        color: #BD0720
    }
}

.hoverEffect {
    cursor: pointer;
    transition: color 0.3s ease;
}

.hoverEffect:hover {
    color: #BD0720;
}

.disabled {
    pointer-events: none; //This makes it not clickable
    opacity: 0.6; //This grays it out to look disabled
}

h4 {
    color: #fff;
    display: inline-block;
    text-decoration: underline;
}

.menu {
    ul {
        list-style-type: none;
        padding: 0;
        height: 100%;
        margin: 0;
        display: flex;
        flex-wrap: wrap;

        li {
            padding: 0px 5px;
            margin-bottom: 5px;
            transition: text-decoration 0.3s ease;
            color: #fff;
            white-space: nowrap;
            border-left: 1px solid #fff;
            font-weight: 600;

            &:hover {
                color: #FFCC02;
                cursor: pointer;
            }
        }
    }
}
</style>