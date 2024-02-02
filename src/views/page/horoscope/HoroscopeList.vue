<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api/axiosConfig'
import { useRouter } from 'vue-router';
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const router = useRouter()

const GetHoroscopeAll = async () => {
    try {
        const res = await api.get('/api/horo_th_list')
        horoscopeAll.value = res.data.data
    } catch {
        horoscopeAll.value = []
    }
}
const PushToHoroscopeDetails = (id: number)=>{
    router.push(`/horoscope/details/${id}`)
}

const horoscopeAll = ref([] as any[])

onMounted(async () => {
    await GetHoroscopeAll()
    defaulApp.HideLoading()
})
</script>

<template>
    <div class="wrap-horoscope">
        <div class="latest-horoscope">
            <template v-for="(item, index) in horoscopeAll" :key="item">
                <div v-if="index < 1" class="latest-horoscope-card">
                    <div @click="PushToHoroscopeDetails(item.horo_id)" class="latest-horoscope-img">
                        <img :src="item.horo_img" alt="">
                    </div>
                    <div @click="PushToHoroscopeDetails(item.horo_id)" class="latest-horoscope-title">{{ item.horo_title }}</div>
                </div>
            </template>
        </div>
        <div class="all-horoscope">
            <!-- <div class="title">ดูดวงทั้งหมด</div> -->
            <div class="wrap-all-horoscope">
                <template v-for="(item, index) in horoscopeAll" :key="item">
                    <div v-if="index > 0" class="all-horoscope-card">
                        <div @click="PushToHoroscopeDetails(item.horo_id)" class="all-horoscope-img">
                            <img :src="item.horo_img" alt="">
                        </div>
                        <div class="all-horoscope-details">
                            <div class="all-horoscope-title">{{ item.horo_title }}</div>
                            <div @click="PushToHoroscopeDetails(item.horo_id)" class="all-horoscope-read-more">อ่านเพิ่มเติม</div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$bg-horoscope: #DEDFE4;

.wrap-horoscope {

    .latest-horoscope {
        background: #fff;
        border-radius: 10px;
        padding: 5px 15px;
        margin-bottom: 15px;

        .title {
            color: $primary-color;
            text-decoration: underline;
            margin-bottom: 10px;
        }

        .latest-horoscope-card {
            border-bottom: 1px solid $secondary-color;
            margin-bottom: 15px;

            .latest-horoscope-img {
                width: 100%;
                height: auto;

                img {
                    object-fit: contain;
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }

            .latest-horoscope-title {
                font-size: 1.2rem;
                padding: 10px 0;
                color: $secondary-color;
                cursor: pointer;
                line-height: 1;
            }
        }
    }

    .all-horoscope {
        .title {
            color: #fff;
            background-color: $primary-color;
            text-decoration: underline;
            padding: 5px 5px;
            margin-bottom: 15px;
        }

        .wrap-all-horoscope {
            background: $bg-horoscope;
            border-radius: 10px;
            padding: 10px 15px;
            margin-bottom: 15px;

            .all-horoscope-card {
                // display: flex;
                padding-bottom: 10px;
                border-bottom: 1px solid $secondary-color;
                margin-bottom: 10px;
                .all-horoscope-img {
                min-width: 100%;
                max-width: 100%;
                height: auto;
                margin-right: 5px;
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            }
            .all-horoscope-details{
                width: 100%;
                color: $secondary-color;
                display: flex;
                flex-direction: column;
                padding: 10px;
                .all-horoscope-title{
                    font-size: 0.95rem;
                }
                .all-horoscope-read-more{
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