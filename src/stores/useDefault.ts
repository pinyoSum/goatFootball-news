import { defineStore } from 'pinia'

type Match = {
  predict: string
  teamaNameTh: string
  teambNameTh: string
  teamaNameEn: string
  teambNameEn: string
  leagueImage: string
  teamaImg: string
  teambImg: string
  timeStart: string
  matchZeanTitle: string
  matchZeanSubTitle: string
  matchId: string
  tipType: number
  idAccordion: string
  tipsImgId: number
}

type Zean = {
  zeanId: string
  zeanNameTh: string
  zeanNameEn: string
  zeanImage: string
  matchDay: Match[]
}

export const useDefaul = defineStore('defaulApp', {
    state: () => ({
        menu: [] as any[],
        pageFootballTips: false,
        toggleMenu: false,
        infoPageTips: {
          data: [] as Zean[],
          menuSub: [] as any[],
          searchTipsById: '' as string
        }
    }),
    actions: {
        ShowLoading(): void {
            const appElement = document.getElementById("app");

            if (appElement) {
              appElement.classList.add("load-mark");
              const loadingDiv = document.createElement("div");
              loadingDiv.className = "loading";
              const spinnerDiv = document.createElement("div");
              spinnerDiv.className = "loading-spinner";
              loadingDiv.appendChild(spinnerDiv);
          
              appElement.appendChild(loadingDiv);
            } else {
              console.error("Element with id 'app' not found.");
            }
          },
         HideLoading(): void {
            const appElement = document.getElementById("app");

            if (appElement) {
              appElement.classList.remove("load-mark");
          
              const loadingDiv = appElement.querySelector(".loading");
              if (loadingDiv) {
                loadingDiv.remove()
              }
            } else {
              console.error("Element with id 'app' not found.");
            }
          }
    },
    getters: {
        isPageFootballTips: (state) => state.pageFootballTips,
        isToggleMenu: (state) => state.toggleMenu
    }
})

