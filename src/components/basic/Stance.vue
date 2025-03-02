<script setup lang="ts">
    import { useStanceStore } from '@/stores/stance';
    import {ref,onMounted} from 'vue'
    const stoStance = useStanceStore();
    const props = defineProps<{ 
        stance ?: any
    }>();

    const LEFT_NOSE = new URL('@/assets/nose_left.png', import.meta.url).href
    const RIGHT_NOSE = new URL('@/assets/nose_right.png', import.meta.url).href
    const RIGHT_TAIL = new URL('@/assets/tail_right.png', import.meta.url).href
    const LEFT_TAIL = new URL('@/assets/tail_left.png', import.meta.url).href

    interface data {
        url:string,
        type : string
    }

    const myStance = ref<data[]>([]);
    const reverseStacne = ref<data[]>([]);

    onMounted(()=>{
        if(props.stance =='Goofy'){
            myStance.value = [
                {
                    url : LEFT_TAIL,
                    type: 'LEFT_TAIL'
                },
                {
                    url : RIGHT_TAIL,
                    type: 'RIGHT_TAIL'
                },
                {
                    url : LEFT_NOSE,
                    type: 'LEFT_NOSE'
                },
                {
                    url : RIGHT_NOSE,
                    type: 'RIGHT_NOSE'
                },
            ];

            reverseStacne.value = [
                {
                    url : RIGHT_TAIL,
                    type: 'RIGHT_TAIL'
                },
                {
                    url : LEFT_TAIL,
                    type: 'LEFT_TAIL'
                },
                {
                    url : RIGHT_NOSE,
                    type: 'RIGHT_NOSE'
                },
                {
                    url : LEFT_NOSE,
                    type: 'LEFT_NOSE'
                },
            ];

        }else{
            reverseStacne.value = [
                {
                    url : LEFT_TAIL,
                    type: 'LEFT_TAIL'
                },
                {
                    url : RIGHT_TAIL,
                    type: 'RIGHT_TAIL'
                },
                {
                    url : LEFT_NOSE,
                    type: 'LEFT_NOSE'
                },
                {
                    url : RIGHT_NOSE,
                    type: 'RIGHT_NOSE'
                },
            ];

            myStance.value = [
                {
                    url : RIGHT_TAIL,
                    type: 'RIGHT_TAIL'
                },
                {
                    url : LEFT_TAIL,
                    type: 'LEFT_TAIL'
                },
                {
                    url : RIGHT_NOSE,
                    type: 'RIGHT_NOSE'
                },
                {
                    url : LEFT_NOSE,
                    type: 'LEFT_NOSE'
                },
            ];
        }
    })

</script>

<template>
    <div class="basic_stance">

        <div>

            <p>
                자신의 주로 보는 방향을 기준으로<br/>
                주행방향 킥(노즈), 반대(테일)에 따라서 스텐스를 정합니다.<br/>
            </p>

        </div>

        
        <span class="arrow">
            <span>
                <font-awesome-icon :icon="['fas', 'arrow-up']" />
                주행방향 ({{stance == 'Goofy' ? '구피' : '레귤러'}} 스텐스)
            </span>
        </span>
        <ul>
            <li v-for="(stance,id) in myStance" :key="id">
                <img :src="stance.url"/>
                <span>
                    {{stoStance.getStanceName(stance.type)}}
                </span>
            </li>
        </ul>

    </div>
  
</template>

<style lang="scss">
.basic_stance{

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
    }

    li{
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