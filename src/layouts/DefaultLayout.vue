<script setup lang="ts">
import HeaderComponent from "@/components/layouts/HeaderComponet.vue";
import FooterComponent from "@/components/layouts/FooterComponent.vue";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useDefaul } from "@/stores/useDefault"
import { FetchFootballTipsFromSiean } from '@/services/api/football';

const defaulApp = useDefaul()
const isVisible = ref(false);

const ScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const CheckScroll = () => {
  if (window.pageYOffset > 20) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};

onMounted(async () => {
  await FetchFootballTipsFromSiean()
  window.addEventListener('scroll', CheckScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', CheckScroll);
});
</script>
<template>
  <div id="content-main">
    <HeaderComponent />

    <!-- <div class="container-custom pt-3 pb-3" ><router-view /></div> -->
    <div class="container-custom pt-3 pb-3" v-if="!defaulApp.isToggleMenu"><router-view /></div>
    <div>
      <FooterComponent />
    </div>
    <button v-show="isVisible" @click="ScrollTop" id="backToTopButton">
      <img  src="../assets/icon/test.svg" alt="">
    </button>
  </div>
</template>

<style scoped lang="scss">
#backToTopButton {
  display: block;
  background: none;
  border: none;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 1;
  outline: none;
  cursor: pointer;
  background: linear-gradient(to right, #c00424, #b0041c);
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

</style>