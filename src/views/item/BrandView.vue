<script lang="ts" setup>
import Title      from '@/components/common/Title.vue';
import router from '@/router';
import { ObjectBrand } from '@/types/brand';
import listData from '@/test/brand.json';
import {onMounted,ref} from 'vue';

const props = defineProps<{
  id:string;
}>();

const brand = ref<ObjectBrand|null>();

onMounted(()=>{
    brand.value =  listData.list[Number(props.id)-1];// 임시
})


</script>

<template>
    <main>
        <header class="header">
            <h2 class="sound_only">아이템정보</h2>
            <Title title="Logo" :align="'center'" ></Title>
            <button @click="router.go(-1)" type="button" class="back_icon"><font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" /></button>
        </header>
        <div v-if="brand">
            <strong class="brand">{{brand.name}} ({{brand.name_en}})</strong>
            <div class="img">
                <img :src="brand.img" alt="">
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
  .back_icon{
    position: absolute;
    top:0;
    bottom:0;
    margin: auto 0;
    height:24px;
    left:20px;
  }

  .brand{
    background: var(--c-theme-green);
    color:var(--c-lnk-black);
    font-size:var(--f-theme-title2);
    display: block;
    padding:20px;
  }

  .img img{
    width:100%;
    height: auto;
  }

</style>