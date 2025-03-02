<script lang="ts" setup>
import Profile from "@/components/common/Profile.vue";
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import {onMounted, ref, watch} from 'vue';
import { ObjectFeed } from '@/types/feed';
import { ObjectUserProfile } from '@/types/user';
import { useFeedStore } from '@/stores/feed';
const emits = defineEmits(['openComment']);
const props = defineProps<{
    item : ObjectFeed,
    titleUse ?: boolean,
    userInfo : ObjectUserProfile|undefined
    name  ?: string | undefined,
    url ?: string | undefined
    subName ? :string | undefined
}>();

const likeCheck = ref<boolean>(false);
const likeNum = ref<number>(0);

const video = ref<string>('');
const stoFeed = useFeedStore();

const openComment = () => {
    emits('openComment',props.item.id);
};
const videoPlayer = ref<HTMLVideoElement|null>();


const showVide = async() => {
    const stoAuth = useAuthStore();
    await axios.get(`https://api.longboard.monster/api/v1/files/${props.item.videoId}/url`,{
        headers : {
            Authorization: `Bearer ${stoAuth.accessToken}`
        }
    }).then((res)=>{
        video.value = res.data.data;
    })
}

onMounted(()=>{
    likeCheck.value = props.item.likeYn == 'Y' ? true : false;
    likeNum.value = props.item.likeCount;
})

const togglePlayPause = () => {
    if(videoPlayer.value){
        if (videoPlayer.value.paused) {
            videoPlayer.value.play();
        } else {
            videoPlayer.value.pause();
        }
    }
};

const likeToggole =async() => {

    if(likeCheck.value){
        await stoFeed.unlike(props.item.id,'skill').then((res)=>{
            likeCheck.value = false;
            likeNum.value = res;
        })
    }else{
        stoFeed.like(props.item.id,'skill').then((res)=>{
                likeCheck.value =  true;
                likeNum.value = res
        })
    }
}

// 라우터 이름 변경 감지
watch(() => props.item.id, (newValue, oldValue) => {
    if(newValue !== oldValue)
        video.value = '';
    
});
</script>

<template>
    <div class="feed_item">
  
        <Profile :content_user_id="item.userId"  :item="item" :userInfo="userInfo"/>

        <div class="con">
            <span class="tit" v-if="titleUse">
                <span class="type1 frame_cate_btn02" v-if="item.categoryType=='hand_trick'">핸드트릭</span>
                <span class="type2 frame_cate_btn02" v-if="item.categoryType=='dancing'">댄싱 </span>
                <span class="type3 frame_cate_btn02" v-if="item.categoryType=='foot_trick'">풋트릭</span>
                <router-link :to="'/'+url" v-if="url">
                    {{name}}
                    <span>{{subName}}</span>
                </router-link>
            </span>
            
            <button type="button" class="show_video_btn" @click="showVide" v-if="!video">
                    영상보기
            </button>

            <div class="video">
                <video ref="videoPlayer" autoplay muted :src="video" v-if="video">
                </video>

                <button v-if="video" type="button" class="play_video_btn" @click="togglePlayPause"></button>

            </div>

            <p>
                <router-link :to="`/profile/user/${item.userId}`">{{userInfo?.nickName}}</router-link>
                {{item.description}}
            </p>
        </div>

        <div class="utill">
            <button type="button" @click="likeToggole()" :class="likeCheck  ? 'likeon':''">
                <span>좋아요 {{likeNum ? likeNum : 0}}</span> 
                <font-awesome-icon :icon="[likeCheck ? 'fa' : 'far', 'heart']" class="awesome-icons"  />
            </button>
            <button type="button" @click="openComment" v-if="item.commentYn == 'Y'">
                <span>댓글 {{item.commentCount}}</span> <font-awesome-icon :icon="['far', 'comment-dots']" class="awesome-icons" />
            </button>
        </div> 
    </div>
</template>

<style lang="scss" scoped>
.feed_item{
    width:100%;
    
    .con{
        .tit{
            display: block;
            font-size:var(--f-theme-regular);
            line-height: 26px;
            padding-top: 20px;
        }

        .tit span{
            &.type1{
                background: var(--c-theme-green-lighter);
                color:var(--c-lnk-dark);
                border-color: var(--c-lnk-dark);
            }

            &.type2{
                background: var(--c-theme-shape-lighter);
                color:var(--c-lnk-dark);
                border-color: var(--c-lnk-dark);
            }

            &.type3{
                background: var(--c-theme-blue-lighter);
                color:var(--c-lnk-dark);
                border-color: var(--c-lnk-dark);
            }
        }
        .tit a {
            margin-left:10px;
        }

        .tit a span{
            display: block;
            margin-top:5px;
            font-size:var(--f-theme-small);
            color:var(--c-lnk-basic)
        }

        .show_video_btn{
            border:1px solid var(--c-lnk-light);
            padding:10px 25px;
            border-radius: 30px;
            margin-top:20px;
        }

        .video{
            position: relative;
            border-radius:30px;
            width:100%;
            height: auto;
            text-align: center;

            video{
                margin-top:20px;
                width:100%;
                height: auto;
                background: var(--c-lnk-dark);
            }
            button{
                position: absolute;
                top:0;
                left:0;
                width:100%;
                height: 100%;
            }

        }

        p{
            color:var(--c-lnk-black);
            padding:10px 0 20px;
            font-size: var(--f-theme-tiny);
        }

        p a {
            font-weight: 700;
        }

    }

    .likeon svg{
        color:var(--c-theme-red);
    }

    .utill {
        display: flex;
        span{
            display: inline-block;
            vertical-align: top;
            padding-top:1px;
        }
        
        button{
            margin-right: 8px;
            display: flex;
            align-items: center;

            svg{
                margin-left:5px;
            }
        }

    }
}
</style>