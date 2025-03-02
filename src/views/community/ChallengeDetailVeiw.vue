<script setup lang="ts">
    import Title from "@/components/common/Title.vue";
    import router from '@/router';
    import JoinUser from '@/components/common/JoinUser.vue';
    import SettingBtns from "@/components/common/SettingBtns.vue";
    import Empty from "@/components/common/Empty.vue";
    import { useChallengeStore } from '@/stores/challenge';
    import { useProfileStore } from "@/stores/profile";
    import { useAuthStore } from "@/stores/auth";
    import { onMounted,ref } from 'vue';

    const stoAuth = useAuthStore();
    const stoChallenge = useChallengeStore();
    const stoProfile = useProfileStore();
    const show_join = ref<boolean>(false);

    const props = defineProps<{ 
        id : number
    }>();

    onMounted(async()=>{
        await stoChallenge.getDetail(props.id).then(()=>{
            if(!stoChallenge.detail){
                alert('잘못된 접근입니다.')
                router.go(-1);
            }

            //console.log(stoChallenge.detail)
            //stoProfile.fetchProfiles();
        })


    })

    const challengeJoin = () =>{
        const link = prompt('챌린지 참여를 위한 영상 URL를 입력해주세요.');
        stoChallenge.setJoin(stoChallenge.detail.id ,String(link))
    }

    const calculateDday = (targetDate:string)=>{
        // 현재 날짜와 시간
        const currentDate: Date = new Date();

        // 목표 날짜와 시간을 ISO 8601 형식의 문자열로부터 Date 객체로 파싱
        const targetDateObj: Date = new Date(targetDate);

        // 두 날짜의 차이 계산 (밀리초 단위)
        const timeDiff: number = targetDateObj.getTime() - currentDate.getTime();

        // 밀리초를 일로 변환하여 날짜 차이 계산
        const daysDiff: number = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // D-day 계산
        let dday: string = '';
        if (daysDiff > 0) {
            dday = 'D-' + daysDiff;
        } else if (daysDiff === 0) {
            dday = 'D-day';
        } else {
            dday = '마감';
            //dday = 'D+' + Math.abs(daysDiff);
        }

        return dday;
    }

    function isYouTubeVideo(url:string) {
        // 유투브 동영상 URL인지 확인하는 함수
        return url.includes('youtube.com') || url.includes('youtu.be');
    }
    
    function getYouTubeEmbedUrl(url:string) {
        // 유투브 동영상의 임베드 URL을 반환하는 함수
        const videoId = getYouTubeVideoId(url);
        return `https://www.youtube.com/embed/${videoId}`;
    }
    function getYouTubeVideoId(url:string) {
        // 유투브 동영상의 videoId를 추s출하는 함수
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(youtubeRegex);
        return match ? match[1] : null;
    }
    async function showJoin(){
        show_join.value=true;
        await stoChallenge.getJoin().then(()=>{
            if(stoChallenge.join.length > 0){
                const userIds =  stoChallenge.join.map((item)=>item.userId)
                stoProfile.fetchProfiles(userIds)
            }
        });
    }


</script>

<template>
    <main class="challenge_detail" v-if="stoChallenge.detail">
        <Title :title="stoChallenge.detail.title" :align="'center'" :use-cancel="true"></Title>
        <ul>
            <li class="before">
                <div class="tit">
                    <strong>
                        {{stoChallenge.detail.title}} 
                    </strong>
                    <div class="setting_wrap">
                        <SettingBtns :id="stoChallenge.detail.id" type="challenge"/>
                    </div>
                         
                    <ul class=date>
                        <li>
                            <span class="frame_cate_btn02">시작</span>
                            {{stoChallenge.detail.startDate}}
                        </li>
                        <li>
                            <span class="frame_cate_btn02">마감</span>
                            {{stoChallenge.detail.endDate}}
                            <em>{{calculateDday(stoChallenge.detail.endDate)}}</em>
                        </li>
                    </ul>

                </div>

                <p class="txt">
                    {{stoChallenge.detail.description}}
                </p>

                <div class="list" v-if="false">
                    <span>첼린지 라인</span>
                    <ul>
                        <li v-for="id in 5" :key="id">
                            <router-link to="/skill">
                                <span>Skill Name</span>
                            </router-link>
                            <font-awesome-icon  v-if="id !== 5" :icon="['fas', 'chevron-right']" class="awesome-icons" />
                        </li>
                    </ul>
                </div>

                <div class="video" v-if="stoChallenge.detail.challengeUrl">
                    <span>참고영상</span>
                    <template v-if="isYouTubeVideo(stoChallenge.detail.challengeUrl)">
                        <iframe width="440" height="490" style="width:100%;" class="shorts-iframe"  :src="getYouTubeEmbedUrl(stoChallenge.detail.challengeUrl)" allowfullscreen frameborder="0" ></iframe>
                    </template>
                    <template v-else>
                        <a :href="stoChallenge.detail.challengeUrl" target="_blank">
                            <strong>
                                <font-awesome-icon :icon="['fab', 'youtube']" />
                                첼린지영상</strong>
                            <span>
                                보러가기
                                <font-awesome-icon :icon="['fas', 'chevron-right']" class="awesome-icons" />
                            </span> 
                        </a>
                    </template>
                </div>
            </li>
        </ul>
         
        <div class="join_list sub_fixed" v-if="show_join">
            <button class="close" @click="show_join = false"><span class="sound_only">닫기</span></button>
            <div class="sub_con">
                <button class="close" @click="show_join = false">
                    <span class="sound_only">닫기</span>
                </button>

                <strong class="tit">
                    참여현황 
                </strong>

                <ul>
                    <li v-for="(item,id) in stoChallenge.join" :key="id"> 
                        <JoinUser
                            :join-info="item"
                            :user-info="stoProfile.list.find((user)=>user.id === item.userId)"
                        ></JoinUser>
                    </li>

                    <li v-if="stoChallenge.join.length < 1" class="empty">
                        <Empty msg="참여자가 없습니다"></Empty>
                    </li>
                </ul>
            </div>
        </div>

        <div class="frame_btn_from btn_from">
            <button type="button" @click="showJoin" :class="calculateDday(stoChallenge.detail.endDate) == '마감'? 'full' : ''">
                <font-awesome-icon :icon="['far', 'circle-check']" />
                참여현황
            </button>

            <button type="button" @click="challengeJoin()" v-if="calculateDday(stoChallenge.detail.endDate) !== '마감'">
                <font-awesome-icon :icon="['fas', 'circle-plus']" />
                참여하기
            </button>
        </div>

       
        
    </main> 
</template>

<style lang="scss" scoped>
.challenge_detail{

    > ul{
        border-top:1px solid var(--c-lnk-light)
    }

    .tit{
        font-size:var(--f-theme-large);
        width:100%;
        border-bottom: 1px solid var(--c-lnk-light);
        padding: 30px 20px 20px;

        > strong{
            font-size:var(--f-theme-title2);
            line-height: 1.3;
            display:block;
            margin-bottom:20px;
        }

        .date li {
            display:flex;
            font-size:var(--f-theme-tiny);
            justify-content: flex-start;
            align-items: center;
            flex-wrap: nowrap;
            margin-top:5px;
            flex-direction: row;
        }

        .date em{
            color:var(--c-theme-red);
            margin-left:5px;
        }

        .date span{
            padding:5px 10px;
            margin-right:10px;
        }


        > * {
            display:block;
        }
    }

    .txt{
        color:var(--c-lnk-black);
        padding:20px;
    }

    .join_list{
        z-index:999;
        .from{
            padding:20px;
        }
        .from button{
            width:100%;
            background: var(--c-lnk-black);
            color: var(--c-lnk-white);
        }

        ul{
            max-height: calc(100% - 193px);
            overflow: auto;
            min-height: 300px;
            padding-bottom: 20px;
        }

        .empty{
            padding-bottom: 20px;
        }
    }

    .before{
        margin: 0 auto;
        position: relative;

        .setting_wrap{
            position: absolute;
            right:20px;
            top:35px;
        }
        
        .list{
            padding: 0 20px;
            margin-top:20px;
        }

        .list > span{
            display: block;
            font-size:var(--f-theme-small);
            color:var(--c-lnk-black);
            margin-bottom:20px;
        }

        .list ul{
            border: 1px solid var(--c-lnk-basic);
            border-radius: 15px;
            display: flex;
            padding:20px 10px 10px;
            flex-direction: row;
            flex-wrap: wrap;
        }

        .list a {
            background: var(--c-lnk-light);
            padding:10px 20px;
            align-items: center;
            display: inline-block;
            border-radius: 10px;
        }

        .list li{
            margin: 0 10px 10px 0 ;
            display: flex;
            align-items: center; 
        }

        .list svg{
            color: var(--c-lnk-basic);
            margin-left:10px;
        }

        .video > span{
            display: block;
            font-size:var(--f-theme-small);
            color:var(--c-lnk-black);
            margin-bottom:20px;
        }

        .video{
            margin:  20px 0 10px;
            padding: 0 20px;
        }

        .video a{
            display: block;
            border:1px solid var(--c-lnk-light);
            background: var(--c-lnk-base);
            color:var(--c-lnk-black);
            padding:20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            border-radius: 10px;
        }

        .video strong{
            font-size:var(--f-theme-regular);
            display: flex;
            align-items: center;
        }
        
        .video strong svg {
            font-size:var(--f-theme-title1);
            margin-right:10px;
        }

        .video a span{
            display: flex;
            align-items: center;
            font-size: var(--f-theme-small);
            color:var(--c-theme-blue)
        }
        .video a span svg {
            font-size:var(--f-theme-small);
            margin-left:5px;
        }
    }
 
    .btn_from{
        button{
            width:48%;
        }
        .full{
            width: 100%;
        }
    }
}


</style>