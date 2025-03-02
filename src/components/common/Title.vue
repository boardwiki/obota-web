<script setup lang="ts">
import router from '@/router';
import { useRouteStore } from '@/stores/router';
const props = defineProps<{
  title?: string,
  useCancel?: boolean,
  align?:string,
  commentBack ?: string,
}>()

function back(){
    if(props.commentBack){
        if(confirm(props.commentBack))
            router.go(-1);    
    }else
        router.go(-1);    
}


</script>

<template>
    <div class="title" :class="align !== undefined ? align : '' ">
        <span class="tit">
            {{title? title: 'no title'}}
        </span>

        <button class="btn_back" @click="back()" v-if="useCancel">
                <font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" v-if="!commentBack"/>
                <span v-if="commentBack">취소</span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .title{
        height:64px;
        line-height: 64px;
        font-weight: 500;
        padding:0 15px;
        
        .tit {
            font-size:var(--f-theme-title3);
        }

        &.center{
            text-align: center;
        }

        &.left{
            text-align: left;
        }

        &.right{
            text-align: right;
        }

    }

    
    .btn_back{
        position: absolute;
        left:20px;
        font-size:var(--f-theme-large);
        top:calc(40px / 2)
    }

</style>