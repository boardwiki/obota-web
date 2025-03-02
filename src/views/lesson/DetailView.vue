<script lang="ts" setup>
import Title      from '@/components/common/Title.vue';
import router from '@/router';
import { onMounted, ref } from 'vue';
import { ObjectItem } from '@/types/item';
import Cate from '@/components/common/CateMini.vue';

const props = defineProps<{
  id:string;
}>();

const item = ref<ObjectItem|null>();

onMounted(()=>{
})

</script>

<template>
  <main>
    <header class="header">
      <h2 class="sound_only">아이템정보</h2>
      <Title  title="XX의 강습제목" :align="'center'" ></Title>
      <button @click="router.go(-1)" type="button" class="back_icon"><font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" /></button>
    </header>
    
    <div>
      <div class="img">
        <img src="" alt="" width="390" height="390">
      </div>

      <div class="info">
        <ul class="breadcrumb">
          <li>2023-12-12 17:00</li>
        </ul>
        <strong class="name">서울 서초구 반포한강달빛 광장</strong>
        <ul class="cate">
          <Cate :list="['트릭','초급']" />
        </ul>
        <strong class="price">10000원</strong>
      </div>
    </div>


    <div class="btn_wrap">
          <router-link to="/mypage/lessonmake" class="btn02">강습 신청하기</router-link>
      </div>

  </main>
</template>

<style lang="scss" scoped>
  .back_icon{
    position: absolute;
    top:0;
    bottom:0;
    margin: auto 0 ;
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
    background: var(--c-lnk-basic);
  }

  .info{
    padding: 20px;
  }

  .breadcrumb{
    display: flex;
    font-size:var(--f-theme-tiny);
    color:var(--c-lnk-dark);
    i{
      line-height: 1;
      vertical-align: bottom;
      font-size: 12px;
    }
  }

  .name{
    font-size:var(--f-theme-large);
    padding:15px 0 10px;
    display: block;
  }

  .price{
    font-size:var(--f-theme-small) ;
    padding:15px 0;
    display: block;
    border-bottom: 1px solid var(--c-lnk-basic);
  }

  .btn_wrap{
    position: fixed;
    max-width: var(--device-max-width);
    width: 100%;
    bottom:70px;
    left:0;
    right:0;
    margin: 0 auto;
    padding:0 20px;
}

</style>