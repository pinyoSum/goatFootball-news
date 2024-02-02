<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watchEffect, ref } from 'vue'
import { useMenuFootballInsights } from '../../stores/useMenuFootballInsights'
// import Api from '@/api/axiosConfig'

const route = useRoute()
const router = useRouter()
const menuFootballInsights = useMenuFootballInsights()
const currentPath = ref<string>("");
// const memu = ref([...menuFootballInsights.isMenuFootballInsights
// ])

const GotoPage = (path: string) => {
    router.push(`/match-football/${route.params.id}/${path}`)
}
const IsCurrentPath = (path: string): boolean => {
    if (currentPath.value.split('/')[currentPath.value.split('/').length - 1] === path) {
        return true
    }
    if (path === 'details' && currentPath.value.split('/')[currentPath.value.split('/').length - 1] != 'analysis' && currentPath.value.split('/')[currentPath.value.split('/').length - 1] != 'betting-rates' && currentPath.value.split('/')[currentPath.value.split('/').length - 1] != 'scoreboard') {
        return true
    }
    return false
};

onMounted(async () => {
    await menuFootballInsights.SelectMatchDetailOrAnalysis(route.params.id as unknown as number)
})
watchEffect(() => {
    currentPath.value = router.currentRoute.value.path;
});
</script>

<template>
    <div>
        <!-- <div class="d-flex" style="color: #101452;font-size: 0.9rem;">
            <template v-for="item in menuFootballInsights.isMenuFootballInsights" :key="item">
                <p style="cursor: pointer;" @click="GotoPage(item.path)">{{ item.name }} |</p>
            </template>
        </div> -->
        <div class="d-flex my-3 flex-wrap">
            <template v-for="item in menuFootballInsights.isMenuFootballInsights" :key="item">
                <button @click="GotoPage(item.path)" class="btn-menu me-2 mb-1 "
                    :class="{ 'active-route': IsCurrentPath(item.path) }">{{ item.name }}</button>
            </template>
        </div>
        <router-view />
    </div>
</template>
<style lang="scss" scoped>
.d-flex p:hover {
    color: #FF0000;
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
}</style>