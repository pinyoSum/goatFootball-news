<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api/axiosConfig'
import { useRouter } from 'vue-router';
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const router = useRouter()

const GetNewsAll = async () => {
    try {
        const res = await api.get('/api/news_th_list/0')
        newsAll.value = res.data.data
    } catch {
        newsAll.value = []
    }
}
const PushToNewsDetails = (id: number)=>{
    router.push(`/news/details/${id}`)
}

const newsAll = ref([] as any[])

onMounted(async () => {
    await GetNewsAll()
    defaulApp.HideLoading()
})
</script>

<template>
    <div class="wrap-news">
        <div class="latest-news">
            <div class="title">ข่าวล่าสุด</div>
            <template v-for="(item, index) in newsAll" :key="item">
                <div v-if="index < 3" class="latest-news-card">
                    <div @click="PushToNewsDetails(item.news_id)" class="latest-news-img">
                        <img :src="item.news_img" alt="">
                    </div>
                    <div @click="PushToNewsDetails(item.news_id)" class="latest-news-title">{{ item.news_title }}</div>
                </div>
            </template>
        </div>
        <div class="all-news">
            <div class="title">ข่าวทั้งหมด</div>
            <div class="wrap-all-news">
                <template v-for="(item, index) in newsAll" :key="item">
                    <div v-if="index > 2" class="all-news-card">
                        <div @click="PushToNewsDetails(item.news_id)" class="all-news-img">
                            <img :src="item.news_img" alt="">
                        </div>
                        <div class="all-news-details">
                            <div class="all-news-title">{{ item.news_title }}</div>
                            <div @click="PushToNewsDetails(item.news_id)" class="all-news-read-more">อ่านเพิ่มเติม</div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$bg-news: #DEDFE4;

.wrap-news {

    .latest-news {
        background: $bg-news;
        border-radius: 10px;
        padding: 5px 15px;
        margin-bottom: 15px;

        .title {
            color: $primary-color;
            text-decoration: underline;
            margin-bottom: 10px;
        }

        .latest-news-card {
            border-bottom: 1px solid $secondary-color;
            margin-bottom: 15px;

            .latest-news-img {
                width: 100%;
                height: auto;

                img {
                    object-fit: contain;
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }

            .latest-news-title {
                font-size: 1.2rem;
                padding: 10px 0;
                color: $secondary-color;
                cursor: pointer;
                line-height: 1;
            }
        }
    }

    .all-news {
        .title {
            color: #fff;
            background-color: $primary-color;
            text-decoration: underline;
            padding: 5px 5px;
            margin-bottom: 15px;
        }

        .wrap-all-news {
            background: $bg-news;
            border-radius: 10px;
            padding: 10px 15px;
            margin-bottom: 15px;

            .all-news-card {
                display: flex;
                padding-bottom: 10px;
                border-bottom: 1px solid $secondary-color;
                margin-bottom: 10px;
                .all-news-img {
                min-width: 100px;
                max-width: 100px;
                height: 100px;
                margin-right: 5px;
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            }
            .all-news-details{
                width: 100%;
                color: $secondary-color;
                display: flex;
                flex-direction: column;
                padding: 10px;
                .all-news-title{
                    font-size: 0.95rem;
                }
                .all-news-read-more{
                    // font-size: 0.85rem;
                    text-decoration: underline;
                    cursor: pointer;
                    margin-top: auto;
                }
            }
        }
    }
}
</style>