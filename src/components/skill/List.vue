<script setup lang="ts">
    import Item from './Item2.vue';
    import { ref,computed,watch } from 'vue';
    import Select from '../frame/Select.vue'
        import Empty from '@/components/common/Empty.vue';
    import router from '@/router';
    import { ObjectSkillInfo } from '@/types/skill';
    import { useProgressStore } from '@/stores/progress';
    const sort = ref<string>('');
    const stoProgress = useProgressStore();
    const props = defineProps<{
        array : ObjectSkillInfo[],
        favorites : string[],
        link  : string,
        total : number,
        useFavorite : boolean
    }>();

    const userSkillCount = ref<number[]>([]);


    const emits = defineEmits(['leftClick', 'rightClick']);

    const moveDetail = async(item:ObjectSkillInfo) =>{
        router.push(`/skill/${props.link}/${item.originalEngName}`);
    }

    const isFavorite = (item: any) => {
        return computed(() => props.favorites.includes(item.originalEngName)).value;
    };

    const showUserSkill = (item:ObjectSkillInfo,id:number) =>{

        const categoryType = 
        props.link == 'footinfo' ? 'foot_trick' : 
        props.link == 'dancinginfo' ? 'dancing' : '';
        stoProgress.getCategoryProgress(item.id,categoryType).then((cnt)=>{
            if(cnt)
               userSkillCount.value[id] = cnt
            else
               userSkillCount.value[id] = 0
        });
    }

    watch(() => props.array, async(newValue, oldValue) => {
        userSkillCount.value = [];
    })

</script>


<template>
    <div class="skill_list">
        <ul class="list_top">
            <li class="cnt">
                전체 {{total}}개
            </li>

            <li class="right_wrap">
                <div class="select_wrap" v-if=false>
                    <Select
                        :values="['1','2','3']"
                        :labels="['등록순','난이도순','출시순']"
                        v-model="sort"
                        height="30px"
                        width="90px"
                    ></Select>
                </div>
            </li>
        </ul>

        <ul class="list"  v-if="array.length > 0">
            <li v-for="(item,id) in array" :key="id">
                <button type="button" @click="moveDetail(item)">
                    <Item :item="item" :favorite="isFavorite(item)" :useFavorite="useFavorite"></Item>
                </button>
                <div v-if="item.count">
                    <button class="proficiency_btn" @click="showUserSkill(item,id)" v-if="!(userSkillCount[id] >= 0)">
                        숙련도보기
                        <font-awesome-icon :icon="['fas', 'chevron-down']" />
                    </button>
                    <div class="bar" v-if="userSkillCount[id] >= 0">
                        <span> {{ ((userSkillCount[id] / item.count) * 100).toFixed(0) }}% ( {{userSkillCount[id]}} / {{item.count}})</span>
                        <div>
                            <div :style="{width:(userSkillCount[id] / item.count) * 100 + '%'}">
                            </div>
                        </div>
                    </div>

                </div>
            </li>
        </ul>

        <Empty msg="기술이 존재하지 않습니다." v-if="array.length==0"></Empty>
    </div>
</template>

<style lang="scss" scoped>


    .right_wrap{
        display: flex;
        align-items: center;
        
        .select_wrap{
            display: inline-block;
            margin-right:10px;
        }

        button{
            width: 30px;
            height: 30px;
        }
    }

    .cnt{
        font-size:var(--f-theme-small)
    }

    .proficiency_btn{
        margin-top:10px;
        width: 100%;
        text-align: right;
    }

    .list_top{
        padding:20px 0 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .skill_list{
        padding:0 20px;

        .list {
            padding-top:20px;

            > li{

                background: var(--c-lnk-base);
                margin-bottom: 20px;
                padding: 15px 20px;
                border-radius: 20px;
                box-shadow: 1px 1px 3px var(--c-lnk-basic);

            }

            > li:nth-child(3n){
                margin-right: 0;
            }


            > li > button{
                width:100%;
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
            
            /*
            @media (max-width: 450px) {
                li{
                    width:47%;
                }

                li:nth-child(1n){
                    margin-right: 2%;
                }
                    
            }
            */
        }
    }

</style>