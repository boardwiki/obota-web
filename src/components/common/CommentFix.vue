<script setup lang="ts" >
import { ref, onMounted } from 'vue';
import Comment from './Comment.vue';
import { useFeedStore } from '@/stores/feed';
import Empty from '@/components/common/Empty.vue';
import { useProfileStore } from '@/stores/profile';
const emits = defineEmits(['closeComment']);
const txt = ref<string>('');
const commentInput = ref<HTMLInputElement | null>(null); 
const stoFeed = useFeedStore();
const stoProfile = useProfileStore();
const insertHanddle = ref<boolean>(false);
const closeComment = () => {
    emits('closeComment','1');
};

const props = defineProps<{
  comments: any[]
}>();

const reCommentId = ref<null|number>();

onMounted(async()=>{
    if(props.comments.length > 0){
        const userIds = await props.comments.map(comment => comment.userId);
        await stoProfile.fetchProfiles(userIds)
    }
})

const createComment = async() =>{
    if(!txt.value){
        alert('내용을 입력해주세요!');
        return false;
    }

    await stoFeed.postComment(txt.value,reCommentId.value).then(()=>{
        alert('댓글 등록 완료');
        insertHanddle.value = true;
        setTimeout(()=>{
            insertHanddle.value = false;
            reCommentId.value = null;
            txt.value = '';
        },1000)
    });

    if(props.comments.length > 0){
        const userIds = await props.comments.map(comment => comment.userId);
        await stoProfile.fetchProfiles(userIds).then(()=>{
            
        });
    }
}

const handleRecomment = (commentId: number | null) =>{
    reCommentId.value = commentId;

    if (commentId !== null && commentInput.value !== null) {
        commentInput.value.focus();
    }
}

</script>

<template>
    <div class="comment sub_fixed">
        <button class="close" @click="closeComment()">
            <span class="sound_only">닫기</span>
        </button>
        <div class="sub_con">
            <button class="close" @click="closeComment()">
                <span class="sound_only">닫기</span>
            </button>
            
            <strong class="tit">
                댓글 
            </strong>

            <ul>
                <li v-for="comment in comments" :key="comment.commentId">
                    <Comment 
                        :nowReCommentId = "reCommentId ? reCommentId : -1"
                        @recommentEmits="handleRecomment"
                        :list="comment" 
                        :insertComment="insertHanddle"
                        :userInfo="stoProfile.list.find((user)=>user.id === comment.userId)"
                    />
                </li>

                <li v-if="stoFeed.comments.length < 1">
                    <Empty msg="댓글이 없습니다." style="width:100%;padding: 30px 0 ;" />
                </li>
            </ul>



            <div class="from">
                <div>
                    <input type="text" v-model="txt" placeholder="내용을 입력해주세요." ref="commentInput">
                    <button type="button" @click="createComment()">
                        <font-awesome-icon :icon="['far', 'paper-plane']" class="awesome-icons" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.comment{
    padding-top:100px;
    
    .sub_con > ul{
        padding: 10px 20px 10px;
        height:calc(100% - 150px);
        overflow: auto;
        border-top:1px solid var(--c-lnk-light);
    }

    .sub_con > ul > li {
        padding-top:10px;
        display: flex;
        font-size:var(--f-theme-tiny);
        color:var(--c-lnk-basic);

        img{
            width: 50px;
            height:50px;
            border-radius: 50%;
            background: var(--c-lnk-light);
        }

        strong{
            font-size:var(--f-theme-small);
            display:block;
            color:var(--c-lnk-black);
            padding-bottom:5px
        }

        div{
            padding:10px;
            width:calc(100% - 50px);
        }

        p {
            padding-bottom: 10px;;
        }

        button{
            margin-right: 7px;
        }
    }

   .from{
        padding:15px 20px;
        div{
            border:1px solid var(--c-lnk-light);
            border-radius: 20px;
            overflow: hidden;
        }

        input{
            padding:0 20px;
            height:100%;
            border:0;
            width:calc(100% - 50px)
        }

        button{
            height:50px;
            width:50px;
        }
   }
}

</style>