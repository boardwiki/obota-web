<script setup lang="ts">
import { ObjectSkillInfo } from '@/types/skill';
const props = defineProps<{
    item: ObjectSkillInfo;
    favorite : boolean;
    useFavorite : boolean;
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

/*
        <div class="bar">
            <span> {{ ((item.userTrickCount / item.trickCount) * 100).toFixed(0) }}% ( {{item.userTrickCount}} / {{item.trickCount}})</span>
            <div>
                <div :style="{width:(item.userTrickCount / item.trickCount) * 100 + '%'}">
                </div>
            </div>
        </div>


:class="[
        item.trickCount == item.userTrickCount ? 'pass' : '',
        item.userTrickCount > 0 && item.userTrickCount !== item.trickCount ? 'ing' : '',
    ]"
*/

</script>

<template>
    <div class="skill_item" >
        <div class="tit">
            <span>{{item.originalKorName}}</span>
            <font-awesome-icon :icon="[favorite ? 'fa' : 'far', 'heart']" class="awesome-icons" v-if="useFavorite" :class="favorite ? 'like': ''"  />
        </div>
        <ul>
            <li class="level_info" :class="item.difficulty">{{getLevel(item.difficulty)}}</li>
            <li>{{item.aliasName}}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

    .skill_item{
        border-radius: 10px;

        &.pass {
            border-color: var(--c-theme-blue);
        }

        .like{
            color:var(--c-theme-red)
        }

        &.ing {
            border-color: var(--c-theme-shape);

            .bar > div > div{
                background-color: var(--c-theme-shape);
            }
        }

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
            padding: 10px 0 10px;
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
        }

        li{
            font-size:var(--f-theme-tiny);
            background: var(--c-lnk-white);
            padding:6px 10px;
            background: var(--c-lnk-light);
            margin-right: 6px;
            border-radius: 10px;
        }

       
    }

</style>