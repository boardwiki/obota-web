<script setup lang="ts">
import { ObjectFootInfo } from '@/types/foot'; 

const props = defineProps<{
    item: ObjectFootInfo;
}>();

const getLevel = (level:string) =>{
    switch(level){
        case 'basic':
            return '기초';
        case 'easy':
            return '초급';
        case 'normal':
            return '중급';
        case 'hard':
            return '중상급';
        case 'extreme':
            return '고급';
    }
}   

</script>

<template>
    <div class="skill_item">
        <div class="tit">
            <span>{{item.originalKorName}}</span>
            <button class="btn_star">
                <font-awesome-icon :icon="['far', 'heart']" class="awesome-icons"  />
            </button>
        </div>
        <ul>
            <li>{{getLevel(item.difficulty)}}</li>
            <li>{{item.aliasName}}</li>
        </ul>
        <div class="bar">
            <span> {{ ((item.userTrickCount / item.trickCount) * 100).toFixed(0) }}% ( {{item.userTrickCount}} / {{item.trickCount}})</span>
            <div>
                <div :style="{width:(item.userTrickCount / item.trickCount) * 100}">

                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .skill_item{
        padding:6px;
        background: var(--c-lnk-base); 
        border-radius: 10px;

        img{
            width: 100%;
            height: auto;
            border:1px solid var(--c-lnk-light)
        }

        .btn_star{
            background: var(--c-lnk-basic);
            width:18px;
            height: 18px;
            color:var(--c-lnk-white);
            border-radius: 50%;
        }

        .tit{
            padding: 10px 0 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;       
            span{
                font-size:var(--f-theme-small)
            }
            i{
                font-size: var(--f-theme-small);
                background: var(--c-lnk-light);
                padding:3px;
                border-radius: 50%;
            }
        }

        ul{
            display: flex;
            margin-bottom:15px;
        }

        li{
            font-size:var(--f-theme-tiny);
            background: var(--c-lnk-white);
            padding:5px 7px;
            background: var(--c-lnk-light);
            margin-right: 3px;
            border-radius: 10px;
        }

        .bar{
            span{
                display: block;
                text-align: right;
                font-size:9px;
            }

            > div{
                margin-top:8px;
                background: var(--c-lnk-light);
                height:10px;
                border-radius: 20px;
            }

            > div > div{
                height:100%;
                background: var(--c-theme-blue);
                border-radius: 20px;
            }
        }
    }

</style>