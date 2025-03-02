<script lang="ts" setup>
import Title      from '@/components/common/Title.vue';
import router from '@/router';
import listData from '@/test/list.json';
import { onMounted, ref } from 'vue';
import { ObjectItem } from '@/types/item';
import Cate from '@/components/common/CateMini.vue';

const props = defineProps<{
  id:string;
}>();

const item = ref<ObjectItem|null>();

onMounted(()=>{
  item.value =  listData.list[Number(props.id)-1];// 임시
})

</script>

<template>
  <main>
    <header class="header">
      <h2 class="sound_only">아이템정보</h2>
      <Title  title="Logo" :align="'center'" ></Title>
      <button @click="router.go(-1)" type="button" class="back_icon"><font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" /></button>
    </header>
    
    <div v-if="item">
      <strong class="brand">{{item.brand}}</strong>
      <div class="img">
        <img :src="item.img" alt="">
      </div>

      <div class="info">
        <ul class="breadcrumb">
          <li>cate<font-awesome-icon :icon="['fas', 'chevron-right']" class="awesome-icons" /></li>
          <li>brand<font-awesome-icon :icon="['fas', 'chevron-right']" class="awesome-icons" /></li>
          <li>name<font-awesome-icon :icon="['fas', 'chevron-right']" class="awesome-icons" /></li>
        </ul>
        <strong class="name">{{item.name}}</strong>
        <ul class="cate">
          <Cate :list=[39,42] />
        </ul>
        <strong class="price">10000원</strong>
      </div>
    </div>

    <div class="shop">
      <span>판매처</span>
      <ul>
        <li>
          <a href="">
            <span class="name">A.K.A보드샵</span>
            <span class="cate">A.K.A board shop</span>
            <span class="">사이트로이동 <font-awesome-icon :icon="['fas', 'chevron-right']" class="awesome-icons" /></span>
          </a>
        </li>
      </ul>
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

</style>