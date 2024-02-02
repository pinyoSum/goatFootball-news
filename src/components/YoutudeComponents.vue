<script lang="ts" setup>
import { computed } from 'vue';
const props = withDefaults(defineProps<{ link: string }>(), {
})
 const embedLink = computed(()=> {
    
    if(props.link.indexOf('youtu.be/') > -1){
      return  props.link.replace('youtu.be/', 'youtube.com/embed/') + '?si=wtDhXvtQoxCNrWbW'
    }
    return  props.link.replace('watch?v=', 'embed/') + '?si=wtDhXvtQoxCNrWbW'
 } )
</script>

<template>
    <iframe v-if="embedLink" :src="embedLink" frameborder="0" allowfullscreen></iframe>
</template>

<style scoped>
iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>