import { defineStore } from 'pinia'
import router from '@/router'
import Api from '@/api/axiosConfig'
import { useRoute } from 'vue-router'

export const useMenuFootballInsights = defineStore('menuFootballInsights', {
  state: () => ({
    menu: [] as any[],
    matchID: null as Number | null,
    matchStatus: null as String | null
  }),
  actions: {
    async SelectMatchDetailOrAnalysis(matchID: number) {
      try {
        if (matchID != this.$state.matchID) {
          const route = useRoute()
          this.$state.matchID = matchID
          const res = await Api.get(`/api/match_detail/${matchID}`)
          const datares = res.data.data.match_detail[0]
          const match_status = datares.match_status
          if (match_status == '0' || match_status < '-1') {
            const menuFootballInsights = [
              {
                path: 'analysis',
                name: 'การวิเคราะห์'
              },
              {
                path: 'betting-rates',
                name: 'ราคาบอล'
              },
              {
                path: 'scoreboard',
                name: 'ตารางคะแนน'
              }
            ]
            this.$state.menu = [...menuFootballInsights]
            router.push(`/match-football/${matchID}/analysis`)
            if (
              route.path.split('/')[3] != 'analysis' ||
              route.path.split('/')[3] != 'betting-rates' ||
              route.path.split('/')[3] != 'scoreboard'
            ) {
              router.push(`/match-football/${matchID}/analysis`)
            }
          } else {
            const menuFootballInsights = [
              {
                path: 'details',
                name: 'ข้อมูลการแข่งขัน'
              },
              {
                path: 'analysis',
                name: 'การวิเคราะห์'
              },
              {
                path: 'betting-rates',
                name: 'ราคาบอล'
              },
              {
                path: 'scoreboard',
                name: 'ตารางคะแนน'
              }
            ]
            this.$state.menu = [...menuFootballInsights]
          }
        }
      } catch {
        router.push(`/`)
      }
    }
  },
  getters: {
    isMenuFootballInsights: (state) => state.menu
  }
})
