<script lang="ts" setup>
import Title from '@/components/common/Title.vue'
import router from '@/router';
import { useRouteStore } from '@/stores/router';

function back(){
    const stoRouter = useRouteStore();
    const filteredHistory = stoRouter.routeHistory.filter(route => route.from !== '/calendar/month' && route.from !== '/calendar/week');

    if(filteredHistory.length > 0)
        router.push(filteredHistory[filteredHistory.length-1].from);
    else
        router.push('/');
}

</script>

<template>
    <header class="header">
        <h2 class="sound_only">달력</h2>
        <button class="btn_back" @click="back()">
                <font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" />
        </button>
        <Title title="Calendar" :align="'center'" ></Title>
        <div class="lnk">
            <router-link to="/calendar/week">주간</router-link>
            <router-link to="/calendar/month">월간</router-link>
        </div>
    </header>
</template>

<style lang="scss">
    .btn_back{
        position: absolute;
        left:20px;
        top:20px;
    }
    
    .lnk{
        height: var(--s-theme-btn);
        padding:3px;
        background: var(--c-lnk-light);
        display: flex;
        border-radius :  var(--s-theme-radius);
        position: absolute;
        right:20px;
        top:15px;
        height:38px;
        a{
            font-size:var(--f-theme-tiny);
            height:32px;
            padding:0 10px;
            line-height: 32px;
            border-radius: var(--s-theme-radius);
        }
        a.active{
            background: var(--c-lnk-white);
        }
  }
</style>