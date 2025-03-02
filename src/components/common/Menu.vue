<script setup lang="ts">
import { ref } from 'vue';
import { ObjectNav } from '@/types/nav';
//import Icon from "@/components/CustomIcon.vue";
import Icon from "@/components/frame/CustomIcon.vue";

const gnb = ref<ObjectNav[]>([
  //new ObjectNav('공지', '', '/notice'),
  new ObjectNav('커뮤니티', 'icon_people', '/community'),
  new ObjectNav('기술', 'icon_people', '/skill'),
  //new ObjectNav('item', '', '/item'),
  //new ObjectNav('spot', '', '/map'),
  //new ObjectNav('calendar', '', '/calendar'),
  new ObjectNav('마이페이지', 'icon_people', '/mypage'),
])
</script>

<template>
    <nav class="menu">
        <ul>
          <li
            v-for="(item, id) in gnb"
            :key="id"
          >
            <router-link :to="item.to">
              <Icon :name="item.icon" class="icon"/>
              <component :is="item.icon"></component>
              <span>{{item.txt}}</span>
            </router-link>
          </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
.menu{
  position    : fixed;
  bottom      : 0;
  left        : 0;
  right       : 0;
  margin      : 0 auto;
  max-width   : var(--device-max-width);
  width       : 100%;
  height      : 60px;
  z-index     : 60;
  padding-top : 11px;
  background  : var(--c-lnk-white);
    .awesome-icons{
      font-size:var(--f-theme-small)
    }



    .icon{
      width:20px;
      margin: 0 auto;
      display: flex;
    }

    ul{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-evenly;
      align-items: center;
      text-align: center;
    }

    li{
      color:var(--c-font);
      min-width:50px;
      text-align: center;
    }

    span{
      display: block;
      font-size: var(--f-theme-tiny); 
      margin-top:5px;
    }

    .active {
      color:var(--c-theme-blue);
    }
}
</style>