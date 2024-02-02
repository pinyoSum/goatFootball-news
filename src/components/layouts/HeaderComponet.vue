<script setup lang="ts">
import { ref, watchEffect, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDefaul } from "@/stores/useDefault"

const router = useRouter()
const defaulApp = useDefaul()

const currentPath = ref<string>("");
const mainMenu = [
    {
        name: 'ทีเด็ดฟุตบอล',
        path: '/',
        isUse: true
    },
    // {
    //     name: 'โปรแกรมการแข่งขัน',
    //     path: '/football',
    //     isUse: true
    // },
    {
        name: 'วิเคราะห์ฟุตบอล',
        path: '/football-analysis/news/list',
        isUse: true
    },
    {
        name: 'ดูบอลสด',
        path: 'doBallSod',
        isUse: true
    },
    {
        name: 'ไฮไลท์ฟุตบอล',
        path: '/highlights/all',
        isUse: true
    },
    // {
    //     name: 'ข้อมูลทีมและนักเตะ',
    //     path: '/football/player-power',
    //     isUse: true
    // },
    {
        name: 'รวมข่าว',
        path: '/news/all',
        isUse: true
    },
]
const subMenu = [
    {
        name: 'หน้าแรก',
        path: '/',
        isUse: true,
        children: [],
        isShowChildren:false,
        isActive: false
    },
    {
        name: 'ดูดวงรายวัน',
        path: '/horoscope/all',
        isUse: false,
        children: [],
        isShowChildren:false,
        isActive: false
    },
    {
        name: 'ข้อมูลทีมและนักเตะ',
        path: '/football/player-power',
        isUse: true,
        children: [],
        isShowChildren:false,
        isActive: false
    },
    {
        name: 'ไฮไลท์ฟุตบอล',
        path: '/highlights/all',
        isUse: true,
        children: [],
        isShowChildren:false,
        isActive: false

    },
    {
        name: 'ทีเด็ดฟุตบอล',
        path: '/teded',
        isUse: true,
        children: [],
        isShowChildren:true,
        isActive: false
    },
    {
        name: 'วิเคราะห์ฟุตบอล',
        path: '/football-analysis/news/list',
        isUse: false,
        children: [],
        isShowChildren:false,
        isActive: false
    },
    {
        name: 'รวมข่าว',
        path: '/news/all',
        isUse: false,
        children: [],
        isShowChildren:false,
        isActive: false
    },
]
const isShowChildren = ref(false)
const isChecked = ref(false)
const NavigateToPath = (path: string, item: boolean) => {
    if (item) {
        isShowChildren.value = !isShowChildren.value
        return
    }
    if (path == 'doBallSod') {
        window.open("https://lfbtv.com/goatfootball/?k=GgjnsePSvN7Y2Jqb", "_blank");
        isShowChildren.value = false
    } else {
        router.push(path)
        closeMenu()
        isShowChildren.value = false
        defaulApp.toggleMenu = false
    }
}
const IsCurrentPath = (path: string): boolean => {
    return currentPath.value === path || currentPath.value.startsWith(path + '/');
};
const SwitchHeightHeader = () => {
    if (defaulApp.isPageFootballTips && !defaulApp.isToggleMenu) {
        const headerMobile = document.querySelector('.box-1');
        const headerDesktop = document.querySelector('.header-desktop')
        if (headerMobile instanceof HTMLElement) {
            headerMobile.style.height = '200px'
        }
        if (headerDesktop instanceof HTMLElement) {
            headerDesktop.style.height = '430px'
        }
    } else {
        const element = document.querySelector('.box-1');
        const headerDesktop = document.querySelector('.header-desktop')
        if (element instanceof HTMLElement) {
            element.style.height = '150px'
        }
        if (headerDesktop instanceof HTMLElement) {
            headerDesktop.style.height = 'auto'
        }
    }
}
const scrollHandler = () => {
    const bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (bodyScrollTop > 500) {
        isChecked.value = false;
    }
};
const OnScrollIntoViewById = (id: string) => {
    if (currentPath.value == '/') {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
        return
    }
    defaulApp.$state.infoPageTips.searchTipsById = ''
    NavigateToPath('/', false)
    defaulApp.$state.infoPageTips.searchTipsById = id
}
function closeMenu() {
    isChecked.value = false
    isShowChildren.value = false
}
onMounted(() => {
    SwitchHeightHeader()
})

watchEffect(() => {
    currentPath.value = router.currentRoute.value.path;
});
watch(() => defaulApp.isPageFootballTips, () => {
    SwitchHeightHeader()
})
watch(() => defaulApp.isToggleMenu, () => {
    SwitchHeightHeader()
})
watch(isChecked, (newValue) => {
    if (newValue === false) {
        isShowChildren.value = false
    }
})
watch(() => isShowChildren.value, () => {
    if (isShowChildren.value) {
        subMenu.forEach(item => {
            if (item.path === '/teded') {
                item.isActive = true;
            } else {
                item.isActive = false;
            }
        })
    }
    else {
        subMenu.forEach(item => {
            if (item.path === '/teded') {
                item.isActive = false;
            }
        })
    }
})
window.addEventListener('scroll', scrollHandler);
</script>

<template>
    <div class="header-desktop">
        <div class="container-custom">
            <div class="menu d-flex align-items-center justify-content-between">
                <div class=" d-flex">
                    <div style="cursor: pointer;" @click="NavigateToPath('/', false)" class="logo">
                        <img src="../../assets/img/GOATFOOTBALL.png" alt="">
                        <!-- <img src="../../assets/icon/logo.svg" alt=""> -->
                    </div>
                    <div class="d-flex align-items-center">
                        <ul>
                            <template v-for="item in mainMenu" :key="item">
                                <li :class="{ 'disabled': !item.isUse, 'active-route': IsCurrentPath(item.path) }"
                                    @click="NavigateToPath(item.path, false)">{{
                                        item.name }}
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
                <div class="action me-5" style="background-color: white;">
                    <input type="checkbox" v-model="isChecked" id="navcheck" role="button">
                    <label for="navcheck" aria-hidden="true">
                        <span class="burger">
                            <span class="bar">
                                <span class="visuallyhidden">Menu
                                </span>
                            </span>
                        </span>
                    </label>
                    <nav id="menu">
                        <div v-if="isChecked" class="close">
                            <button class="btn-close" @click="closeMenu"></button>
                        </div>
                        <img style="width: 300px;" src="../../assets/img/GOATFOOTBALL.png" alt="">
                        <!-- <img src="../../assets/icon/logo.svg" alt=""> -->
                        <template v-for="item in subMenu" :key="item">
                                <a class="d-flex justify-content-between w-100" @click="NavigateToPath(item.path, item.isShowChildren)" :class="{ 'ActiveMenu': item.isActive }">
                                    {{ item.name }}
                                    <span class="me-3" v-if="item.path === '/teded'">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            :class="{ 'rotate-icon': item.isActive }" class="bi bi-chevron-down"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </span>
                                </a>
                            <template v-if="isShowChildren && item.path === '/teded'">
                                <template v-for="menuItem in defaulApp.$state.infoPageTips.menuSub" :key="menuItem">
                                    <a class="atag" @click="OnScrollIntoViewById(menuItem.id)">{{ menuItem.label }}</a>
                                </template>
                            </template>
                        </template>
                    </nav>
                </div>
            </div>
            <div class="box-2" v-if="defaulApp.isPageFootballTips && !defaulApp.isToggleMenu">
                <div class="text-content">
                    <div class="logo"><img src="../../assets/img/GOATFOOTBALL.png" alt=""></div>
                    <!-- <div class="logo"><img src="../../assets/icon/logo.svg" alt=""></div> -->
                    <div class="title">
                        <span class="title-head">GoatfootBall</span> <br>รวมทีเด็ดฟุตบอลไฮไลท์<br>
                        ประจำวัน ได้ทันที
                    </div>
                    <div class="dot">
                        <div class="dot1">&nbsp;</div>
                        <div class="dot2">&nbsp;</div>
                        <div class="dot3">&nbsp;</div>
                    </div>
                </div>
                <img class="box-img" src="../../assets/img/Cristiano.svg" alt="">
            </div>
        </div>
    </div>
    <div class="header-mobile">
        <div class="box-1">
            <div class="header">
                <div style="cursor: pointer;" @click="NavigateToPath('/', false)" class="logo-goat">
                    <img src="../../assets/img/GOATFOOTBALL.png" alt="">
                    <!-- <img src="../../assets/icon/logo.svg" alt=""> -->
                </div>
                <div class="action">
                    <input class="me-3" type="checkbox" v-model="isChecked" id="navcheck" role="button">
                    <label for="navcheck" aria-hidden="true">
                        <span class="burger">
                            <span class="bar">
                                <span class="visuallyhidden">Menu
                                </span>
                            </span>
                        </span>
                    </label>
                    <nav id="menu">
                        <div v-if="isChecked" class="close d-flex w-100 justify-content-end">
                            <button class="btn-close me-3 mt-2" @click="closeMenu"></button>
                        </div>
                        <img style="width: 300px;" src="../../assets/img/GOATFOOTBALL.png" alt="">
                        <!-- <img style="width: 300px;" src="../../assets/icon/logo.svg" alt=""> -->
                        <template v-for="item in subMenu" :key="item">
                            <a class="d-flex justify-content-between w-100" @click="NavigateToPath(item.path, item.isShowChildren)" :class="{ 'ActiveMenu': item.isActive }">
                                    {{ item.name }}
                                    <span class="me-3" v-if="item.path === '/teded'">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            :class="{ 'rotate-icon': item.isActive }" class="bi bi-chevron-down"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </span>
                                </a>
                            <template v-if="isShowChildren && item.path === '/teded'">
                                <template v-for="menuItem in defaulApp.$state.infoPageTips.menuSub" :key="menuItem">
                                    <a class="atag" @click="OnScrollIntoViewById(menuItem.id)">{{ menuItem.label }}</a>
                                </template>
                            </template>
                        </template>
                    </nav>
                </div>
            </div>
            <div class="menu">
                <div>
                    <ul>
                        <template v-for="item in mainMenu" :key="item">
                            <li :class="{ 'disabled': !item.isUse, 'active-route': IsCurrentPath(item.path) }"
                                @click="NavigateToPath(item.path, false)">{{ item.name }}
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <div class="box-2" style="z-index: 0;" v-if="defaulApp.isPageFootballTips && !defaulApp.isToggleMenu">
            <div class="text-content">
                <div class="logo"><img src="../../assets/img/GOATFOOTBALL.png" alt=""></div>
                <!-- <div class="logo"><img src="../../assets/icon/logo.svg" alt=""></div> -->
                <div class="title">
                    <span class="title-head">GoatfootBall</span> <br>รวมทีเด็ดฟุตบอลไฮไลท์<br>
                    ประจำวัน ได้ทันที
                </div>
                <div class="dot">
                    <div class="dot1">&nbsp;</div>
                    <div class="dot2">&nbsp;</div>
                    <div class="dot3">&nbsp;</div>
                </div>
            </div>
            <img class="box-img" src="../../assets/img/Cristiano.svg" alt="">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ActiveMenu {
    text-decoration: underline;
}

.rotate-icon {
    transform: rotate(180deg);
    transition: transform 0.2s ease;
}

//style
$timing-function: cubic-bezier(0.19, 1, 0.22, 1);
$nav-width-desktop: 40em;
$nav-width-mobile: 25em;
$nav-item-nb: 6;

html {
    box-sizing: border-box;
}

*,
*:after,
*:before {
    box-sizing: border-box;
}

input {
    position: absolute;
    right: 0;
    opacity: 0;
}

label {
    position: absolute;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &::before {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(darken(#000, 40%), 0.50);
        content: "";
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s $timing-function;
    }

    .burger {
        position: absolute;
        top: -8px;
        right: 0;
        z-index: 3;
        width: 1em;
        height: 1em;
        margin: 0;
        padding: 0;
        transition: opacity 0.5s $timing-function;

        &::before,
        .bar,
        &::after {
            position: absolute;
            left: 0;
            display: block;
            width: 100%;
            height: 12%;
            background: #fff;
            content: "";
            transition: all 0.5s $timing-function;
        }

        .bar {
            top: 44%;
        }

        &::before {
            top: 0;
            transform-origin: top left;
        }

        &::after {
            bottom: 0;
            transform-origin: bottom left;
        }
    }


    .visuallyhidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }
}

input:focus+label,
label:hover {
    .burger {
        opacity: 0.75;
    }
}

.atag {
    text-overflow: ellipsis;
    padding-left: 50px;
    font-size: 1.1em;
    width: 300px;
    color: #525252;
    text-decoration: none;
    cursor: pointer;
    font-weight: 500;
    transform: translateX(-100%);
    transition: color 0.15s, transform 0.5s;
    transition-timing-function: $timing-function;

    &:hover,
    &:focus {
        text-decoration: underline;
        color: #414141;
    }
}

nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    bottom: 0;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    padding-top: 10px;
    transform: translate3d(0, 0, 0);
    transform: translateX(-100%);
    overflow-y: auto;
    will-change: transform;
    transition: transform 0.5s $timing-function;
    background-color: #ffffff;

    a {
        margin: 0.5em 0;
        padding: 0.2em;
        padding-left: 20px;
        font-size: 1.1em;
        color: #000000;
        text-decoration: none;
        cursor: pointer;
        font-weight: 500;
        transform: translateX(-100%);
        transition: color 0.15s, transform 0.5s;
        transition-timing-function: $timing-function;

        &:hover,
        &:focus {
            text-decoration: underline;
        }
    }

    &.btn-close {
        position: absolute;

    }
}

main {
    overflow: hidden;

    .content {
        transform: translate3d(0, 0, 0);
        will-change: transform, filter;
        transition: all 0.5s $timing-function;
    }
}

[id="navcheck"]:checked {
    &+label {
        &::before {
            opacity: 1;
            pointer-events: auto;
        }
    }

    &~nav {
        transform: translateX(0);

        &::before {
            transform: skewX(0deg) translateX(0);
        }

        a {
            transform: translateX(0);

            &:hover {
                text-decoration: underline;
            }
        }
    }

    &~main .content {
        transform: translateX(3em);
        transform-origin: left center;
        filter: blur(2px);
    }
}

/* Style Page */
body {
    min-width: 350px;
    margin: 0;
    overflow-x: hidden;
    background: #fff;
    color: #000;
    font-size: 1em;
    line-height: 1.4;
    font-weight: normal;
    font-family: 'Noto Sans', sans-serif;
}

main {
    background: #fff;
    padding: 5% 0;
}

article {
    width: 100%;
    margin: 0 auto;
    padding: 30px 30px;
    font-size: 1em;
    line-height: 1.8;

    @media (min-width: 1024px) {
        width: 70%;
    }
}

h1 {
    font: 2.5em/1.4 "roboto condensed";
    font-weight: 700;
    color: #1950FF;
}

p {
    text-align: justify;
}

//style

.header-desktop {
    position: relative;
    background-image:
        linear-gradient(rgba(143, 14, 45, 0.85), rgba(214, 55, 74, 0.1)), linear-gradient(180deg, rgba(39, 39, 39, 0) 0%, #1B1B1B 100%),
        // linear-gradient(180deg, rgba(39, 39, 39, 0) 0%, #1B1B1B 100%),
        url('../../assets/img/background-header.svg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 430px;

    .menu {
        .close {
            top: 0px;
            right: 0px;
            z-index: 999;
            position: absolute;

            .btn-close {
                width: 50px;
                height: 50px;
            }
        }

        .logo {
            width: 280px;
            height: auto;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
        }

        ul {
            list-style-type: none;
            padding: 0;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            flex-wrap: wrap;

            li {
                padding: 0 10px;
                transition: text-decoration 0.3s ease;
                color: #fff;

                &:hover {
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }
    }

    .action {
        position: relative;
        display: flex;
        align-items: center;

        .toggle-menu {
            width: 20px;
            height: 20px;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
        }
    }

    .box-2 {
        z-index: 0;
        margin-top: 15px;

        // animation: fadeInAndShow 1s forwards;
        >div {
            pointer-events: none;
        }

        // margin: -10.5% 2.5% 2.5% 2.5%;
        background: linear-gradient(104.29deg, #FD24CD 0%, #BD002D 84.11%);
        position: relative;
        height: 300px;
        border-radius: 10px;
        padding: 25px 16px 5px 16px;

        .text-content {
            position: relative;
            z-index: 0;

            .logo {
                width: 250px;
                margin-bottom: 8px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
            }

            .title {
                color: #fff;
                font-size: 1.5rem;
                padding-left: 20px;
                margin-bottom: 20px;

                .title-head {
                    font-size: 2rem;
                }
            }

            .dot {
                display: flex;
                gap: 5px;
                padding-left: 20px;

                >div {
                    pointer-events: none;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: pulse 3s infinite;
                }

                .dot1 {
                    animation-delay: 0s;
                }

                .dot2 {
                    animation-delay: 1s;
                }

                .dot3 {
                    animation-delay: 2s;
                }
            }

            @keyframes pulse {

                0%,
                100% {
                    background-color: rgba(255, 255, 255, 1);
                }

                33.33% {
                    background-color: rgba(217, 217, 217, 0.4);
                }

                66.66% {
                    background-color: rgba(217, 217, 217, 0.4);
                }
            }
        }

        .box-img {
            position: absolute;
            right: 0;
            top: 47%;
            transform: translateY(-50%);
            border-bottom-right-radius: 10px;
            width: 374px;
        }
    }
}

.disabled {
    pointer-events: none;
    opacity: 0.6;
}

.container-custom {
    padding: 0 !important;
}

.offcanvas {
    background-color: #14151B;
}

.subMenu {
    ul {
        list-style-type: none;
        padding: 0;
        height: 100%;
        margin: 0;

        li {
            padding: 15px 0px 3px 8px;
            transition: text-decoration 0.3s ease;
            color: white;
            border-bottom: 1px solid #fff;

            &:hover {
                color: #FFCC02 !important;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
}

.active-route {
    text-decoration: underline;
}
</style>
    