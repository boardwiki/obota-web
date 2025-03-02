<script lang="ts" setup>
import Title      from '@/components/common/Title.vue';
import Cate      from '@/components/common/Cate.vue';
import router from '@/router';
import { ObjectNav } from '@/types/nav';
import {useRouteStore} from '@/stores/router';

const cate:ObjectNav[] = [
  new ObjectNav('카테고리', '', '/item/filter'),
  new ObjectNav('브랜드', '', '/item/brandfilter'),
];


function back(){
    const stoRouter = useRouteStore();
    const filteredHistory = stoRouter.routeHistory.filter(route => route.from !== '/item/filter' && route.from !== '/item/brandfilter');
    if(filteredHistory.length > 0)
        router.push(filteredHistory[0].from);
    else
        router.push('/item');
}
</script>

<template>
    <main>
        <header class="header">
            <h2 class="sound_only">아이템정보</h2>
            <Title title="Logo" :align="'center'" ></Title>
            <button @click="back()" type="button" class="back_icon"><font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" /></button>
        </header>

        <div class="content">
            <Cate :array="cate"></Cate>
            <slot></slot>
        </div>
    </main>     
</template>

<style lang="scss" scoped>
.back_icon{
    position: absolute;
    top:0;
    bottom:0;
    margin: auto 0 ;
    left:20px;
}
</style> 