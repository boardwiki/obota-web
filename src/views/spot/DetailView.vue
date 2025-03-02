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
                {icon:'location_on', txt:'서울특별시 구로구 신도림동 282-38',class:'top'},
                {icon:'map ',icon_txt:'바닥', txt:'아스팔트'},
                {icon:'store',icon_txt:'편의시설', txt:'도보 4분 편의점, 도보 2분 공중화장실'},
                {icon:'schedule',icon_txt:'운영시간', txt:'조명 12시까지'},
                {icon:'info',icon_txt:'기타', txt:'있는 경우 보이도록 함'},
            ]"></Info>
            

            <div class="content">
                <ul class="tab_btn">
                    <li><button type="button" @click="show=1" :class="show==1?'active':''">소식</button></li>
                    <li><button type="button" @click="show=2" :class="show==2?'active':''">오보타</button></li>
                </ul>

                <ul>
                    <li v-if="show==1">
                        <Schedule :array="[
                            {date:'',title:'롱보드 페스티벌',txt:'헬맷 미착용 시 대회 참여가 불가능합니다헬맷 미착용 시 대회 참여가 불가능합니다'},
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