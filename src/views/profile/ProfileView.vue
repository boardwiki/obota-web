
<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import Card     from '@/components/profile/Card.vue';
import { onMounted } from 'vue';
import { useProfileStore } from "@/stores/profile";
import { useAuthStore } from "@/stores/auth";
import {ref} from 'vue';
const props = defineProps<{
    id : number
}>()
const stoAuth = useAuthStore();
const stoProfile = useProfileStore();

const checkFollowing = ref<boolean>(false);
onMounted(async()=>{
    await stoProfile.getProfileDetail(props.id);       
    await stoProfile.getSkillCount();
    await stoProfile.getUserSkillCount(props.id);
    await stoProfile.getFollowing(props.id)
    await stoProfile.getFollower(props.id)
    await stoProfile.isFollowing(props.id).then((res)=>{
        checkFollowing.value = res;
    })
})

const getCategoryTitle = (type:string)=>{
    switch(type){
        case 'totalDancingCount':
            return '댄싱';
        case 'totalFootTrickCount':
            return '풋트릭';
        case 'totalHandTrickCount':
            return '핸드트릭';
    }
}

const getUserCategoryCnt = (type:string)=>{
    switch(type){
        case 'totalDancingCount':
            return stoProfile.progress_cnt.dancingCount;
        case 'totalFootTrickCount':
            return stoProfile.progress_cnt.footTrickCount;
        case 'totalHandTrickCount':
            return stoProfile.progress_cnt.handTrickCount;
    }
}


</script>


<template>
    <main class="my_skill" v-if="stoProfile.detail">
        <Title title="유저 프로필" :align="'center'" :useCancel="true"></Title> 

        <div>
            <Card :my="id == stoAuth.info.id" :info="stoProfile.detail" :Following="checkFollowing"></Card>
        </div>

        <div class="con">
            <strong>스킬카드</strong>
            <span>
                <span>총 {{stoProfile.progress_cnt.progressCount}}진행중</span>
                <span>
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                    {{
                        stoProfile.detail.stance ? 
                        stoProfile.detail.stance == 'Regular' ? '레귤러 스탠스' : '구피 스탠스' : '스탠스 없음'
                    }}

                </span>
            </span>
            <ul class="skill_list">
                <li v-for="(cnt,key) in stoProfile.total_cnt" :key="key">
                    <div class="left">
                        <span>{{getCategoryTitle(key)}}</span>
                        <span>{{getUserCategoryCnt(key)}}</span>
                        <span>/ {{cnt}}</span>
                    </div>
                    <div class="right">
                        <div class="bar">
                            <span :style="{width:(Number(getUserCategoryCnt(key)) / cnt * 100).toFixed(2)+'%'}"></span>
                        </div>
                        
                        <span>
                            {{
                                cnt ?
                                (Number(getUserCategoryCnt(key)) / cnt * 100).toFixed(2)
                                : '0.00'
                            }}%
                        </span>
                    </div>
                </li>
            
            </ul>
        </div> 

        <div class="con" v-if="false">
            <strong>보유 배지</strong>
            <span>총 x개</span>
            <router-link to="/profile/achievements">
                <span>전체보기</span>
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="awesome-icons" />
            </router-link>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.my_skill{
    .con{
        position: relative;
        padding: 30px 20px;

        > *{
            display: block;
        }

        > strong{
            font-size:var(--f-theme-title2);
            margin-bottom:10px;
        }

        > span{
            font-size:var(--f-theme-small);
            color:var(--c-lnk-basic);
            margin-bottom:20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        > a{
            position: absolute;
            display: flex;
            right:20px;
            top:34px;
            align-items: center;
        }

        > a span{
            color:var(--c-lnk-basic);
            margin-right: 5px;
        }

        > a .awesome-icons{
            font-size:10px;
        }

        .skill_list{
            border-radius: 20px;
        }

        .skill_list li{
            display: flex;
            justify-content: space-between;
            align-items: center;

            background: var(--c-lnk-base);
            margin-bottom: 15px;
            padding: 15px 20px;
            border-radius: 20px;
            box-shadow: 1px 1px 3px var(--c-lnk-basic);
            font-size:var(--f-theme-small);
            .left span:nth-child(2){
                color:var(--c-theme-blue);
                margin: 0 5px;
            }
            .left span:nth-child(3){
                color:var(--c-lnk-light)
            }
        
            .right{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width:calc(100% - 160px)
            }

            .bar{
                background: var(--c-lnk-light);
                border-radius: 10px;
                margin-right: 10px;
                width: calc(100% - 70px);
                height: 10px;
                display: flex;
                overflow: hidden;
            }

            .bar span{
                height:100%;
                min-width:10px;
                border-radius:10px;
                background: var(--c-lnk-dark);
            }
        }

        .style_list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        .style_list li{
            width:23%;
            text-align: center;
            margin-bottom: 10px;
        }
    }

}
</style>