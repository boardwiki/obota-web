<script setup lang="ts">
import { ref,onMounted } from 'vue';

const page = ref<number>(1);
const ImgBasic01 = new URL('@/assets/baisc01.png', import.meta.url).href
const ImgBasic02 = new URL('@/assets/baisc02.png', import.meta.url).href
const ImgBasic03 = new URL('@/assets/baisc03.png', import.meta.url).href
const ImgBasic04 = new URL('@/assets/baisc04.png', import.meta.url).href
const ImgBasic05 = new URL('@/assets/baisc05.png', import.meta.url).href

const emits = defineEmits(['endBasic']);

const next = async ()=>{

    if(page.value ==5){
        emits('endBasic',true);
    }

    page.value ++;
}

const back = () =>{
    page.value --;
}

onMounted(()=>{
})

</script>

<template>
    <main class="basic_note">
        <header>
            <button type="button"  @click="back" v-if="page > 1 && page < 6"> 
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>
            <strong>
                기초 듀토리얼
            </strong>
            <div class="bar">
                <span :style="{'width':`${Math.floor(100 / 5 * (page))}%`}"></span>
                <span class="txt">
                    {{Math.floor(100 / 5 * (page)) > 100 ? 100 : Math.floor(100 / 5 * (page))}}%
                </span>
            </div>
        </header>


        <ul>
            <li class="info1" :class="page == 1 ? 'active' : '' ">
                <img :src="ImgBasic01" style="max-width: 90%;"/>
                <p style="text-align: center;">
                    <strong>
                        입문자를 위한<br>롱보드 기초 상식 튜토리얼       
                    </strong>
                </p>
            </li>
            
            <li class="info2" :class="page > 1 ? 'active' : '' ">
                <img :src="ImgBasic02"/>
                <p>
                    보드에서 입는 부상의 30% 이상이 <br/>시작한지 4주 이내의 기간에 발생합니다. <br/><strong>헬멧, 무릎 보호대, 팔꿈치 보호대, 손목&발목 보호대</strong>는 초보자라면 필수로 착용해주세요.
                </p>
            </li>


            <li class="info3" :class="page > 2 ? 'active' : '' ">
                <img :src="ImgBasic03"/>
                <p>
                    롱보드는 넓고 평평한 장소에서 타기에 적합해요.<br/>다른 보더나 <strong>보행자</strong>와 충돌하는 일이 없도록 <br/>항상 주변 상황을 확인하세요.   
                </p>
            </li>

            
            <li class="info4" :class="page > 3 ? 'active' : '' ">
                <img :src="ImgBasic04"/>
                <p>
                    <strong>밑바닥이 평평하고 굽이 없는 신발</strong>은 보드를 통제할 수 있도록 도와주며, <strong>목이 길고 두툼한 양말</strong>은 보드와 부딪혀 입는 부상을 줄일 수 있어요.<br/>바닥에 끌리는 기장의 하의는 밟힐 수 있어 위험해요.
                </p>
            </li>

            <li class="info5" :class="page > 4 ? 'active' : '' ">
                <img :src="ImgBasic05"/>
                <p>
                    무게중심은 <strong>앞발</strong>에 주세요.<br/>뒷발에 힘이 들어가 중심을 못잡으면 보드를 날려 버리고 <strong>넘어질 수</strong> 있습니다!
                </p>
            </li>
        </ul>
        
        <button type="button" @click="next()" class="next_btn frame_btn01">{{
            page == 1 ? '기초 튜토리얼 시작하기' :
            page == 5 ? '튜토리얼 종료' : '다음'
        }}</button>

    </main>
</template>

<style lang="scss" scoped>
    .basic_note{
        background: var(--c-lnk-base);
        z-index:999;
        position: absolute;
        height:100%;
        width:100%;
        overflow: hidden;

        header{
            height:78px;
            position: absolute;
            top:0;
            left:0;
            z-index:60;
            width:100%;

            
            strong{
                display: block;
                height:60px;
                line-height:60px;
                font-size:var(--f-theme-large);
                color:var(--c-lnk-black);
                text-align: center;
                width:100%;
                padding:0 20px;
            }

            button{
                position: absolute;
                left:20px;
                height:60px;
            }
            
        }

        .bar {
            width:calc(100% - 70px);             
            background: var(--c-lnk-light);
            margin-left:20px;
            position: relative;
            height:10px;
            border-radius: 20px;
        }

        .bar span:first-child{
            background: var(--c-theme-blue);
            display: block;
            height: 100%;
            border-radius: 20px;
            max-width:100%;
            transition: 0.5s all;
        }
        
        .bar .txt{
            position: absolute;
            right:-35px;
            top:0;
            line-height: 10px;
        }
        
        .label{
            font-size:var(--f-theme-large);
            color: var(--c-lnk-black);
            text-align: left;
            width:100%;
            display: block;
            padding-bottom:20px;
        }
        
        .date{
            display: flex;
            width:100%;
            justify-content: space-between
        }
        .next_btn{
            position: absolute;
            bottom:10px;
            right:20px;
            width:100%;
            background: var(--c-lnk-light);
            color:var(--c-lnk-black);
            z-index:60;
            width:calc(100% - 40px);
        }

        .next_btn:hover,
        .next_btn:focus{
            color:var(--c-lnk-light);
            background: var(--c-lnk-black);
        }

        li{
            padding:78px 20px 60px 20px;
            position: absolute;
            top:0;
            left:100%;
            width:100%;
            height:100%;
            transition: 0.5s all;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: var(--c-lnk-base);
            
            img{
                max-width: 100%;
            }

            p{
                margin-top: 20px;
                width:100%;
            }

        }

        li.active{
            left:0;
        }

        .info1{
            z-index: 51;

        }
        
        .info2{
            z-index: 52;
        }
        
        .info3{
            z-index: 53;
        }
        
        .info4{
            z-index: 54;
        }

        .info5{
            z-index: 55;
        }
        
    }

    
</style>