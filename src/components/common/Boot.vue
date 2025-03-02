<script setup lang="ts">
import { useShowsStore } from '@/stores/show'; 
const shows = useShowsStore();
</script>

<template>

  <div class="loading" v-if="shows.isLoading">
    <div class="wrap">
      <span class="loader"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
body {
  background: red;
}

.test{
  background: #000;
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
}

.loading {
  z-index: 99999;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  right: 0;
  top: 0;
  display: table;
  color: #fff;
  .wrap {
    display: table-cell;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    text-align: center;
  }
  .loader {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid #fff;
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
