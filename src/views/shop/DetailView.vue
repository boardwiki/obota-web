<script setup lang="ts">
import Slider from '@/components/common/Slider.vue';
import Info from '@/components/map/Info.vue'
import Schedule from '@/components/map/Schedule.vue'
import Rider from '@/components/map/Rider.vue'
import {ref} from'vue';

const img = new URL('../../assets/test_slide.png', import.meta.url).href;
const show = ref<number>(1);
</script>

<template>
    <main>

        <Slider :slides="[
            {img:img,lnk:''},
            {img:img,lnk:''},
            {img:img,lnk:''},
            {img:img,lnk:''},
            {img:img,lnk:''},
        ]"></Slider>
        
        <div>
            <Info :array="[
                {icon:'location_on', txt:'경기 수원시 팔달구 정조로 877',class:'top'},
                {icon:'call ',icon_txt:'연락처', txt:'0507-1402-3593'},
                {icon:'home',icon_txt:'홈페이지', txt:'http://www.akaboardshop.com'},
                {icon:'schedule',icon_txt:'운영시간', txt:'매일 9:00~18:00'},
                {icon:'home',icon_txt:'인스타', txt:'@akaboardshop'},
            ]"></Info>
            

            <div class="content">
                <ul class="tab_btn">
                    <li><button type="button" @click="show=1" :class="show==1?'active':''">공지</button></li>
                    <li><button type="button" @click="show=2" :class="show==2?'active':''">라이더</button></li>
                </ul>

                <ul>
                    <li v-if="show==1">
                        <Schedule :array="[
                            {date:'',title:'샵운영공지',txt:'샵운영 공지입니다.'},
                        ]"></Schedule>
                    </li>
                    <li v-if="show==2">
                        <Rider :array="[]"></Rider>
                    </li>
                </ul>
            </div>

        </div>
    </main>
</template>

<style lang="scss" scoped>
.img_slide img {
    width:100%;
    height:auto;
    background:var(--c-lnk-base)
}

.tab_btn{
    display: flex;
    li{
        width:50%;
        padding-bottom:5px;
    }

    button{
        width:100%;
        color:var(--c-lnk-dark);
        padding:20px 0;
        font-size:var(--f-theme-regular);
        border-radius: 20px 20px 0 0;
        position: relative;
    }

    button.active{
        color:var(--c-lnk-dark);
        background: var(--c-lnk-base);
    }
    button.active:after{
        content:"";
        display: block;
        position: absolute;
        width:100%;
        height:3px;
        border-radius: 10px;
        top:calc( 100% + 2px);
        background: var(--c-theme-blue);
    }

}

.content{
    padding-bottom: 100px;
}
</style>