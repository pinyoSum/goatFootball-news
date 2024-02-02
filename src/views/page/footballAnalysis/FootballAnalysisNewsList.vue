<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axiosConfig'
import { useRouter } from 'vue-router';
import { useDefaul } from "@/stores/useDefault"

const defaulApp = useDefaul()
const router = useRouter()

const GetMacthAnalysisAll = async() =>{
    try {
        const res = await api.get('/api/article_th_list')
        macthAnalysis.value = res.data.data
    } catch {
        macthAnalysis.value = []
    }
}
const PushToPathMacthAnalysisDetails = (id: number)=>{
    router.push(`/football-analysis/news/details/${id}`)
}

const macthAnalysis = ref([] as any[])
onMounted( async()=>{
 await GetMacthAnalysisAll()
 defaulApp.HideLoading()
})
</script>

<template>
    <div class="header-ball-analysis">
        <div class="active">วิเคราะห์ฟุตบอล</div>
        <div @click="()=> {
            router.push(`/football-analysis/vdo/list`)
        }" >คลิปวิเคราะห์ฟุตบอล</div>
    </div>
    <div class="wrap-ball-analysis">
       <template v-for="item in macthAnalysis" :key="item">
        <div class="ball-analysis-card">
            <div class="title">{{ item.article_title }}</div>
            <div class="ball-analysis-details">
                <div class="ball-analysis-img">
                    <img :src="item.article_img" alt="">
                </div>
                <div class="ball-analysis-info">
                    <div class="ball-analysis-description">{{ item.article_description }}</div>
                    <div class="ball-analysis-read-more" @click="PushToPathMacthAnalysisDetails(item.article_id)">อ่านเพิ่มเติม</div>
                </div>
            </div>
        </div>
       </template>
    </div>
</template>

<style scoped lang="scss">
.header-ball-analysis{
    background-color: $primary-color;
    color: #fff;
    margin-bottom: 20px;
    >div{
        display: inline-block;
        width: 50%;
        text-align: center;
        padding: 5px 0;
        text-decoration: underline;
        cursor: pointer;
    }
    .active{
        background-color: $secondary-color;
    }
}
.wrap-ball-analysis{
    .ball-analysis-card{
        color: $secondary-color;
        margin-bottom: 15px;
        border-bottom: 1px solid $secondary-color ;
        padding-bottom: 15px;
        .title{
            font-size: 1.12rem;
            font-weight: bold;
        }
        .ball-analysis-details{
            display: flex;
            .ball-analysis-img{
                width: 50%;
                height: auto;
                img{
                    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
                    display: block;
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
            .ball-analysis-info{
                display: flex;
                flex-direction: column;
                width: 50%;
                padding: 10px;
                .ball-analysis-description{
                    font-size: 0.95rem;
                }
                .ball-analysis-read-more{
                    margin-top: auto;
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }

    }
}
</style>