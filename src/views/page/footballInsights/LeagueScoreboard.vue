<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useDefaul } from "@/stores/useDefault"
const ScoreboardComponent = defineAsyncComponent(() =>
  import('@/components/ScoreboardComponent.vue')
)

const defaulApp = useDefaul()
const route = useRoute() 

onMounted(async () => {
    defaulApp.HideLoading()
})
</script>

<template>
    <ScoreboardComponent type-of-id="matchID" :id="(route.params.id as string)" />
</template>
