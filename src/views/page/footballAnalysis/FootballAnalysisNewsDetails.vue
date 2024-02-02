<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api/axiosConfig'
import { useRouter, useRoute } from 'vue-router';
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const router = useRouter()
const route = useRoute()

const GetFootballAnalysisById = async () => {
    try {
        const res = await api.get(`/api/article_th_details/${route.params.id}`)
        if (Array.isArray(res.data.data) && res.data.data.length > 0) {
            footballAnalys.value = res.data.data[0]
        }
    } catch {
        footballAnalys.value = null
    }
}
const PushToFootballAnalysis = () => {
    router.push(`/football-analysis/news/list`)
}

const footballAnalys = ref(null as any)

onMounted(async () => {
    await GetFootballAnalysisById()
    defaulApp.HideLoading()
})
</script>
<template>
    <div v-if="footballAnalys != null">
        <div class="header-details">
            <span @click="PushToFootballAnalysis">วิเคราะห์ฟุตบอล</span> > {{
                footballAnalys.news_title
            }}
        </div>
        <div class="wrap-football-analysis-details">
            <div class="football-analysis-details-img">
                <img :src="footballAnalys.article_img" alt="">
            </div>
            <div class="info">
                <div class="description">
                    {{ footballAnalys.news_description }}
                </div>
                <div class="details" v-html="footballAnalys.news_content"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header-details {
    color: $primary-color;
    margin-bottom: 15px;
    span{
        cursor: pointer;
        font-weight: bold;
    }
}

.wrap-football-analysis-details {
    .football-analysis-details-img {
        width: 100%;
        height: auto;
        margin-bottom: 20px;
        overflow: hidden;

        img {
            object-fit: contain;
            width: 100%;
            height: 100%;
            display: block;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            transition: transform 1s;

            &:hover {
                transform: scale(1.2);
            }
        }
    }

    .info {
        color: $secondary-color;

        .description {
            margin-bottom: 15px;
            color: $secondary-color;
            font-size: 1.2rem;
            font-weight: bold;
            padding: 10px;
            border-top: 1px solid  $secondary-color;
            border-bottom: 1px solid  $secondary-color;
        }
    }
}
</style>