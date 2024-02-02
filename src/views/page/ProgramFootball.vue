<script setup lang="ts">
// import { useRouter } from 'vue-router';
// import { ref, watchEffect } from 'vue';

// const router = useRouter()

// const currentPath = ref<string>("");

// const hasMenu = [
//     {
//         path: '/football',
//         name: 'บอลสด',
//         isUse: true
//     },
//     {
//         path: '/football/result',
//         name: 'ผลบอล',
//         isUse: true
//     }
//     ,
//     {
//         path: '/football/player-power',
//         name: 'ค่าพลังนักเตะ',
//         isUse: true
//     }
//     ,
//     {
//         path: '/highlights/all',
//         name: 'ไฮไลท์บอล',
//         isUse: true
//     }
// ]

// const NavigateToPath = (path: string) => {
//     router.push(path)
// }
// const IsCurrentPath = (path: string): boolean => {
//     return currentPath.value === path
// };

// watchEffect(() => {
//     currentPath.value = router.currentRoute.value.path;
// });

</script>

<template>
    <div>
        <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <img class=" ms-2" src="../../assets/icon/football.svg" alt="">
                <div class="title-menu">ข้อมูลทีมและนักเตะ</div>
            </div>
            <button v-if="false" disabled class="btn btn-sm"
                style="background-color: #101452; color: #fff;">เลือกวันที่</button>
        </div>
        <div class="d-flex my-2 flex-wrap">
            <!-- <template v-for="item in hasMenu" :key="item">
                <button :class="{ 'disabled': !item.isUse, 'active-route': IsCurrentPath(item.path) }"
                    @click="NavigateToPath(item.path)" class="btn-menu me-2 mb-1">{{ item.name }}</button>
            </template> -->
        </div>
        <div class="mt-2" style="background-color: #DEDFE4; border-radius: 14px; padding: 0.8rem;">
            <router-view />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.disabled {
    pointer-events: none; 
    opacity: 0.6; 
}

.title-menu {
    color: rgba(13, 13, 13, 1);
    margin: 0;
    margin-left: 10px;
    font-weight: bold;
    font-size: 1.3rem;
}

.btn-menu {
    background: rgba(241, 241, 241, 1);
    color: white;
    padding: 5px 10px;
    border-radius: 25px;
    border: none;
    cursor: pointer;
    font-size: 0.85rem;
    color: rgba(141, 141, 154, 1);

    &:hover {
        background-color: $primary-color;
        color: white;
    }
}

.active-route {
    background-color: $primary-color;
    color: white;
}
</style>