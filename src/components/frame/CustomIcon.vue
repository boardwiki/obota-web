<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps<{
    name: string
}>()

const svgContent = ref<string>('');

// SVG 파일을 가져오는 비동기 함수
const fetchSvgContent = async (iconPath:string) => {
  try {
    const response = await fetch(iconPath);
    svgContent.value = await response.text();
  } catch (error) {
    console.error('Error fetching SVG:', error);
  }
};

// 컴포넌트가 마운트되면 SVG 파일을 가져오기
onMounted(async ()=>{
  //const url:string = props.name ? `@/assets/icons/${props.name}.svg` : `@/assets/icons/icon_none.svg`;
  await fetchSvgContent(new URL(`@/assets/icons/icon_none.svg`, import.meta.url).href);
});
</script>

<template>
  <div class="user-icon" v-html="svgContent">
  </div>
</template>

<style scoped lang="scss">
.user-icon {
  svg {
    width: 100%;
    height: auto;
  }
}
</style>