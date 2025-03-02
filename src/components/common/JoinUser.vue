<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
const props = defineProps<{
  joinInfo: any,
  userInfo:any,
}>();


const stoAuth = useAuthStore();
const no_img = new URL('@/assets/no_img.png', import.meta.url).href;

function ensureHttpProtocol(url:string) {
    const httpRegex = /^(https?:\/\/)/;
    if (!httpRegex.test(url)) {
        return "https://" + url;
    }
    
    return url;
}
</script>

<template>
    <div class="join_info" v-if="props.joinInfo">
        <div class="join_item" v-if="userInfo">
            <router-link class='join_img' :to="`/profile/user/${userInfo.id}`" v-if="userInfo.id !== stoAuth.info.id">
                <img :src="no_img" alt="">
            </router-link>
            <div class="join_img" v-else>
                <img :src="no_img" alt="">
            </div>
            <div class="join_con">
                <div>
                    <router-link :to="`/profile/user/${userInfo.id}`" v-if="userInfo.id !== stoAuth.info.id">
                        <span>{{userInfo.nickName}}</span>
                    </router-link>
                    <span v-else>{{userInfo.nickName}}</span>
                    <span class="stance">({{userInfo?.stance =='Goofy' ? '구피' : '레귤러'}})</span>
                </div>

                <a target="_blank" :href="ensureHttpProtocol(joinInfo.videoLink)">영상보기</a>
            </div>
        </div>
    </div>
</template>


   

<style lang="scss" scoped>

    .re_comment{
        padding-left: 30px;
    }

    .reComent_more{
        padding-left:45px;;
    }
    .join_item{
        padding:10px;
        display: flex;
        font-size:var(--f-theme-tiny);
        color:var(--c-lnk-basic);

        .join_img{
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

        .join_con{
            padding:10px;
            width:calc(100% - 50px);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .join_con div span:first-child{
            font-size: var(--f-theme-small);
            color:var(--c-lnk-dark)
        }

        .join_con a{
            border:1px solid var(--c-lnk-light);
            padding:5px 10px;
            border-radius: 20px;
        }

        p {
            padding-bottom: 10px;;
        }

        button{
            margin-right: 7px;
        }       
    }
</style>