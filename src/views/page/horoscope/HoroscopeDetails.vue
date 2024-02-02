<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api/axiosConfig'
import { useRouter, useRoute } from 'vue-router';
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const router = useRouter()
const route = useRoute()

const GetHoroscopeById = async () => {
    try {
        // /api/horo_th_details/{horo_id}
        const res = await api.get(`/api/horo_th_details/${route.params.id}`)
        if (Array.isArray(res.data.data) && res.data.data.length > 0) {
            horoscope.value = res.data.data[0]
        }
    } catch {
        horoscope.value = null
    }
}
const PushToHoroscope = () => {
    router.push(`/horoscope/all`)
}

const horoscope = ref(null as any)

onMounted(async () => {
    await GetHoroscopeById()
    defaulApp.HideLoading()
})
</script>
<template>
    <div v-if="horoscope != null">
        <div class="header-details">
            <span @click="PushToHoroscope">ดูดวงรายวัน</span> > {{
                horoscope.horo_title
            }}
        </div>
        <div class="wrap-horoscope-details">
            <div class="horoscope-details-img">
                <img :src="horoscope.horo_img" alt="">
            </div>
            <div class="info">
                <div class="description">
                    {{ horoscope.horo_description }}
                </div>
                <div class="details" v-html="horoscope.horo_content"></div>
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

.wrap-horoscope-details {
    .horoscope-details-img {
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