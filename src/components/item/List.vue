<script lang="ts" setup>
import { defineProps } from 'vue';
import { ObjectItem } from '@/types/item';
import Cate from '@/components/common/CateMini.vue';

const props = defineProps<{
  list : ObjectItem[]
}>();

</script>

<template>
    <ul>
        <li>
            <ul class="items">
            <li v-for="(item,id) in list" :key="id">
                <router-link :to="`/item/detail/${item.id}`">
                  <div class="gal">
                  <img :src="item.img" alt="" width="165" height="175">
                  </div>
                  <strong>{{item.name}}</strong>
                  <Cate :list="[44,46,48]"/>
                  <span>{{item.price}}</span>
                </router-link>
            </li>

            </ul>


        </li>
    </ul>
</template>

<style lang="scss" scoped>
.items{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-between;
    > li{
      width:calc(100% / 2 - 7.5px);
      margin-bottom:20px;

      strong{
        font-size:var(--f-theme-small);
        display: block;
        padding-top:10px;
      }

      span{ 
        font-size:var(--f-theme-tiny);
        font-size:var(--c-lnk-dark);
        display:block;
        padding-top:5px;
      }

    }
    .gal img{
      border-radius: 15px;
      background: var(--c-lnk-basic);
      width:100%;
      height: auto;
    }
  }
</style>