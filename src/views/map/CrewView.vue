<script setup lang="ts">
import KakaoMap from '@/components/map/KakaoMap.vue'
import Header   from '@/components/map/Header.vue';
import Cate       from '@/components/common/Cate.vue';
import List   from '@/components/map/List.vue';
import Radio    from '@/components/frame/Radio.vue'; 
import Select    from '@/components/frame/Select.vue'; 
import { ObjectNav } from '@/types/nav';
import {ref} from 'vue';

const cate = ref<string>('0');
const move  = ref<string>('all');
  
const cate2:ObjectNav[] = [
  new ObjectNav('map',  '', '/map/spot'),
  new ObjectNav('crew', '', '/map/crew'),
];


</script>

<template>
    <main>
      <Header></Header>
      <div class="cate_top">
              <Cate :array="cate2"></Cate>
      </div>

      <div class="content">
        <div class="select_wrap">
          <Select :labels="['전체','서울']" v-model="cate" width=100 :values="['0','1']"></Select>
        </div>
        <div class="cate_wrap">
          <span>총 15개</span>
          <Radio :labels="['전체','모집중']" :values="['all','hire']" v-model="move"></Radio>
        </div>
         
        <div class="crate_wrap">
          <button type="button">
              <span class="plus_icon"><i class="material-icons">add</i></span>
              크루 등록하기
          </button>
        </div>

        <List :array="[{title:'Crew Name',sub:'@instal',link:'/map/crew/1'}]"/>
      </div>
    </main>
</template>

<style lang="scss" scoped>
main{
  height:100%;
}

.select_wrap{
  padding-top:20px;
}

.cate_wrap{
  padding-top:18px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span{
    color:var(--c-lnk-dark);
    font-size:var(--f-theme-tiny);
  }
}

.cate_top{
  padding-top:18px;
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