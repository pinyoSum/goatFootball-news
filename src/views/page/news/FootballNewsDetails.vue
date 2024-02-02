<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api/axiosConfig'
import { useRouter, useRoute } from 'vue-router';
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const router = useRouter()
const route = useRoute()

const GetNewsById = async () => {
    try {
        const res = await api.get(`/api/news_th_details/${route.params.id}`)
        if (Array.isArray(res.data.data) && res.data.data.length > 0) {
            newsDetails.value = res.data.data[0]
        }
    } catch {
        newsDetails.value = null
    }
}
const PushToNewsPage = () => {
    router.push(`/news/all`)
}

const newsDetails = ref(null as any)

onMounted(async () => {
    await GetNewsById()
    defaulApp.HideLoading()
})
</script>
<template>
    <div v-if="newsDetails" class="wrap-news-details">
        <div class="news-details-header"><span @click="PushToNewsPage">รวมช่าว</span> > {{ newsDetails.news_title }}
        </div>
        <div class="news-details-img">
            <img :src="newsDetails.news_img" alt="">
        </div>
        <div class="title">{{ newsDetails.news_title }}</div>
        <div class="description">{{ newsDetails.news_description }}</div>
        <div class="details" v-html="newsDetails.news_content">
        </div>
    </div>
</template>
<style scoped lang="scss">
.wrap-news-details {
    .news-details-header {
        color: $primary-color;
        margin-bottom: 15px;

        span {
            cursor: pointer;
            font-weight: bold;
        }
    }

    .news-details-img {
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

    .title {
        margin-bottom: 15px;
        color: $secondary-color;
        font-size: 1.2rem;
        font-weight: bold;
    }

    .description {
        color: $secondary-color;
        font-size: 1.15rem;
        margin-bottom: 15px;
    }

    .details {
        color: $secondary-color;

        div {
            p {
                margin: 0 !important;
            }
        }
    }
}</style>