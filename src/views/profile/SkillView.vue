  <script setup lang="ts">
    import Title from "@/components/common/Title.vue";
    import Radio from "@/components/frame/Radio.vue";
    import { ref, onMounted } from "vue";
    import router from "@/router";
    import { useFootTrcikStore } from "@/stores/foot";
    const cate = ref<string>('');
    const level = ref<string>('');
    const props = defineProps<{
        user_id: number,
        skill_type : string
    }>();

    const stoFoot =useFootTrcikStore();

    onMounted(()=>{
        cate.value = props.skill_type;

        if(
            !(
            props.skill_type == 'foot-tricks' ||
            props.skill_type == 'hand-tricks' ||
            props.skill_type == 'dancing'
            )
        ){
            alert('잘못된 접근입니다.');
            router.push('/');
        }   

        switch(cate.value){
            case 'foot-tricks':
                stoFoot.myProgress()
            break;
        }
    })

    const showVide =(videoId:number) =>{

    }

    //<Select :labels="['최신순','달성순']" :values="['1','2']" v-model="sort" height="30px" width="80px"></Select>
    //const sort = ref<string>('1');

    

</script>

<template>
    <main class="prosess_skill">
        <Title title="스킬 카드" :align="'center'" :useCancel="true"></Title> 
        <div class="top">

            <dl>
                <dt>종류</dt>
                <dd>
                    <Radio 
                        :labels="['풋트릭','댄싱','헨트']" 
                        :values="['foot-tricks','hand-tricks','dancing']"
                        v-model="cate"
                        height="36px"
                    />
                </dd>
            </dl>

            
            <dl>
                <dt>레벨</dt>
                <dd>
                    <Radio 
                        :labels="['전체','입문','초급','중급','고급']" 
                        :values="['','1','2','3','4']"
                        v-model="level"
                        height="36px"
                    />
                </dd>
            </dl>

            <div class="info">
                <span>
                    진행중인 카드
                    <span>12</span>
                </span>


                
                <div class="bar">
                    <span class="gg"></span>
                    <span class="txt">12%</span>
                </div>

            </div>
        </div>

        
        <div class="list">
            <!--
            <ul>
                <li>
                    <div class="top">
                        <span>풋트릭 <span>n</span></span>
                        <div class="bar">
                            <span class="gg"></span>
                            <span class="txt">12%</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="top">
                        <span>풋트릭 <span>n</span></span>
                        <div class="bar">
                            <span class="gg"></span>
                            <span class="txt">12%</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="top">
                        <span>풋트릭 <span>n</span></span>
                        <div class="bar">
                            <span class="gg"></span>
                            <span class="txt">12%</span>
                        </div>
                    </div>
                </li>
            </ul>

            
        <div class="prosess_skill_list">
            <ul>
                <li v-for="(info,id) in stoFoot.myProgressInfo" :key="id">
                    <button>
                    </button>
                </li>
            </ul>
        </div>
        
            -->
        </div>

        
    </main>
</template>

<style lang="scss" scoped>
    .prosess_skill{

        .top{
            padding: 0 20px;
            border-bottom: 1px solid var(--c-lnk-light);
            dl{
                display: flex;
                margin-top: 10px;
                align-items: center;
            }

            dt{
                width:60px;
                font-size:var(--f-theme-small);
                font-weight: 700;
            }

            dd{
                width: calc(100% - 40px);
            }
        }

        .info{
            margin-top:20px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size:var(--f-theme-small);
            color:var(--c-lnk-basic);

            span span {
                color:var(--c-theme-blue);
                display: inline-block;
                margin-left: 5px;
            }
        }

        
        .bar{
            display: flex;
            width:calc(100% - 120px);
            justify-content: flex-end;
            align-items: center;
            span{
                color: var(--c-black);
                padding-left: 10px;
            }
            .gg{
                width:calc(100% - 40px);
                max-width: 150px;
                height:10px;
                background: var(--c-lnk-light);
                border-radius: 10px;
            }
        }


        .list{
            padding:20px;

            .top{
                display: flex;
                justify-content: space-between;
                font-size:var(--f-theme-small);
                padding-bottom:10px;
                margin-bottom: 20px;
                padding-left:0;
                padding-right:0;
            }

            span{
                color:var(--c-lnk-basic)
            }

            span span{
                color:var(--c-theme-blue);
                margin-left: 5px;
            }

            ul ul {
                display: flex;
            }

            > ul > li{
                padding-bottom:20px;;
            }
            ul li li {
                width:32%;
                margin-left: 2%;
                margin-bottom: 10px;
            }

            ul li li:first-child{
                margin-left:0;
            }
        }

        .prosess_skill_list > ul{
            padding: 0 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            
            > li{
                margin-bottom: 10px;
                width: 48%;
            }

            > li > button{
                width: 100%;
            }
        }


    }

</style> 