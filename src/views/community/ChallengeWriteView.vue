<script lang="ts" setup>
    import Title from "@/components/common/Title.vue";
    import { ref,onMounted } from 'vue'; 
    import { useChallengeStore } from '@/stores/challenge';
    import { useBasicStore } from "@/stores/basic";
    import { useFootTrcikStore } from "@/stores/foot";
    import { useDancingStore } from "@/stores/dancing";
    import { useAuthStore } from "@/stores/auth";
    import router from '@/router';

    const stoBasic = useBasicStore();
    const stoFoot = useFootTrcikStore();
    const stoDancing = useDancingStore();
    const stoAuth = useAuthStore();

    const stoChallenge = useChallengeStore();
    const show_option = ref<boolean>(true);
    const show_skill = ref<boolean>(false);
    const skill_type = ref<string>('');
    const skill_list = ref<any[]>([]);
    const skill_list_out = ref<any[]>([]);
    const from_skill = ref<any[]>([]);
    const from_title = ref<string>('');
    const from_description = ref<string>('');
    const from_url    = ref<string>('');
    const from_start_date = ref<string>('');
    const from_start_time = ref<string>('');
    const from_end_date = ref<string>('');
    const from_end_time = ref<string>('');
    const from_date_not = ref<boolean>(false);

    onMounted(()=>{
        setTimeout(() => {
            if(stoAuth.info.role !== 'ADMIN'){
                alert('권한이 없습니다.');
                router.go(-1);
            }    
        }, 100);
        
    })


    const submitFrom = () =>{
        if(!from_start_date.value|| !from_end_date.value){
            alert('날짜를 선택해야합니다!.')
            return false;
        }


        if(!from_title.value){
            alert('제목을 입력해주세요.');
            return false;
        }

        
        if(!from_description.value){
            alert('내용을 입력해주세요.');
            return false;
        }

        if(!from_url.value){
            alert('주소를 입력해주세요');
            return false;
        }

        const startDate = from_start_date.value+'T'+(from_start_time.value?from_start_time.value:'00:00');
        const endDate   = from_end_date.value+'T'+(from_end_time.value?from_end_time.value:'23:59');

        stoChallenge.submitEnroll({
            title       : from_title.value,
            startDate   : startDate,
            endDate     : endDate,
            description : from_description.value,
            challengeUrl: from_url.value
        }).then((res)=>{
            console.log(res)
            if(res==1){
                alert('생성 완료됐습니다.\n승인이 완료되면 노출됩니다.')
                router.go(-1)
            }
        });
    }

    const showSkill = async() => {
        show_skill.value = true;
        
        await stoFoot.getSaveCategory().then(()=>{
            stoFoot.list.forEach(item => {
                const newItem = { ...item, category_type: 'foot_trick' }; 
                skill_list.value.push(newItem);
            });
        })

        await stoDancing.getSaveCategory().then(()=>{
            stoDancing.list.forEach(item => {
            const newItem = { ...item, category_type: 'dancing' };
            skill_list.value.push(newItem);
        });

        })

        await stoBasic.getSaveCategory().then(()=>{
            stoBasic.list.forEach(item => {
                const newItem = { ...item, category_type: 'basic' }; 
                skill_list.value.push(newItem); 
            });
        })
        
        skill_list_out.value = skill_list.value;
    }

    const closeSkill = () =>{
        show_skill.value = false;
        skill_list.value = [];
    }
    
    /*
    watch(() => from_date_not.value, async(newValue, oldValue) => {
        if(newValue){

        }
    })
    */

    const setLink = ()=>{
        const link = prompt('유투브 링크를 등록해주세요');
        from_url.value = String(link);
    }

    const delSkill = (id:number) =>{
        from_skill.value.splice(id,1);
    }

    const cateChage = (cate:string) =>{
        skill_type.value = cate;  
        skill_list_out.value = skill_list.value.filter(item => item.category_type === cate);

        console.log(skill_list_out.value)
    } 

</script>

<template>

    <main class="challenge_enroll">
        <h2 class="sound_only">
            첼린지 등록
        </h2>


        <header class="hd">
            <Title 
                title="첼린지 등록" 
                :align="'center'" 
                :commentBack="'입력한 텍스트 및 첨부된 파일이 있는 경우 취소 클릭 시 “작성 중인 글이 삭제됩니다.\n작성을 취소할까요?'"
                :useCancel="true"
            ></Title> 
            <button class="right_btn" type="button" @click="submitFrom">
                등록 
            </button>
        </header>

        <aside class="skill_pick" v-if="show_skill">

            <div class="hd">
                <Title 
                    :title="`기술선택`" 
                    :align="'center'" 
                ></Title> 
                <button @click="closeSkill" class="left_btn">
                    <font-awesome-icon :icon="['fas', 'angle-left']" />
                </button>
            </div>

            <div>
                <div>
                    <input type="text" id="find_skill">
                    <label for="find_skill" class="tip">
                        <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                        검색창에 텍스트를 입력하면 자동 검색이 됩니다.
                    </label>
                </div>

                
                <ul class="pick" v-if="from_skill.length > 0">
                    <li v-for="(item,id) in from_skill" :key="id">
                        <span class="num">{{id+1}}</span>
                        <span>{{item.korName ? item.korName : item.originalKorName}}</span>
                        <button type="button" @click="delSkill(id)">
                            <font-awesome-icon :icon="['fas', 'xmark']" />
                        </button>
                    </li>
                </ul>
                
                <div class="cate">
                    <ul>
                        <li :class="skill_type == '' ? 'on' : ''">
                            <button type="button" @click="cateChage('')">전체</button>
                        </li>
                        <li :class="skill_type == 'basic' ? 'on' : ''">
                            <button type="button" @click="cateChage('basic')">기본기</button>
                        </li>
                        <li :class="skill_type == 'foot_trick' ? 'on' : ''">
                            <button type="button" @click="cateChage('foot_trick')">풋트릭</button>
                        </li>
                        <li :class="skill_type == 'dancing' ? 'on' : ''">
                            <button type="button" @click="cateChage('dancing')">댄싱</button>
                        </li>
                        <li :class="skill_type == 'hand' ? 'on' : ''">
                            <button type="button" @click="cateChage('hand')">핸드트릭</button>
                        </li>
                    </ul>
                </div>

                <ul class="list">
                    <li v-for="(item,id) in skill_list_out" :key="id">
                        <span>
                            <span :class="item.category_type" class="frame_cate_btn02">
                                {{
                                    item.category_type == 'basic' ? '기본' :
                                    item.category_type == 'foot_trick' ? '풋트릭' : 
                                    item.category_type == 'dancing' ? '댄싱' : 
                                    item.category_type == 'hand_trick' ? '핸드' : '' 
                                }}
                            </span>

                            {{item.korName ? item.korName : item.originalKorName}}
                        </span>
                        <div class="btns">
                            <button class="frame_btn03 add_btn" type="button" @click="from_skill.push(item)">추가</button>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="close_btn">
                <button @click="closeSkill" class="frame_btn01">선택완료</button>
            </div>

        </aside>

        <article class="from">
            <h3>
                <strong>
                    <input type="text" v-model="from_title" placeholder="제목을 입력해주세요"/>
                </strong>
            </h3>

            <div class="date">
                <ul>
                    <li v-if="!from_date_not">
                        <span>시작</span>
                        {{
                            from_start_date
                        }}

                        {{
                            from_start_time
                        }}
                    </li>
                    <li v-if="!from_date_not">
                        <span>마감</span>
                        {{
                            from_end_date
                        }}

                        {{
                            from_end_time
                        }}
                    </li>
                    <li v-if="from_date_not">
                        <span>기간</span>
                        설정안함
                    </li>
                </ul>
            </div>

            <div class="enroll_option">

                <div>
                    <button type="button" @click="(setLink)"><font-awesome-icon :icon="['fas', 'link']"/>영상링크등록</button>
                </div>
                
                <button type="button" @click="show_option = true">
                    옵션 수정
                    <font-awesome-icon :icon="['fas', 'chevron-right']" class="awesome-icons" />
                </button>
            </div>

            
            <div class="link">
                <font-awesome-icon :icon="['fas', 'link']"/> {{from_url}}
            </div>


            <div class="line" v-if="false">
                <div>
                    <div>
                        <strong>
                            라인 순서
                        </strong>

                        <button type="button" @click="showSkill()">기술 추가</button>

                    </div>
                    <button type="button">
                        초기화
                        <font-awesome-icon :icon="['fas', 'rotate-right']" />
                    </button>
                </div>

                <ul>
                    <li v-for="(item,id) in from_skill" :key="id">
                        <span class="num">{{id+1}}</span>
                        <span>{{item.korName ? item.korName : item.originalKorName}}</span>
                        <button type="button" @click="delSkill(id)">
                            <font-awesome-icon :icon="['fas', 'xmark']" />
                        </button>
                    </li>
                </ul>

            </div>

            <div class="data">
                <label for="content" class="content_area">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                    챌린지 글은 등록 후 관리자 승인되어야 업로드가 완료됩니다.
                </label>
                <textarea id="content" cols="30" rows="10" v-model="from_description">
                </textarea>
            </div>
        </article>

        <article class="option sub_fixed" v-if="show_option">
            <h3 class="sound_only">option</h3>
            <button type="button" class="close" @click="show_option = false">
                <span class="sound_only">닫기</span>
            </button>

            <div class="sub_con">
                <button class="close" @click="show_option = false"></button>
                <strong class="tit">옵션</strong>
                <ul class="frame_option_wrap">
                    <li>
                        <div class="top">
                            <strong>시작</strong>
                            <!--
                            <label for="date_no_use">기간 설정 안함</label>
                            <input type="checkbox" id="date_no_use" v-model="from_date_not">
                            -->
                        </div>
                        <div>
                            <div>
                                <label for="">날짜</label>
                                <input type="date" v-model="from_start_date" :readonly="from_date_not"/>
                            </div>
                            
                            <div>
                                <label for="">시간</label>
                                <input type="time" v-model="from_start_time" :readonly="from_date_not"/>
                            </div>
                        </div>
                        
                    </li>
                    <li>
                        <div class="top">
                            <strong>종료</strong>
                        </div>
                        <div>
                            <div>
                                <label for="">날짜</label>
                                <input type="date" v-model="from_end_date" :readonly="from_date_not"/>
                            </div>
                            <div>
                                <label for="">시간</label>
                                <input type="time" v-model="from_end_time" :readonly="from_date_not"/>
                            </div>
                        </div>
                    </li>
                </ul>

                <button type="button" class="frame_btn02" @click="show_option = false">적용</button>
                <br/>
            </div>
            
        </article>
    </main>
</template>

<style lang="scss" scoped>
.option{
    .frame_btn02{
        width:calc(100% - 40px);
        margin: 30px auto 0;
        display: block;
    }
}

.frame_option_wrap{
    padding: 0 20px;


    li:after{
        content:"";
        clear: both;
        display: block;
    }

    div.top{
        width: 100%;
        font-size:var(--f-theme-small);
        margin-bottom: 20px;
        *{
            float:right;
        }

        label{
            margin-left: 5px;
        }

        strong{
            float:left;
        }

        &:after{
            content:"";
            clear: both;
            display: block;
        }
    }

    div:not(.top){
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    div div{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        label{
            padding-right:15px;
            font-size: var(--f-theme-small);
        }

        input{
            padding: 0 20px;
            border:1px solid var(--c-lnk-light);
            height: 40px;
            border-radius: 40px;
            text-align: center;
        }
    }
}

.challenge_enroll{
    
    .hd{
        z-index: 60;
        top:0;
        left:0;
        width:100%;
        .right_btn{
            position:absolute;
            right:20px;
            top:0px;
            height:64px;
            font-size:var(--f-theme-large);
        }
        .left_btn{
            position:absolute;
            left:20px;
            top:0px;
            height:64px;
            font-size:var(--f-theme-large);
        }
    }

    h3{
        font-size:var(--f-theme-title2);
        margin-bottom:20px;
        padding:20px;
        border:1px solid var(--c-lnk-light);

        input{
            border:0;
            width:100%;
            height:100%;
        }

        * {
            display: block;
        }

    }

    .date{
        padding:0 20px;

        li{
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        span{
            margin-right: 10px;
            padding: 7px 20px;
            border-radius: 15px;
            border:1px solid var(--c-lnk-light);
        }
    }

    .data{
        padding:20px;
    }

    .content_area{
        color:var(--c-theme-blue);
        display: block;
        line-height: 1.3;
        margin-bottom: 10px;;
    }
        
    .video_wrap{
        position: relative;

        #file {
            position: absolute;
            bottom: 10px;
            padding:0 20px;
            left:0;
            width:100%;
        }

    }


    textarea{
        border:1px solid var(--c-lnk-light);
        width:100%;
        height:300px;
        line-height: 1.4;
    }

    .enroll_option{
        padding: 10px 20px 0px;
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--c-lnk-light);
        align-items: center;

        >button{
            color: var(--c-theme-blue);
        }

        div button{
            margin-right: 10px;
            color: var(--c-lnk-basic);
        }
        div svg{
            margin-right: 5px;
        }
    }

    .link{
        background: var(--c-lnk-base);
        color:var(--c-lnk-basic);
        padding: 10px 20px;
        border-bottom: 1px solid var(--c-lnk-light);
    }

    .line{
        width:calc(100% - 40px);
        margin: 20px auto;
        border: 2px solid var(--c-lnk-light);
        padding: 20px;
        border-radius: 20px;
        
        > div {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            font-size:var(--f-theme-small);
        }

        div div button{
            font-size: var(--f-theme-tiny);
            color:var(--c-lnk-basic);
            margin-right: 5px;
        }

        ul{
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: flex-start
        }

        li {
            padding: 7px 10px;
            background: var(--c-lnk-base);
            border-radius: 5px;
            margin-bottom: 10px;
            display: flex;
            margin-right:10px;
        }

        li button{
            margin-left: 5px;
        }

        .num{
            background: var(--c-theme-red);
            width:16px;
            margin-right: 5px;
            text-align: center;
            line-height: 16px;
            font-size:var(--f-theme-tiny);
            border-radius: 50%;
            color:var(--c-lnk-white)
        }

    }

    .skill_pick{
        position: fixed;
        width:100%;
        overflow:auto;
        height: 100%;
        background: var(--c-lnk-white);
        top:0;
        left:0;
        right:0;
        margin: auto;
        max-width: 540px;
        z-index: 99;

        .cate{
            border-top:1px solid var(--c-lnk-light);
            overflow: auto;
            padding:10px;
            ul {
                display:flex;
                white-space: nowrap; 
            }

            li {
                margin-right:10px;
            }

            li.on button{
                color:var(--c-theme-dark);
                border-color:var(--c-theme-dark);
                font-weight: 700;
            }

            button{
                padding: 10px 30px;
                border:1px solid var(--c-lnk-light);
                border-radius: 6px;
                color:var(--c-lnk-basic);
            }    
        }


        .list li{
            font-size:var(--f-theme-small);
            padding: 10px 20px;
            border-bottom: 1px solid var(--c-lnk-light);
            display:flex;
            align-items:center;
            justify-content: space-between;
        }
        
        .list span span{
            padding:4px 10px;
        }

        .list {
            border-top: 1px solid var(--c-lnk-light);
            padding-bottom: 100px;
        }

        .list .btns{

        }

        .list .add_btn{
        }
        
        .close_btn{
            position: fixed;
            bottom: 0;
            padding:10px 0;
            width:100%;
            left:0;
            right:0;
            margin:0 auto;
            max-width: 540px;
            padding: 20px;
            background: var(--c-lnk-white);

            button{
                background: var(--c-lnk-black);
                color:var(--c-lnk-white);
                width:100%;
            }
        }

        input {
            margin:  0 auto;
            display: block;
            width:calc(100% - 40px);
            border:1px solid var(--c-lnk-light);
            height: 45px;
            border-radius: 20px;

            padding: 0 15px;
        }

        
        .tip{
            display: block;
            padding: 0 20px;;
            color:var(--c-theme-blue);
            margin-top:10px;
            font-size:var(--f-theme-tiny);
            margin-bottom: 20px;
        }

        .pick{
            padding: 0 20px 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
        }

        .pick li{
            margin-top: 10px;
            display: flex;
            margin-right: 10px;
            text-align: center;
            background: var(--c-lnk-light);
            padding: 8px 12px;
            border-radius: 10px;
        }

        .pick button{
            margin-left: 3px;
        }

        .num {
            background: var(--c-theme-red);
            color:var(--c-lnk-white);
            width:14px;
            height:14px;
            border-radius: 50%;
            margin-right:4px;
        }
        
    }


}


</style>