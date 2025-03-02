<script setup lang="ts">
import {ObjectMap} from '@/types/map';
const props = defineProps<{
  array: ObjectMap[];
}>();
</script>

<template>
    <div class="list">
        <ul>
          <li v-for="(item,id) in array" :key="id">
            <router-link :to="item.link">
              <span class="fs">{{item.title}}</span>
              <span class="sc">{{item.sub}}</span>
              <font-awesome-icon :icon="['fas', 'chevron-right']" class="awesome-icons" />
            </router-link>
          </li>
        </ul>
    </div>  
</template>

<style lang="scss" scoped>

.list{
  ul li{
    background: var(--c-lnk-base);
    padding:20px;
    position: relative;
    margin-top:10px;
    border-radius: 15px;

    span{
      display: block;
    }
    
    .fs{
      font-size: var(--f-theme-small);
      color:var(--c-lnk-dark);
    }

    .sc{
      font-size: var(--f-theme-tiny);
      color:var(--c-lnk-dark);
      margin-top:15px;
    }

    i{
      position: absolute;
      right:20px;
      top:0;
      bottom:0;
      margin: auto 0;
      font-size:40px;
      color:var(--c-lnk-dark);
      height:40px;
    }
     
  }
}

</style>