<script setup lang="ts">
import KakaoMap from '@/components/map/KakaoMap.vue'
import Header   from '@/components/map/Header.vue';
import Cate       from '@/components/common/Cate.vue';
import Radio    from '@/components/frame/Radio.vue'; 
import Select    from '@/components/frame/Select.vue'; 
import List   from '@/components/map/List.vue'
import { ObjectNav } from '@/types/nav';
import {ref,watch} from 'vue';
import router from '@/router';

const cate:ObjectNav[] = [
  new ObjectNav('spot', '', '/map/spot'),
  new ObjectNav('shop', '', '/map/shop'),
];

const cate2:ObjectNav[] = [
  new ObjectNav('map', '', '/map/spot'),
  new ObjectNav('crew', '', '/map/crew'),
];



const move = ref<any>(router.currentRoute.value.name);
const local = ref<string>('all');
 
watch(move, (newValue, oldValue) => {
  router.push('/map/'+newValue)
})

</script>

<template>
    <main>
      <Header></Header>
      <div class="cate_top">
              <Cate :array="cate2"></Cate>
      </div>

      <div class="map">
        <KakaoMap></KakaoMap>
      </div>

      <div class="content">
        <div class="cate">
          <Radio  :labels="['스팟','샵']" :values="['spot','shop']" v-model="move"></Radio>
          <Select  :labels="['전체','서울']" v-model="local" width=100 :values="['all','seoul']"></Select>
        </div>

        <div class="crate_wrap">
          <button type="button">
              <span class="plus_icon"><i class="material-icons">add</i></span>
              샵 관리자 신청하기
          </button>
        </div>

         
        <List :array="[{title:'Shop name',sub:'주소 주소지',link:'/map/shop/1'}]"/>
      </div>
    </main>
</template>

<style lang="scss" scoped>
main{
  height:100%;
}

.content{
  position: absolute;
  height: calc(55% - 62px);
  top:calc(45% + 60px);
  width:100%;
}

.cate_top{
  padding-top:18px;
}

div.cate{
  padding-top:14px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between
}

.map{
  height:calc(45% - 60px);
  position: absolute;
  width:100%;
  top:120px;
}

.crate_wrap{
  font-size:var(--f-theme-small);
  color:var(--c-lnk-black);
  background: var(--c-lnk-base);
  border-radius: 10px;
  margin-top:20px;
  padding: 10px 15px;

  button > span{
    width:40px;
    height:40px;
    display: inline-block;
    border-radius: 50%;
    background: var(--c-lnk-dark);
    color:#fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right: 10px;;
  }

  button{
    display: flex;
    align-items: center;
  }
}




</style>