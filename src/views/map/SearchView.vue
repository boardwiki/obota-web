<script setup lang="ts">
//import Search   from '@/components/Search.vue';
import KakaoMap from '@/components/map/KakaoMap.vue'
import router from '@/router';
</script>

<template>
    <header class="header">
        <h2 class="sound_only">검색하기</h2>
        <button @click="router.go(-1)" type="button" class="icon1"><font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" /></button>
        <div class="search">
            검색부분
        </div>
    </header>
    <div class="map">
        <KakaoMap></KakaoMap>
    </div>
</template>


<style lang="scss" scoped>

.header{
    display: flex;
    padding: 15px 20px;
    justify-content: space-between;
}


.header > .search{
    width:calc(100% - 40px);
    z-index: 99;
}

.map{
    height:calc(100% - 126px);
    position: absolute;
    left:0;
    top:66px;
    widtH:100%;
}


</style>