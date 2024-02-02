<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axiosConfig'
import { useRouter } from 'vue-router';
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const router = useRouter()

const GetInfoAll = async () => {
    try {
        const res = await api.get('/api/analyze_th_list')
        data.value = res.data.data
    } catch {
        data.value = []
    }
}
const PushToDetails = (id: number) => {
    router.push(`/football-analysis/vdo/details/${id}`)
}

const data = ref([] as any[])
onMounted(async () => {
    await GetInfoAll()
    defaulApp.HideLoading()
})
</script>

<template>
    <div class="header-ball-analysis">
        <div @click="() => {
            router.push(`/football-analysis/news/list`)
        }">วิเคราะห์ฟุตบอล</div>

        <div class="active">คลิปวิเคราะห์ฟุตบอล</div>
    </div>
    <div v-if="data.length > 0" class="wrap-vdo">
        <div class="popular-videos">
            <div class="title">วิดีโอ ยอดนิยม ⭐</div>
            <div :class="{ 'disabled' : data[0].video_id == null}" @click="PushToDetails(data[0].video_id)" class="vdo-img">
                <img :src="data[0].video_img" alt="">
            </div>
        </div>
        <div class="last-videos">
            <div class="title">วิดีโอ ล่าสุด</div>
            <template v-for="(item, index) in data" :key="item">
                <div :class="{ 'disabled' : item.video_id == null}" @click="PushToDetails(item.video_id)" v-if="index > 0" class="vdo-img">
                    <img :src="item.video_img" alt="">
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header-ball-analysis {
    background-color: $primary-color;
    color: #fff;
    margin-bottom: 20px;

    >div {
        display: inline-block;
        width: 50%;
        text-align: center;
        padding: 5px 0;
        text-decoration: underline;
        cursor: pointer;
    }

    .active {
        background-color: $secondary-color;
    }
}

.wrap-vdo {
    .popular-videos {
        .title {
            text-decoration: underline;
        }

        .vdo-img {
            width: 100%;
            height: auto;
            cursor: pointer;
            margin-bottom: 20px;
            overflow: hidden;

            img {
                display: block;
                object-fit: contain;
                height: 100%;
                width: 100%;
                transition: transform 1s;

                &:hover {
                    transform: scale(1.2);
                }
            }
        }
    }

    .last-videos {
        .title {
            text-decoration: underline;
        }

        .vdo-img {
            width: 100%;
            height: auto;
            cursor: pointer;
            margin-bottom: 20px;
            overflow: hidden;

            img {
                display: block;
                object-fit: contain;
                height: 100%;
                width: 100%;
                transition: transform 1s;

                &:hover {
                    transform: scale(1.2);
                }
            }
        }
    }
}
</style>