<script setup lang="ts">
import { ObjectNav } from '@/types/nav';
const props = defineProps<{
  array: ObjectNav[];
}>();

</script>

<template>
   <ul class="cate">
        <li 
          v-for="(item, id) in array"
          :key="id"
          :style="{width:`calc(100% / ${array.length})`}"
        > <router-link :to="item.to">
            <span>{{item.txt}}</span>
        </router-link>
      </li>
    </ul>
</template>

<style lang="scss" scoped>
  .cate{ 
    display: flex;
    width:100%;
    .active{
      color: var(--c-lnk-black);
      font-weight: 700;
      span:after{
        content:"";
        position: absolute;
        display: block;
        width:100%;
        height: 5px;
        bottom:-3px;;
        border-radius: 5px;
        background:var(--c-theme-blue);
      }
    }
    li{
      text-align: center;

      span{
        display: inline-block;
        position: relative;
        padding:22px 0;
      }

      a{
        width: 100%;
        display: block;
        font-size:var(--f-theme-regular);
        color:var(--c-lnk-dark);
      }
    }    
  }
</style>