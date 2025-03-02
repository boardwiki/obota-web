<script setup lang="ts">
    import Feed from '@/components/skill/Feed.vue';
    import Comment from '@/components/common/CommentFix.vue';
    import Select from '@/components/frame/Select.vue';
    import Empty from '@/components/common/Empty.vue';

    import router from '@/router';
    import {onMounted, ref } from 'vue';
    import axios from 'axios';

    import { useDancingStore } from '@/stores/dancing';
    import { useStanceStore} from '@/stores/stance';
    import { useProgressStore } from '@/stores/progress';
    import { useAuthStore } from '@/stores/auth';
    import { useProfileStore } from '@/stores/profile';
    import { useFeedStore } from '@/stores/feed';
    import { useRouteStore } from '@/stores/router';

    const stoFeed = useFeedStore();
    const stoProfile = useProfileStore();
    const stoDancing = useDancingStore();    
    const stoStance = useStanceStore();
    const stoProgress = useProgressStore();
    const sort = ref<string>('3');
    const pick = ref<number>(0);
    const props = defineProps<{
        id: string
    }>();
    const comment = ref<boolean>(false);
    const myVideo = ref<boolean>(false);
    const stance = ref<string[]>([]);
    const boardSide   = ref<string[]>([]);
    const footPosition   = ref<string[]>([]);
    const carving   = ref<string[]>([]);
    const myVideosUrl = ref<string[]>([]); 
    const checkFavorite = ref<boolean>(false);
    const tip01 = ref<boolean>(false);
    const tip02 = ref<boolean>(false);
    const tip03 = ref<boolean>(false);
    const tip04 = ref<boolean>(false);
    onMounted(async() => {
        await window.scrollTo({top: 0});
        await stoDancing.getSaveCategory();       
        await stoDancing.getDetail(props.id).then(()=>{
            if(stoDancing.detail.length < 1){
                alert('잘못된 접근입니다.');
                router.go(-1);
            }
        })
        stance.value = [...new Set(stoDancing.detail.map(item => item.stance))];
        boardSide.value = [...new Set(stoDancing.detail.map(item => item.boardSide))];
        carving.value = [...new Set(stoDancing.detail.map(item => item.carving))];
        footPosition.value = [...new Set(stoDancing.detail.map(item => item.footPosition))];

        stoDancing.usersProgressInfo = [];
        await stoDancing.resetProgress();
        await stoDancing.myProgress(stoDancing.detail[pick.value].id,stoDancing.detail[pick.value].categoryId);
        await getProgress();
        await checkFavorites();
        await window.addEventListener('scroll', handleScroll);
    });

    const stanceChage = (stance:string) =>{
        chagePick(
            stance,
            stoDancing.detail[pick.value].boardSide,
            stoDancing.detail[pick.value].carving,
            stoDancing.detail[pick.value].footPosition
        );
    }

    const sideChage = (side:string) =>{
        chagePick(
            stoDancing.detail[pick.value].stance,
            side,
            stoDancing.detail[pick.value].carving,
            stoDancing.detail[pick.value].footPosition
        );
    }

    const carvingChage = (carving:string) =>{
        chagePick(
            stoDancing.detail[pick.value].stance,
            stoDancing.detail[pick.value].boardSide,
            carving,
            stoDancing.detail[pick.value].footPosition
        );
    }

    const footPositionChage = (foot:string) =>{
        chagePick(
            stoDancing.detail[pick.value].stance,
            stoDancing.detail[pick.value].boardSide,
            stoDancing.detail[pick.value].carving,
            foot
        );
    }

    const chagePick = async(stance:string,side:string,carving:string,foot:string) => {
        const index = stoDancing.detail.findIndex(item => 
            item.stance === stance && 
            item.boardSide === side &&
            item.carving === carving &&
            item.footPosition === foot
        );
        pick.value =index;
        await window.removeEventListener('scroll', handleScroll);
        await stoDancing.myProgress(stoDancing.detail[pick.value].id,stoDancing.detail[pick.value].categoryId);
        await getProgress();
        myVideo.value = false;
    }
    const enroll = async() => {
        if(stoDancing.myProgressInfo.length > 0){
            if(stoDancing.myProgressInfo[0].status == null || stoDancing.myProgressInfo[0].status == 'WAIT'){
                if(confirm('승인대기중입니다. 영상을 재업로드 하겠습니까? \n확인을 누를시 기존인증은 제거됩니다.')){
                    stoProgress.waitPrgressRemove(stoDancing.myProgressInfo[0].id).then((data)=>{
                        console.log(data);
                        if(data){
                            stoProgress.setEnroll('foot_trick',stoDancing.detail[pick.value]);
                            router.push('/skill/enroll');
                        }
                    })
                }
            }else if(stoDancing.myProgressInfo[0].status == 'APPROVED'){
                alert('등록완료 됐습니다.')
            }else{
                await stoProgress.setEnroll('dancing',stoDancing.detail[pick.value])
                await router.push('/skill/enroll')
            }
        }else{
            await stoProgress.setEnroll('dancing',stoDancing.detail[pick.value])
            await router.push('/skill/enroll')
        }
    }

    const change_video = async()=>{
        myVideo.value = myVideo.value ? false : true;
        if(myVideo.value && stoDancing.myProgressInfo.length > 0){

            if(!myVideosUrl.value[pick.value]){
                const stoAuth = useAuthStore();
            
                await axios.get(`https://api.longboard.monster/api/v1/files/${stoDancing.myProgressInfo[0].videoId}/url`,{
                    headers : {
                        Authorization: `Bearer ${stoAuth.accessToken}`
                    }
                }).then((res)=>{
                    myVideosUrl.value[pick.value] = res.data.data;
                })
            }
        }
    }

    const back = () =>{
        const stoRoute = useRouteStore();

        if (stoRoute.routeHistory[stoRoute.routeHistory.length-1].from == "/community/feed")
            router.go(-1)
        else
            router.push('/skill/dancing')
    }

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

    const checkFavorites = async()=>{
        checkFavorite.value = stoDancing.favorites.includes(props.id);
    }

    const handleFavorite = ()=>{
        if(checkFavorite.value){
            stoDancing.deleteFavorites(props.id);
        }else{
            stoDancing.setFavorites(props.id);
        } 

        checkFavorite.value = !checkFavorite.value;
    }

    const getComment = async(id:number) => {
        await stoFeed.getComments(id).then(()=>{
            comment.value = true;
        });
    }

    const closeComment = () => {
        stoFeed.resetComments().then(()=>{
            comment.value = false;
        });
    }

    const handleScroll = () => {
        window.removeEventListener('scroll', handleScroll);

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            getProgress().then(() => {
                window.addEventListener('scroll', handleScroll);
            });
        } else {
            window.addEventListener('scroll', handleScroll);
        }
    };

    async function getProgress(){
        await stoDancing.allUserProgress(pick.value,'dancing',stoDancing.detail[pick.value].id,stoDancing.detail[pick.value].categoryId);
        if(stoDancing.usersProgressInfo[pick.value]){
            const userIds = await stoDancing.usersProgressInfo.map(feed => feed.userId);
            await stoProfile.fetchProfiles(userIds);
        }
    }

    const videoPlayer = ref<HTMLVideoElement|null>();
    const togglePlayPause = () => {
        if(videoPlayer.value){
            if (videoPlayer.value.paused) {
                videoPlayer.value.play();
            } else {
                videoPlayer.value.pause();
            }
        }
    };

</script>

<template>

    <main class="skill_detail" v-if="stoDancing.detail.length > 0">
        
        <header class="hd">
            <div class="title">
                <span class="tit">
                    {{
                        stoDancing.detail[pick].engName
                    }}
                </span>

                <button class="btn_back"  @click="back()" type="button">
                        <font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" />
                </button>
            </div>

            <button class="favorite_btn" @click="handleFavorite" :class="checkFavorite ? 'on' : ''">
                <font-awesome-icon :icon="[checkFavorite ? 'fa' : 'far', 'heart']" class="awesome-icons"  />
            </button>
        </header>


        <section>
            <h2 class="sound_only">댄싱 정보</h2>

            <ul class="video_content">
                <li v-if="!myVideo && stoDancing.detail[pick].youtubeLink" class="sample">
                    <div class="shorts-container">
                        <iframe width="480" height="560" class="shorts-iframe" :src="`https://www.youtube.com/embed/${stoDancing.detail[pick].youtubeLink}?rel=0`" allowfullscreen>
                        </iframe>
                    </div>
                </li>
                <li v-if="myVideo && stoDancing.myProgressInfo.length > 0" class="my_video_content">
                    <video  ref="videoPlayer" autoplay muted :src="myVideosUrl[pick]"></video>
                    <button type="button" class="play_video_btn" @click="togglePlayPause"></button>
                    <div class="con">
                        <p>
                            {{
                                stoDancing.myProgressInfo[0].description
                            }}
                        </p>
                        <div class="btm">
                            <span>{{stoDancing.myProgressInfo[0].createDate}}</span>
                            <div>
                                <button type="button" v-if="stoDancing.myProgressInfo[0].commentYn=='Y'" @click="getComment(stoDancing.myProgressInfo[0].id)">
                                    댓글 
                                    <font-awesome-icon :icon="['far', 'comment-dots']" class="awesome-icons" />
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul> 

            <div class="video_btn"  v-if="stoDancing.myProgressInfo.length > 0">
                <button class="btn_vd" @click="change_video">
                    {{
                        myVideo ? '예시 영상 보기' : '내 영상 보기'
                    }}
                </button>
            </div>

            <article class="info">
                <h3>
                    <strong>
                        {{stoDancing.detail[pick].korName }}
                    </strong>
                    
                    <span>
                        {{stoStance.getStanceName(stoDancing.detail[pick].stance) }}
                                            
                        {{
                            stoStance.getRrotation(stoDancing.detail[pick].stance,stoDancing.detail[pick].rotate) ? 
                            stoStance.getRrotation(stoDancing.detail[pick].stance,stoDancing.detail[pick].rotate) == 'FrontSide' ? '프론사이드' : '백사이드'
                            : ''
                        }}

                        {{
                            stoDancing.detail[pick].footPosition ?
                            stoDancing.detail[pick].footPosition == 'FRPONT' ? '프론' : '백'
                            : ''
                        }}풋


                        {{
                            stoDancing.detail[pick].carving ?
                            stoDancing.detail[pick].carving == 'HEEL' ? '힐' : '토'
                            : ''
                        }}카빙
                        
                        {{stoDancing.detail[pick].korName }}
                    </span>
                    <span class="level_info"  :class="stoDancing.detail[pick].difficulty">{{getLevel(stoDancing.detail[pick].difficulty)}}</span>
                </h3>

                <ul>
                    <li v-if="stance.length > 0 && stance[0] !== '' && stance[0] !== 'none'">
                        <dl>
                            <dt><strong>스탠스</strong></dt>
                            <dd>
                                <ul class="skil_info_box " :class="`col${stance.length}`">
                                    <li v-for="name in stance" :key="name" :class="stoDancing.detail[pick].stance == name ? 'on' : ''">
                                        <button @click="stanceChage(name)">
                                            {{stoStance.getStanceName(name)}}
                                        </button>
                                    </li>
                                </ul>
                            </dd>
                        </dl>

                        
                        <div class="tip" >
                            <button type="button" @click="tip01 = !tip01">
                                <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                                팁{{tip01 ? '닫기':'보기'}}
                            </button>
                            <p v-if="tip01">
                                주행자의 기본 자세와 반대 자세 스위치 2개로 정의합니다. <br/>
                                <span style="color:var(--c-theme-red)">현재는 뒤로 주행하는 스탠스는 따로 정의 하지않았습니다!</span>
                            </p>
                        </div>

                    </li>

                    <li>
                        <dl>
                            <dt><strong>몸회전 방향</strong></dt>
                            <dd>
                                <ul class="skil_info_box " :class="`col${boardSide.length}`" >
                                    <li v-for="name in boardSide" :key="name" :class="stoDancing.detail[pick].boardSide == name ? 'on' : ''">
                                        <button @click="sideChage(name)">
                                            {{
                                                stoStance.getRrotation(stoDancing.detail[pick].stance,name) == 'FrontSide' ? 
                                                '프론사이드' : '백사이드'
                                            }}
                                        </button>
                                    </li>
                                </ul>
                            </dd>
                        </dl>

                        <div class="tip" >
                            <button type="button" @click="tip02 = !tip02">
                                <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                                팁{{tip02 ? '닫기':'보기'}}
                            </button>
                            <p v-if="tip02">
                                보드의 주행방향에서 처다보는 사람의 기준으로<br/>
                                주행자의 어깨가 열리면 프론사이드, 어깨가 닫히면 백사이드라고 합니다.<br/>
                            </p>
                        </div>

                    </li>


                  

                    <li>
                        <dl>
                            <dt><strong>풋</strong></dt>
                            <dd>
                                
                                <ul class="skil_info_box " :class="`col${boardSide.length}`" >
                                    <li v-for="name in footPosition" :key="name" :class="stoDancing.detail[pick].footPosition == name ? 'on' : ''">
                                        <button @click="footPositionChage(name)">
                                            {{
                                                stoStance.getFootPosition(name) == 'FRONT' ? 
                                                '앞발' : '뒷발'
                                            }}
                                        </button>
                                    </li>
                                </ul>
                            </dd>
                        </dl>

                        <div class="tip" >
                            <button type="button" @click="tip04 = !tip04">
                                <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                                팁{{tip04 ? '닫기':'보기'}}
                            </button>
                            <p v-if="tip04">
                                스텝이 시작될때 중심이 되는 발입니다. <br/>
                                <span style="color:var(--c-theme-red)">앞발, 뒷발에 따라 같은 스텝이여도 보드의 제어 방법과 난이도가 차이가 납니다!</span>
                            </p>
                        </div>
                    </li>

                    <li>
                        <dl>
                            <dt><strong>카빙</strong></dt>
                            <dd>
                                <ul class="skil_info_box " :class="`col${boardSide.length}`" >
                                    <li v-for="name in carving" :key="name" :class="stoDancing.detail[pick].carving == name ? 'on' : ''">
                                        <button @click="carvingChage(name)">
                                            {{
                                                stoStance.getCarviing(name) == 'HEEL' ? 
                                                '힐' : '토'
                                            }}
                                        </button>
                                    </li>
                                </ul>
                            </dd>
                        </dl>

                        <div class="tip" >
                            <button type="button" @click="tip03 = !tip03">
                                <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                                팁{{tip03 ? '닫기':'보기'}}
                            </button>
                            <p v-if="tip03">
                                몸전체를 이용하여 방향을 전환해주는 기술입니다. 
                                <br/>
                                힐 : 뒤꿈치에 힘이 들어갑니다. 회전방향은 프론사이드 몸이 열립니다.<br>
                                토 : 발가락에 힘이 들어갑니다. 회전방향은 백사이드로 몸이 닫힙니다.
                            </p>
                        </div>
                    </li>
                    
                    <li class="not_btn">
                        <dl>
                            <dt><strong>몸 회전 각도</strong></dt>
                            <dd class="skil_info_box single">
                                {{stoDancing.detail[pick].bodyDegree}}
                            </dd>
                        </dl>
                    </li>

                </ul>
            </article>

            <article class="feed">

                <h3>
                    <strong>다른 보더들의 영상</strong>
                    <span>
                        {{
                            (stoDancing.usersProgressTotal / stoProfile.allUserCnt * 100).toFixed(2) + '%' 
                        }}
                        ({{stoDancing.usersProgressTotal}}명)의 보더가 이 기술을 성공했어요!
                    </span>
                </h3>
                
                <div class="sort" v-if="false">
                        <Select
                            :labels="['인기순','댓글수','최신순']"
                            :values="['1','2','3']"
                            width="120px"
                            height="30px"
                            v-model="sort"
                        ></Select>
                </div>
                
                <ul class="list">
                    <li v-for="(item,id) in stoDancing.usersProgressInfo" :key="id">
                        <Feed :item="{
                            id : item.id,
                            description : item.description,
                            userId : item.userId,
                            videoId : item.videoId,
                            categoryType :item.categoryType,
                            skillId : item.skillId,
                            likeCount : item.likeCount,
                            commentYn : item.commentYn,
                            commentCount : item.commentCount,
                            likeYn : item.likeYn
                        }"
                        @openComment="(id)=>{getComment(id)}"
                        :titleUse="false"
                        :userInfo="stoProfile.list.find((user)=>user.id === item.userId)"
                        type="foot-trick"></Feed>
                    </li>

                    <li v-if="!stoDancing.usersProgressInfo[pick]">
                        <Empty msg="기술이 존재하지 않습니다."></Empty>
                    </li>
                </ul>


            </article>

            <article style="position: relative;z-index: 999;">
                <Comment v-if="comment" :comments="stoFeed.comments" @closeComment="()=>{closeComment()}"></Comment>
            </article>

            <div class="frame_btn_from">
                <button class="btn01" @click="handleFavorite" :style="{color:checkFavorite ? 'var(--c-theme-red)':''}">
                    <font-awesome-icon :icon="[checkFavorite ? 'fa':'far', 'heart']" class="awesome-icons"  />
                </button>
                <button @click="enroll" class="btn02">
                    {{
                        stoDancing.myProgressInfo[0] ? 
                        stoDancing.myProgressInfo[0].status == 'APPROVED' ? '등록 완료' :
                        stoDancing.myProgressInfo[0].status == 'WAIT' ? '승인 대기중' 
                        : '기술 등록하기'
                        : '기술 등록하기'
                    }}
                </button>
            </div>

        </section>
    </main>
</template>


<style lang="scss" scoped>

</style>