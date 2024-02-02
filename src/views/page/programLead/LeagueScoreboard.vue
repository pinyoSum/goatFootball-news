<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ScoreboardComponent from '@/components/ScoreboardComponent.vue';
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const route = useRoute() 

onMounted(async () => {
    defaulApp.HideLoading()
})
</script>

<template>
    <ScoreboardComponent type-of-id="leagueID" :id="(route.params.leadFootball as string)" />
</template>
