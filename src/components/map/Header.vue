<script setup lang="ts"> 
import Title      from '@/components/common/Title.vue';
import { ObjectNav } from '@/types/nav';

const haed:ObjectNav[] = [
    new ObjectNav('search', '', '/map/search'),
];

</script>

<template>
  <header class="header">
      <h2 class="sound_only">아이템정보</h2>
      <Title title="Logo" :align="'center'" ></Title>
      <router-link :to="item.to" v-for="(item, id) in haed" :key="id" :class="`icon${id+1}`">
              <i class="material-icons">{{item.txt}}</i>
      </router-link>
  </header>
</template>

<style>
  .icon1,.icon2{
    position: absolute;
    top:0;
    bottom:0;
    margin: auto 0;
    height:24px;
  }

  .icon1{
    right:20px;

  }
</style>