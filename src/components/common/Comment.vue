<script lang="ts" setup>
import { ref,watch} from 'vue';
import { requestApi } from '@/axios';
import { useProfileStore } from '@/stores/profile';
import { useAuthStore } from '@/stores/auth';
import ReComment from './ReComment.vue'
const props = defineProps<{
  list: any,
  userInfo:any,
  nowReCommentId :number, 
  insertComment : boolean,
}>();


const stoAuth = useAuthStore();
const no_img = new URL('@/assets/no_img.png', import.meta.url).href;
const reComment = ref<boolean>(false);
const showReComments = ref<boolean>(false);
const reCommentPage = ref<number>(1);
const reCommentTotalPage = ref<number>(1);
const reComments = ref<any[]>([]);
const emits = defineEmits(['recommentEmits']);
const stoProfile = useProfileStore();

const showReComment = async() =>{
    try{
        const res = await requestApi({
        url: `v1/community/comments/${props.list.commentId}`, // 수정된 부분: API 엔드포인트 변경
            params: {
                page: reCommentPage.value,
                pageSize: 5,
            }
        })
        if(res.data.list.length > 0){
            reCommentTotalPage.value = res.data.totalPage;
            reComments.value = reComments.value.concat(res.data.list);
            showReComments.value = true;
            reCommentPage.value ++;
            await findUser(res.data.list);
        }
      
    }catch(error){
        console.log(error)
    }
}

const findUser = async(list:any[]) =>{
    const userIds = await list.map(comment => comment.userId);
    await stoProfile.fetchProfiles(userIds);
}

const recommentEmits = () => {
    reComment.value = reComment.value ? false : true
    emits('recommentEmits',reComment.value ? props.list.commentId : null);
};

const handdleReComment = () =>{
    if(showReComments.value)
        showReComments.value = false;
    else{
        showReComment();
        showReComments.value = true;
    }
}


watch(() => props.insertComment, async(newValue, oldValue) => {
    if(newValue && props.nowReCommentId == props.list.commentId){
        reComments.value = [];
        reCommentPage.value = 1;
        reComment.value = false;''
        await showReComment().then(()=>{
            const length:number = reCommentTotalPage.value;
            
            for(let i = reCommentPage.value; i <= length; i++){
                showReComment();
            }
        })
    }
});


</script>

<template>
    <div class="comment_item_wrap">
        <div class="comment_item" v-if="userInfo">
            <router-link class='comment_img' :to="`/profile/user/${userInfo.id}`" v-if="userInfo.id !== stoAuth.info.id">
                <img :src="no_img" alt="">
            </router-link>
            <div class="comment_img" v-else>
                <img :src="no_img" alt="">
            </div>
            <div class="comment_con">
                <strong>
                    <router-link :to="`/profile/user/${userInfo.id}`" v-if="userInfo.id !== stoAuth.info.id">
                        <span>{{userInfo.nickName}}</span>
                    </router-link>
                    <span v-else>{{userInfo.nickName}}</span>
                    <span class="stance">({{userInfo?.stance =='Goofy' ? '구피' : '레귤러'}})</span>
                </strong>
                <p>{{list.content}}</p>
                <button type=button @click="recommentEmits">{{!reComment || nowReCommentId !== list.commentId? '답글달기' : '답글달기 취소'}}</button>
                <button type=button @click="handdleReComment" v-if="list.hasChild">{{ showReComments ? '답글닫기': '답글보기'}}</button>
            </div>
        </div>

        <ul class="re_comment" v-if="showReComments">
            <li v-for="comment in reComments" :key="comment.commentId" >
                <ReComment 
                    :comment="comment"
                    :userInfo="stoProfile.list.find((user)=>user.id === comment.userId)"
                />
            </li>
        </ul>
        <button class="reComent_more" @click="showReComment" v-if="!(reCommentPage > reCommentTotalPage) && showReComments"> - 더보기</button>

    </div>
</template>


   

<style lang="scss" scoped>

    .re_comment{
        padding-left: 30px;
    }

    .reComent_more{
        padding-left:45px;;
    }
    .comment_item{
        padding:10px;
        display: flex;
        font-size:var(--f-theme-tiny);
        color:var(--c-lnk-basic);

        .comment_img{
            width: 50px;
            height:50px;
            border-radius: 50%;
            background: var(--c-lnk-light);
             img{
                width:100%;
                height:auto
            }
        }


        .stance{
            font-size:var(--f-theme-tiny);
            color:var(--c-lnk-basic);
        }

        strong{
            font-size:var(--f-theme-small);
            display:block;
            color:var(--c-lnk-black);
            padding-bottom:5px
        }

        .comment_con{
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
</style>