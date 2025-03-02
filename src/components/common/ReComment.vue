<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
const stoAuth = useAuthStore();

const props = defineProps<{
    comment: any,
    userInfo:any,
}>();
const no_img = new URL('@/assets/no_img.png', import.meta.url).href;

</script>

<template>
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
            <p>{{comment.content}}</p>
        </div>
    </div>
</template>


   

<style lang="scss" scoped>

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

        > a img{
            width:100%;
            height:auto
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