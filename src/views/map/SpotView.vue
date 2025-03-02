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
          <Select :labels="['스팟','샵']" :values="['spot','shop']" v-model="move"></Select>
          <Select :labels="['전체','서울']" v-model="local" width=100 :values="['all','seoul']"></Select>
        </div>
         
        <List :array="[{title:'스팟',sub:'시도군 도시',link:'/map/spot/1'}]"/>
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



</style>