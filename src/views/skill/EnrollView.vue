<script lang="ts" setup>
    import Title from "@/components/common/Title.vue";
    import Radio from '@/components/frame/Radio.vue';
    import { onMounted, ref } from 'vue';
    import { useProgressStore } from '@/stores/progress';
    import { useStanceStore } from "@/stores/stance";    
    import router from '@/router';

    const stoProgress = useProgressStore();
    const show_option = ref<boolean>(true);
    const from_comment = ref<boolean>(true);
    const from_description = ref<string>('');
    const from_hide    = ref<boolean>(true);
    const stoStance = useStanceStore();
    
    let from_video   = ''

    onMounted(()=>{
        if(!stoProgress.enroll.info || stoProgress.enroll.type == ''){
            alert('잘못된 접근입니다.')
            router.push('/')
        } 
    })

    const handleFileUpload = (event:any) =>{
        const file = event.target.files[0];
        from_video = file;
    }

    const submitFrom = () =>{
        if(!from_video){
            alert('비디오를 등록해주세요!');
        }else{
            stoProgress.submitEnroll({
                description : from_description.value,
                openYn : from_hide.value ? 'Y': 'N',
                commentYn : from_comment.value ? 'Y': 'N',
                video : from_video,
            }).then(()=>{
                router.go(-1)
            });
        }
    }

</script>

<template>

    <main class="skill_enroll" v-if="stoProgress.enroll.info">
        <h2 class="sound_only">
            기술등록
        </h2>

        <header class="hd">
            <Title 
                title="기술등록" 
                :align="'center'" 
                :commentBack="'작성 중인 글이 삭제됩니다.\n작성을 취소할까요?'"
                :useCancel="true"
            ></Title> 
            <button class="right_btn" type="button" @click="submitFrom">
                등록 
            </button>
        </header>
        <article class="from">
            <h3>
                <strong>{{ stoProgress.enroll.info.korName}}</strong>
                <span class="option_name">
                    {{
                        stoProgress.enroll.info?.stance ? 
                        stoStance.getStanceName(stoProgress.enroll.info.stance) : ''
                    }}

                    {{
                        stoProgress.enroll.info?.rotate ? 
                        stoStance.getRrotation(stoProgress.enroll.info.stance,stoProgress.enroll.info?.rotate) == 'FrontSide' ? 
                        '프론사이드' : '백사이드'
                        : ''
                    }}

                    {{
                        stoProgress.enroll.info?.direction  && stoProgress.enroll.info?.direction !== stoProgress.enroll.info?.rotate? 
                        stoStance.getRrotation(stoProgress.enroll.info.stance,stoProgress.enroll.info?.direction) == 'FrontSide' ? 
                        '프론사이드' : '백사이드'
                        : ''
                    }}

                    {{
                        stoProgress.enroll.info?.direction !== stoProgress.enroll.info?.rotate 
                        && stoProgress.enroll.info?.direction && stoProgress.enroll.info?.rotate ? 
                        '바디베리얼' : ''
                    }}
                </span>
                <span>{{stoProgress.enroll.info?.aliasName}}</span>
            </h3>

            <div class="enroll_option">

                <span>
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                    10Mb 이하의 영상을 올려주세요.
                </span>
                
                <button type="button" @click="show_option = true">
                    옵션 수정
                    <font-awesome-icon :icon="['fas', 'chevron-right']" class="awesome-icons" />
                </button>
            </div>

            <div class="data">

                <div class="video_wrap">
                    <label for="file" class="video">
                        <font-awesome-icon :icon="['fas', 'upload']" />
                    </label>

                    <input type="file" ref="videoInput" accept="video/*" @change="handleFileUpload" id="file">  
                </div>
                
                <label for="content" class="content_area">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                    연습 방법을 기록해보세요. <br/>자세한 설명은 다른 보더들의 연습에도 도움이 됩니다.
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
                        <dl>
                            <dt>
                                공개설정
                            </dt>
                            <dd>
                                <Radio
                                    :labels="['공개','비공개']"
                                    :values="[true,false]"
                                    v-model="from_comment"
                                    :radio="true"
                                ></Radio>
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>
                                댓글
                            </dt>
                            <dd>
                                <Radio
                                    :labels="['허용','비허용']"
                                    :values="[true,false]"
                                    v-model="from_hide"
                                    :radio="true"
                                ></Radio>
                            </dd>
                        </dl>
                    </li>
                </ul>

                <button type="button" class="frame_btn02" @click="show_option = false">적용</button>
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
}

.skill_enroll{
    h3{
        font-size:var(--f-theme-title2);
        margin-bottom:20px;
        padding:20px;
        border:1px solid var(--c-lnk-light);
        * {
            display: block;
        }

        span{
            margin-top:10px;
            font-size:var(--f-theme-small);
            color:var(--c-lnk-basic)
        }

        .option_name{
            font-size:var(--f-theme-tiny)
        }
    }
    .data{
        padding:20px;
    }

    .video{
        display: flex;
        height: 200px;
        width: 100%;
        background: var(--c-lnk-light);
        border-radius: 30px;
        margin-bottom: 30px;
        font-size: 19px;
        align-items: center;
        justify-content: space-around;
    }

    .content_area{
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
        padding: 0 20px;
        display: flex;
        color: var(--c-theme-blue);
        justify-content: space-between;
    }

}


</style>