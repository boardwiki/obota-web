<script lang="ts" setup>
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores/auth';
    import { requestApi } from '@/axios';
    const stoAuth = useAuthStore();
    const show = ref<boolean>(false);
    import { ObjectFeed } from '@/types/feed';

    const props = defineProps<{
        id   : number,
        type : string
    }>();

    const del = async() =>{
        const id = props.id;
        if(confirm('삭제하곘습니까?')){ 
            switch(props.type){
                case'':
                break;
            }
        }
    }
    
    const challengeAfter = () =>{

    }

</script>

<template>
    <div class="set_btns">

        <button type="button" @click="show = show? false: true">
            <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="awesome-icons"/>
        </button>


        <div v-if="show">  
            <button type="button" @click="challengeAfter" v-if="type=='challenge'">결과 작성</button>
            <button type="button" @click="del()" class="btn_del">삭제</button>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
.set_btns{
    position: relative;
    > button{
        font-size:var(--f-theme-small)
    }

    div{
        top:100%;
        position: absolute;
        padding:6px;
        width:84px;
        right:0;
        background: var(--c-lnk-white);
        z-index:4;
        border-radius: 10px;
        border: 1px solid var(--c-lnk-light);

        button:last-child{
            border:0;
        }

        button.btn_del{
            color:var(--c-theme-red)
        }

        button{
            font-size:var(--f-theme-small);
            padding:5px;
            width: 70px;
            border-bottom: 1px solid var(--c-lnk-light);
            color:var(--c-lnk-dark);
        }
    }
} 

</style>