<script setup lang="ts">
    import {ref,onMounted} from 'vue'
    import { useStanceStore } from '@/stores/stance';
    const stoStance = useStanceStore();
    const props = defineProps<{ 
        stance ?: any
    }>();

    const myStance = ref<string[]>([]);
    const mySide   = ref<string[]>([]);
    const imgs     = ref<string[]>([]);

    const nose_left_cw = new URL('@/assets/nose_left_cw.png', import.meta.url).href
    const nose_left_ccw = new URL('@/assets/nose_left_ccw.png', import.meta.url).href
    const nose_right_cw = new URL('@/assets/nose_right_cw.png', import.meta.url).href
    const nose_right_ccw = new URL('@/assets/nose_right_ccw.png', import.meta.url).href
    const tail_right_cw = new URL('@/assets/tail_right_cw.png', import.meta.url).href
    const tail_right_ccw = new URL('@/assets/tail_right_ccw.png', import.meta.url).href
    const tail_left_cw = new URL('@/assets/tail_left_cw.png', import.meta.url).href
    const tail_left_ccw = new URL('@/assets/tail_left_ccw.png', import.meta.url).href

    onMounted(()=>{
        if(props.stance == 'Goofy'){
            myStance.value = [
            'LEFT_TAIL',
            'RIGHT_TAIL',
            'LEFT_NOSE',
            'RIGHT_NOSE'
            ]

            mySide.value = [
                'ccw',
                'cw'
            ]

            imgs.value = [
                tail_left_ccw,
                tail_left_cw,
                tail_right_ccw,
                tail_left_cw,
                nose_left_ccw,
                nose_left_cw,
                nose_right_ccw,
                nose_right_cw,
            ]
        }else{
            myStance.value = [
            'RIGHT_TAIL',
            'LEFT_TAIL',
            'RIGHT_NOSE',
            'LEFT_NOSE',
            ]
            
            mySide.value = [
                'cw',
                'ccw'
            ]

            imgs.value = [
                tail_right_cw,
                tail_right_ccw,
                tail_left_cw,
                tail_left_ccw,
                nose_right_cw,
                nose_right_ccw,
                nose_left_cw,
                nose_left_ccw,
            ]
        }
    })


</script>

<template>
    <div class="basic_side">

        <p>
            주행방향에서 보는 사람들의 기준입니다.<br/>
            보드와 몸회전의 방향의 이름을 정해줍니다.<br/>
            지켜보는 이 기준으로 주행자의 어깨가 열리는 방향은 프론사이드
            어깨가 닫히는경우 백사이드 라고 합니다. <br/>
            <span class="red">
            (단 페이키는 뒤를 보고 주행한다고 가정합니다.)
            </span>
        </p>

        <div v-for="(item,id) in myStance" :key="id">
            <span class="arrow">
                <span>
                    <font-awesome-icon :icon="['fas', 'arrow-up']" />
                    주행방향 ({{stance =='Goofy' ? '구피' : '레귤러'}} 스텐스)
                </span>
            </span>
            <ul>
                <li>
                    <img :src="imgs[id*2]"/>
                    <span>
                        {{stoStance.getStanceName(item)}}
                        {{stoStance.getRrotation(item,mySide[0]) == 'BackSide' ? '백사이드' : '프론사이드'}}
                    </span>
                </li>
                
                <li>
                    <img :src="imgs[id*2+1]"/>
                    <span>
                        {{stoStance.getStanceName(item)}}
                        {{stoStance.getRrotation(item,mySide[1]) == 'BackSide' ? '백사이드' : '프론사이드'}}
                    </span>
                </li>
            </ul>
        </div>
    </div>
  
</template>

<style lang="scss">
.basic_side{

    .arrow{
        margin-top:20px;
        display: block;
        text-align: center;
        color:var(--c-theme-red)
    }

    .red{
        color:var(--c-theme-red)
    }

    ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    li{
        width:50%;
        padding:10px;
        text-align: center;
    }

    img{
        width:100%;
    }

    li span{
        display: block;
        margin-top: 10px;
        color:var(--c-lnk-basic)
    }

}

</style>