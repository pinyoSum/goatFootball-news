import { createRouter, createWebHashHistory } from 'vue-router'
import { useDefaul } from "@/stores/useDefault"

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/',
      name: 'layouts',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'homePages',
          component: () => import('@/page/FootballTipsFromSiean.vue')
        },
        {
          path: '/football',
          component: () => import('@/page/ProgramFootball.vue'),
          children: [
            {
              path: 'today',
              name: 'todayFootball',
              component: () => import('@/page/program/TodayFootball.vue')
            },
            {
              path: '',
              name: 'football',
              component: () => import('@/page/program/TodayFootball.vue')
            },
            {
              path: 'live',
              name: 'liveFootball',
              component: () => import('@/page/program/LiveFootball.vue')
            },
            {
              path: 'result',
              name: 'result',
              component: () => import('@/page/program/ResultFootball.vue')
            },
            {
              path: 'player-power',
              name: 'playerPower',
              component: () => import('@/page/program/PlayerPower.vue')
            }
          ]
        },
        {
          path: 'lead-football/:leadFootball',
          component: () => import('@/page/ProgramFootballLead.vue'),
          children: [
            {
              path: 'today',
              name: 'leagueSchedule',
              component: () => import('@/page/programLead/LeagueSchedule.vue')
            },
            {
              path: '',
              name: '/programFootballLead',
              component: () => import('@/page/programLead/LeagueSchedule.vue')
            },
            {
              path: 'scoreboard',
              name: 'leagueScoreboard',
              component: () => import('@/page/programLead/LeagueScoreboard.vue')
            },
          ]
        },
        {
          path: '/match-football/:id',
          component: () => import('@/page/MatchFootball.vue'),
          children: [
            {
              path: 'details',
              name: 'MatchDetails',
              component: () => import('@/page/footballInsights/MatchDetails.vue')
            },
            {
              path: 'analysis',
              name: 'MatchAnalysis',
              component: () => import('@/page/footballInsights/MatchAnalysis.vue')
            },
            {
              path: '',
              name: 'MatchFootball',
              component: () => import('@/page/footballInsights/MatchDetails.vue')
            },
            {
              path: 'betting-rates',
              name: 'BettingRates',
              component: () => import('@/page/footballInsights/BettingRates.vue')
            },
            {
              path: 'scoreboard',
              name: 'matchScoreboard',
              component: () => import('@/page/footballInsights/LeagueScoreboard.vue')
            }
          ]
        },
        {
          path: '/player-power',
          name: 'PlayerPowerLayouts',
          component: () => import('@/page/PlayerPowerLayouts.vue'),
          children:[
            {
              path: 'team/:id',
              name: 'PlayerPowerByTeam',
              component: () => import('@/page/PlayerPower/PlayerPowerByTeam.vue')
            },
            {
              path: 'team/:teamId/player/:playerId',
              name: 'PlayerPowerByPlayer',
              component: () => import('@/page/PlayerPower/PlayerPowerByPlayer.vue')
            },
          ]
        },
        {
          path: '/news',
          name: 'FootballNews',
          component: () => import('@/page/FootballNewsLayouts.vue'),
          children: [
            {
              path: 'all',
              name: 'FootballNewsList',
              component: () => import('@/page/news/FootballNewsList.vue')
            },
            {
              path: 'details/:id',
              name: 'FootballNewsDetails',
              component: () => import('@/page/news/FootballNewsDetails.vue')
            },
          ]
        },
        {
          path: '/football-analysis',
          name: 'footballAnalysis',
          component: () => import('@/page/FootballAnalysisLaouts.vue'),
          children: [
            {
              path: 'news/list',
              name: 'footballAnalysisNewsList',
              component: () => import('@/page/footballAnalysis/FootballAnalysisNewsList.vue')
            },
            {
              path: 'news/details/:id',
              name: 'footballAnalysisNewsDetails',
              component: () => import('@/page/footballAnalysis/FootballAnalysisNewsDetails.vue')
            },
            {
              path: 'vdo/list',
              name: 'footballAnalysisVdoList',
              component: () => import('@/page/footballAnalysis/FootballAnalysisVdoList.vue')
            },
            {
              path: 'vdo/details/:id',
              name: 'footballAnalysisvdoDetails',
              component: () => import('@/page/footballAnalysis/FootballAnalysisVdoDetails.vue')
            },
          ]
        }
        ,
        {
          path: '/highlights',
          name: 'HighlightsLayouts',
          component: () => import('@/page/HighlightsLayouts.vue'),
          children: [
            {
              path: 'all',
              name: 'HighlightsList',
              component: () => import('@/page/highlights/HighlightsList.vue')
            },
            {
              path: 'details/:id',
              name: 'HighlightsDetails',
              component: () => import('@/page/highlights/HighlightsDetails.vue')
            },
          ]
        },
        {
          path: '/horoscope',
          name: 'Horoscope',
          component: () => import('@/page/HoroscopeLayout.vue'),
          children: [
            {
              path: 'all',
              name: 'HoroscopeList',
              component: () => import('@/page/horoscope/HoroscopeList.vue')
            },
            {
              path: 'details/:id',
              name: 'HoroscopeDetails',
              component: () => import('@/page/horoscope/HoroscopeDetails.vue')
            },
          ]
        },
        
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  const defaulApp = useDefaul()
  defaulApp.ShowLoading()
  next();  // ต้องเรียกใช้เพื่อดำเนินการต่อ
});

export default router
