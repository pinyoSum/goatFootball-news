<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api/axiosConfig'
import { useRouter, useRoute } from 'vue-router';
import YoutudeComponents from '@/components/YoutudeComponents.vue';
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const router = useRouter()
const route = useRoute()

const GetDataById = async () => {
    try {
        const res = await api.get('/api/highlight_th_list')
        if (Array.isArray(res.data.data) && res.data.data.length > 0) {
            data.value = (res.data.data.filter( (e: any) => e.video_id == route.params.id))[0]
        }else{
            data.value = null
        }
        
    } catch {
        data.value = null
    }
}
const PushToPageList = () => {
    router.push(`/highlights/all`)
}

const data = ref(null as any)

onMounted(async () => {
    await GetDataById()
    defaulApp.HideLoading()
})
</script>

<template>
    <div v-if="data" class="header-details">
            <span @click="PushToPageList">ไฮไลท์ > {{ data.video_title }}</span> 
        </div>
        <div v-if="data" class="title">{{ data.video_title }}</div>
        <div v-if="data && data?.video_link != undefined && data?.video_link != null" class="main-veo">
            <YoutudeComponents :link="(data?.video_link as string)" />
        </div>
        <div @click="PushToPageList" class="bth-back">กลับไปยังหน้าคลิปวิเคราะห์ฟุตบอล</div>
</template>

<style scoped lang="scss">
.header-details {
    color: $primary-color;
    margin-bottom: 15px;
    span{
        cursor: pointer;
        font-weight: bold;
    }
}
.title{
    font-size: 1.12rem;
    border: 1px solid $secondary-color;
    border-left: none;
    border-right: none;
    padding: 10px 0;
    margin: 20px 0;
    color: $secondary-color;
}

.main-veo{
    position: relative;
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
}

.bth-back{
    cursor: pointer;
    text-decoration: underline;
    color: $secondary-color;
}

@media (min-width: 1000px) {
    .main-veo {
        height: 600px;
    }
}
</style>