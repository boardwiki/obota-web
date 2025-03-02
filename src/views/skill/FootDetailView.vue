<script setup lang="ts">
    import Feed from '@/components/skill/Feed.vue';
    import Comment from '@/components/common/CommentFix.vue';
    import Select from '@/components/frame/Select.vue';
    import Empty from '@/components/common/Empty.vue';
    import Stance from '@/components/basic/Stance.vue';
    import Side from '@/components/basic/Side.vue';

    import router from '@/router';
    import { ref,onMounted} from 'vue';
    import axios from 'axios';
  
    import { useFootTrcikStore } from '@/stores/foot';
    import { useStanceStore} from '@/stores/stance';
    import { useProgressStore } from '@/stores/progress';
    import { useAuthStore } from '@/stores/auth';
    import { useProfileStore } from '@/stores/profile';
    import { useFeedStore } from '@/stores/feed';
    import { useRouteStore } from '@/stores/router';

    const stoFeed = useFeedStore();
    const stoProfile = useProfileStore();
    const stoFoot = useFootTrcikStore();    
    const stoStance = useStanceStore();
    const stoProgress = useProgressStore();
    const stoAuth = useAuthStore();

    const sort = ref<string>('3');
    const pick = ref<number>(0);
    const props = defineProps<{ 
        id: string
    }>();
    const comment = ref<boolean>(false);
    const tip01 = ref<boolean>(false);
    const tip02 = ref<boolean>(false);
    const tip03 = ref<boolean>(false);
    const myVideo = ref<boolean>(false);
    const stance = ref<string[]>([]);
    const boardSide   = ref<string[]>([]);
    const myVideosUrl = ref<string[]>([]); 

    const checkFavorite = ref<boolean>(false);
    onMounted(async() => {
        await window.scrollTo({top: 0});
        await stoFoot.getSaveCategory();
        await stoFoot.getDetail(props.id).then(()=>{
            if(stoFoot.detail.length < 1){
                alert('잘못된 접근입니다.');
                router.go(-1);
            }
        })
        stance.value = [...new Set(stoFoot.detail.map(item => item.stance))];
        boardSide.value = [...new Set(stoFoot.detail.map(item => item.rotate))];
        await stoFoot.resetProgress();
        await stoFoot.myProgress(stoFoot.detail[pick.value].id,stoFoot.detail[pick.value].categoryId);
        await getProgress();
        await checkFavorites();
        await window.removeEventListener('scroll', handleScroll);
        await window.addEventListener('scroll', handleScroll);
    });

    const stanceChage = (stance:string) =>{
        chagePick(stance,stoFoot.detail[pick.value].rotate);
    }

    const sideChage = (side:string) =>{
        chagePick(stoFoot.detail[pick.value].stance,side);
    }

    const chagePick = async(stance:string,side:string) => {
        const index = stoFoot.detail.findIndex(item => item.stance === stance && item.rotate === side);
        pick.value =index;
      
        await window.removeEventListener('scroll', handleScroll);
        await stoFoot.myProgress(stoFoot.detail[pick.value].id,stoFoot.detail[pick.value].categoryId);
        await getProgress();
        myVideo.value = false;
    }

    const enroll = async() => {
        if(stoFoot.myProgressInfo.length > 0){
            if(stoFoot.myProgressInfo[0].status == null || stoFoot.myProgressInfo[0].status == 'WAIT'){
                if(confirm('승인대기중입니다. 영상을 재업로드 하겠습니까? \n확인을 누를시 기존인증은 제거됩니다.')){
                    stoProgress.waitPrgressRemove(stoFoot.myProgressInfo[0].id).then((data)=>{
                        console.log(data);
                        if(data){
                            stoProgress.setEnroll('foot_trick',stoFoot.detail[pick.value]);
                            router.push('/skill/enroll');
                        }
                    })
                }
            }else if(stoFoot.myProgressInfo[0].status == 'APPROVED'){
                alert('등록완료 됐습니다.')
            }else{
                await stoProgress.setEnroll('foot_trick',stoFoot.detail[pick.value])
                await router.push('/skill/enroll')
            }
        }else{
            await stoProgress.setEnroll('foot_trick',stoFoot.detail[pick.value])
            await router.push('/skill/enroll')
        }
    }

    const change_video = async()=>{
        myVideo.value = myVideo.value ? false : true;
        if(myVideo.value && stoFoot.myProgressInfo.length > 0){

            if(!myVideosUrl.value[pick.value]){
            
                await axios.get(`https://api.longboard.monster/api/v1/files/${stoFoot.myProgressInfo[0].videoId}/url`,{
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
            router.push('/skill/foot')
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
        checkFavorite.value = stoFoot.favorites.includes(props.id);
    }

    const handleFavorite = ()=>{
        if(checkFavorite.value){
            stoFoot.deleteFavorites(props.id);
        }else{
            stoFoot.setFavorites(props.id);
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
        await stoFoot.allUserProgress(pick.value,'foot_trick',stoFoot.detail[pick.value].id,stoFoot.detail[pick.value].categoryId);
        if(stoFoot.usersProgressInfo){
            const userIds = await stoFoot.usersProgressInfo.map(feed => feed.userId);
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

    <main class="skill_detail" v-if="stoFoot.detail.length > 0">
        

        <header class="hd">
            <div class="title">
                <span class="tit">
                    {{
                        stoFoot.detail[pick].engName
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
            <h2 class="sound_only">트릭 정보</h2>

            <ul class="video_content">
                <li v-if="!myVideo && stoFoot.detail[pick].youtubeLink" class="sample">
                    <div class="shorts-container">
                        <iframe width="480" height="560" class="shorts-iframe" :src="`https://www.youtube.com/embed/${stoFoot.detail[pick].youtubeLink}?rel=0`" allowfullscreen>
                        </iframe>
                    </div>
                </li>
                <li v-if="myVideo && stoFoot.myProgressInfo.length > 0" class="my_video_content">
                    <video  ref="videoPlayer" autoplay muted :src="myVideosUrl[pick]">
                    </video>
                    <button type="button" class="play_video_btn" @click="togglePlayPause"></button>


                    <div class="con">
                        <p>
                            {{
                                stoFoot.myProgressInfo[0].description
                            }}
                        </p>
                        <div class="btm">
                            <span>{{stoFoot.myProgressInfo[0].createDate}}</span>
                            <div>
                                <button type="button" v-if="stoFoot.myProgressInfo[0].commentYn=='Y'" @click="getComment(stoFoot.myProgressInfo[0].id)">
                                    댓글 
                                    <font-awesome-icon :icon="['far', 'comment-dots']" class="awesome-icons" />
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul> 

            <div class="video_btn"  v-if="stoFoot.myProgressInfo.length > 0">
                <button class="btn_vd" @click="change_video">
                    {{
                        myVideo ? '예시 영상 보기' : '내 영상 보기'
                    }}
                </button>
            </div>

            <article class="info">
                <h3>
                    <strong>
                        {{stoFoot.detail[pick].korName }}
                    </strong>
                    <span>
                        {{stoFoot.detail[pick].stance ?stoStance.getStanceName(stoFoot.detail[pick].stance)  : ''}}
                        {{
                            stoFoot.detail[pick].rotate ? 
                            stoStance.getRrotation(stoFoot.detail[pick].stance,stoFoot.detail[pick].rotate) == 'FrontSide' ? '프론사이드' : '백사이드'
                            : ''
                        }}
                        {{stoFoot.detail[pick].korName }}
                    </span>
                    <span  class="level_info" :class="stoFoot.detail[pick].difficulty">{{getLevel(stoFoot.detail[pick].difficulty)}}</span>
                </h3>


                <ul>
                    <li>
                        <dl>
                            <dt><strong>스탠스</strong></dt>
                            <dd>
                                <ul class="skil_info_box " :class="`col${stance.length}`">
                                    <li v-for="name in stance" :key="name" :class="stoFoot.detail[pick].stance == name ? 'on' : ''">
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
                                <Stance :stance="stoAuth.info?.stance"></Stance>
                            </p>
                        </div>
                    </li>
                    
                    <li v-if="stoFoot.detail[pick].rotate">
                        <dl>
                            <dt><strong>보드 방향</strong></dt>
                            <dd>
                                <ul class="skil_info_box " :class="`col${boardSide.length}`" >
                                    <li v-for="name in boardSide" :key="name" :class="stoFoot.detail[pick].rotate == name ? 'on' : ''">
                                        <button @click="sideChage(name)">
                                            {{
                                                stoStance.getRrotation(stoFoot.detail[pick].stance,name) == 'FrontSide' ? 
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
                                <Side :stance="stoAuth.info?.stance"></Side>
                            </p>
                        </div>
                    </li>
                    
                    <li class="not_btn">
                        <dl>
                            <dt><strong>보드 회전 각도</strong></dt>
                            <dd class="skil_info_box single">
                                {{stoFoot.detail[pick].boardDegree}}
                            </dd>
                        </dl>
                    </li>

                    <li class="not_btn" v-if="stoFoot.detail[pick].direction">
                        <dl>
                            <dt><strong>몸 방향</strong></dt>
                            <dd class="skil_info_box single">
                                {{
                                    stoStance.getRrotation(stoFoot.detail[pick].stance,stoFoot.detail[pick].direction) == 'FrontSide' ? 
                                    '프론사이드' : '백사이드'
                                }}
                            </dd>
                        </dl>
                    </li>
                    
                    <li class="not_btn">
                        <dl>
                            <dt><strong>몸 </strong></dt>
                            <dd class="skil_info_box single">
                                {{stoFoot.detail[pick].bodyDegree}}
                            </dd>
                        </dl>
                    </li>
                    
                    <li v-if="stoFoot.detail[pick].flip !== 'none'"  class="not_btn">
                        <dl>
                            <dt><strong>플립</strong></dt>
                            <dd class="skil_info_box single">
                                {{stoFoot.detail[pick].flip == 'heel' ? "힐" : '킥' }}
                            </dd>
                        </dl>

                        <div class="tip" >
                            <button type="button" @click="tip03 = !tip03">
                                <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                                팁{{tip03 ? '닫기':'보기'}}
                            </button>
                            <p v-if="tip03">
                                보드가 몸안쪽으로 회전하면 '킥', 몸밖으로 회전하는경우 '힐' 이라고합니다
                                <span style="color:var(--c-theme-red)">추가적으로 킥발로 플립을 주는 '프레셔'플립이 존재합니다.</span>
                            </p>
                        </div>
                        
                    </li>

                </ul>
            </article>

            <article class="feed">
                <h3>
                    <strong>다른 보더들의 영상</strong>
                    <span>
                        {{
                            (stoFoot.usersProgressTotal / stoProfile.allUserCnt * 100).toFixed(2) + '%' 
                        }}
                        ({{stoFoot.usersProgressTotal}}명)의 보더가 이 기술을 성공했어요!
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
                    <li v-for="(item,id) in stoFoot.usersProgressInfo" :key="id">
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

                    <li v-if="!stoFoot.usersProgressInfo || stoFoot.usersProgressInfo.length < 1">
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
                        stoFoot.myProgressInfo[0] ? 
                        stoFoot.myProgressInfo[0].status == 'APPROVED' ? '등록 완료' :
                        stoFoot.myProgressInfo[0].status == 'WAIT' ? '승인 대기중' 
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