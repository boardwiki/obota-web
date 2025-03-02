<script setup lang="ts">
    import Radio from '../frame/Radio.vue';
    import Range from '../frame/Range.vue';
    import { useFootTrcikStore } from '@/stores/foot';
    //import Item from './Item.vue';
    import { ref,onMounted } from 'vue';

    const stoDancing = useFootTrcikStore();
    const filter_difficulty = ref<any>(null);
    const filter_body = ref<string[]>([]);
    const filter_keyword = ref<any>('');

    const props = defineProps<{
        type :  string
    }>();
    

    const show_filter = ref<boolean>(false);
    const show_title = ref<boolean>(false);
    const search_history = ref<any[]>([]);

    onMounted(async()=>{
        search_history.value = await getSearch();
        filter_difficulty.value = stoDancing.filter.difficulty ? stoDancing.filter.difficulty : null;
        filter_keyword.value = stoDancing.filter.keyword? stoDancing.filter.keyword : null;
    })

    const reset = () => {
        filter_difficulty.value = null;
        filter_keyword.value = null;
        set();
    }
  
    const set = async() => {
        stoDancing.filter.difficulty = filter_difficulty.value ? filter_difficulty.value : null;
        stoDancing.filter.keyword    = filter_keyword.value;
        show_filter.value = false;
    }

    const find = async () => {

        if(filter_keyword.value){
            stoDancing.filter.keyword = filter_keyword.value;

            const check = search_history.value.find(element => element.includes(filter_keyword.value))

            if(!check){
                await setSearch(filter_keyword.value);
                search_history.value = await getSearch();
            }
            show_title.value = false;
        }

    }

    const keywordFind = async(keyword:string) =>{
        filter_keyword.value = keyword;
        await find();
    }

    const setSearch = async(keyword:string|null) => {
        const recentSearches:any = await getSearch();
        recentSearches.unshift(keyword); // 새로운 검색어를 배열의 맨 앞에 추가
        const recentSearches_slice:string[] = recentSearches.slice(0, 10); // 최근 10개의 검색어만 유지
        saveSearch(recentSearches_slice); // 로컬 스토리지에 저장
    }

    const saveSearch = (recentSearches:any) => {
      localStorage.setItem(`recentSearches_${props.type}`, JSON.stringify(recentSearches));
    };

    
    const getSearch = async() => {
        const recentSearchesJson = localStorage.getItem(`recentSearches_${props.type}`);
        return recentSearchesJson ? JSON.parse(recentSearchesJson) : [];
    }

    const delSearch = async(keyword:string) => {
        const filteredArray = search_history.value.filter(item => item !== keyword);
        saveSearch(filteredArray)
        search_history.value = await getSearch();
    }

    const resetSearch = () =>{
      localStorage.setItem(`recentSearches_${props.type}`, '');
      search_history.value = [];
    }

    /*

                    <li>
                        <dl>
                            <dt>
                                몸 회전각도
                            </dt>
                            <dd>
                                <Range 
                                    :array="['0','180','360','540']"
                                    :title="''"
                                    v-model="filter_body"
                                ></Range>
                            </dd>
                        </dl>
                    </li>

    */

</script>


<template>

    <div class="skill_search">
        <div class="btn_wrap">
            <button type="button" class="fliter_title_btn" @click="show_title=true">
                <span class="sound_only">이름 검색</span>
                <span aria-hidden="true">{{stoDancing.filter.keyword}}</span>
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="awesome-icons icon-normal" />  
            </button>

            <button type="button" class="fliter_cate_btn" @click="show_filter=true">
                <span class="sound_only">카테고리 검색</span>
                <font-awesome-icon :icon="['fas', 'filter']" class="awesome-icons"/>
            </button>
        </div>


        <div class="fliter_cate sub_fixed" v-if="show_filter">
            <button class="close" @click="show_filter=false">
                <span class="sound_only">닫기</span>
            </button>
            <div class="sub_con">
                <button class="close" @click="show_filter=false">
                    <span class="sound_only">닫기</span>
                </button>

                <strong class="tit">필터</strong>
                
                <ul class="frame_option_wrap">

                    

                    <li>
                        <dl>
                            <dt>
                                난이도
                            </dt>
                            <dd>
                                <Radio
                                    :labels="['기초','초급','중급','중상급','고급']"
                                    :values="['basic', 'easy', 'normal', 'hard', 'extreme']"
                                    v-model="filter_difficulty"
                                ></Radio>
                            </dd>
                        </dl>
                    </li>


                </ul>
                <div class="submit_wrap">
                    <button class="re" @click="reset()"><font-awesome-icon :icon="['fas', 'rotate-right']" />&nbsp; 재설정</button>
                    <button class="set" @click="set()">검색결과 보기</button>
                </div>
            </div>
        </div>

        <div class="fliter_title" v-if="show_title">
            <div class="top">
                <button type="button" @click="show_title=false">
                    <font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" />
                </button>
                <div class="search_btn">
                    <input type="text" v-model="filter_keyword" placeholder="검색어를 입력하세요">
                    <button type="button" @click="find">
                       <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="awesome-icons icon-normal" />
                    </button>
                </div>
            </div>

            <div class="history con">
                <div class="tit">
                    <strong>최근 검색 기술</strong>
                    <button type="button" class="lnk" @click="resetSearch()">전체 삭제</button>
                </div>
                <ul>
                    <li v-for="keyword in search_history" :key="keyword">
                        <button type="button" @click="keywordFind(keyword)">{{keyword}}</button>
                        <button type="button" @click="delSearch(keyword)" ><font-awesome-icon :icon="['fas', 'xmark']" /></button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .btn_wrap{
        padding:10px;
        display: flex;
        justify-content: space-between;

        button{
            height:40px;
            border:1px solid var(--c-lnk-light);
            border-radius: 20px;
            color: var(--c-lnk-dark);
        }

        .fliter_cate_btn{
            width:40px;
            text-align: center;
            > i{
                font-size:20px;
                width:20px;
            }
        }

        .fliter_title_btn{
            width: calc(100% - 50px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:0 20px;
            span{
                font-size:var(--f-theme-regular)
            }
        }
    }

    .fliter_title{
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;
        right:0;
        max-width: var(--device-max-width);
        margin: 0 auto;
        z-index: 99;
        background: var(--c-lnk-white);
         
        .top{
            display: flex;
            justify-content: space-between;
            padding:12px 20px;

            > button{
                height:36px;
                width:35px;
            }
        }

        .search_btn{
            border:1px solid var(--c-lnk-light);
            border-radius: 40px;
            height:36px;
            width:calc(100% - 40px);
            padding:0 15px;
            margin-bottom:10px;
             display: flex;
            justify-content: space-between;
            input{
                width:calc(100% - 34px);
                border:0;
                border-radius: 10px;
            }

            .awesome-icons{
                font-size: 15px;
            }
        }

        .con{
            padding: 10px 20px 20px;
        }

        .con .tit{
            padding-bottom:20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            strong{
                font-size:var(--f-theme-large);
            }

            .lnk{
                font-size:var(--f-theme-small);
                color:var(--c-lnk-basic);
                display: flex;
                align-items: center;
            }
        }

        .star{
            ul{
                display: flex;
                justify-content: space-between;
            }

            li{
                width:32%;
                padding-bottom: 10px;;
            }
        }

        .history {

            ul{
                width:100%;
            }

            li{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding:20px;
            }

            li button:first-child{
                margin-right: 5px;
            }


        }

    }

    .fliter_cate{

        strong{
            display: block;
            text-align: center;
            font-size:var(--f-theme-small);
            padding:10px;
        }

        .submit_wrap{
            margin-top:40px;
            border-top:1px solid var(--c-lnk-light);
            padding:10px 20px 30px;
            font-size:var(--f-theme-regular);
            font-weight: 700;
            display: flex;
            .re{
                display: flex;
                align-items: center;
                width:100px;
            }
            .set{
                background: var(--c-lnk-black);
                color:var(--c-lnk-white);
                padding:17px 20px;
                line-height: 1;
                width:calc(100% - 85px);
                border-radius: 20px;
            }
        }
    }

</style>