<script setup lang="ts">
import Title      from '@/components/common/Title.vue';
import Select     from '@/components/frame/Select.vue';
import Cate       from '@/components/common/Cate.vue';
import { ObjectNav } from '@/types/nav';
import { ref } from 'vue';
const cate:ObjectNav[] = [
  new ObjectNav('데크', '', '/item/deck'),
  new ObjectNav('트럭', '', '/item/truck'),
  new ObjectNav('휠', '', '/item/wheel'),
];

const haed:ObjectNav[] = [
    new ObjectNav('search', '', '/item/search'),
    new ObjectNav('tune', '', '/item/filter'),
];

const sort = ref<number>(0); 

</script>

<template>
  <main>
    <header class="header">
      <h2 class="sound_only">아이템정보</h2>
      <Title title="Logo" :align="'center'" ></Title>

      <router-link :to="item.to" v-for="(item, id) in haed" :key="id" :class="`item_icon${id+1}`">
              <i class="material-icons">{{item.txt}}</i>
      </router-link>
    </header>

    <div class="content">
        <Cate  :array="cate"></Cate>

        <div class="select clear">
            <span>
              <Select v-model="sort"  :labels="['전체','출시일','판매순','조회순']" :values="[0,1,2,3,4]" width="100" ></Select>
            </span>
        </div>
        
        <slot></slot>
    </div>
   </main>
  
</template>

<style lang="scss" scoped>
  .item_icon1,.item_icon2{
    position: absolute;
    top:0;
    bottom:0;
    margin: auto 0;
    height:24px;
  }

  .item_icon1{
    right:60px;

  }

  .select span{
    padding-top:20px;
    padding-bottom:10px;
    float: right;
    width:80px;
  }
  
  .item_icon2{
    right:20px;
  }
</style>