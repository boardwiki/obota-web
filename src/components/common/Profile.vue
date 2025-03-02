<script setup lang="ts">
    import SettingBtns from '@/components/common/SettingBtns.vue';
    import { useAuthStore } from '@/stores/auth';
    import { ObjectFeed } from '@/types/feed';
    import { onMounted, ref } from 'vue';
    import { ObjectUserProfile } from '@/types/user';
    const stoAuth = useAuthStore();
    const props = defineProps<{
        content_user_id : number,
        item : ObjectFeed
        userInfo : ObjectUserProfile|undefined
    }>();

    const no_img = new URL('@/assets/no_img.png', import.meta.url).href;

    onMounted(async()=>{
    })


</script>

<template>
    <div class="user_info">

        <router-link :to="`/profile/user/${userInfo?.id}`" class="profile_lnk" v-if="stoAuth.info.id !== userInfo?.id">
            <img :src="no_img" alt="">
            <span class="name">{{userInfo?.nickName}}
                <span class="stance">{{userInfo?.stance =='Goofy' ? '구피' : '레귤러'}}</span> 
            </span>
        </router-link>

        <span class="profile_lnk" v-else>
            <img :src="no_img" alt="">
            <span class="name">{{userInfo?.nickName}}
                <span class="stance">{{userInfo?.stance =='Goofy' ? '구피' : '레귤러'}}</span></span>
            </span>
        <div class="btns">
            <router-link v-if="stoAuth.info.id !== userInfo?.id" :to="`/profile/user/${userInfo?.id}`" class="profile_btn">
                프로필
            </router-link>

            <SettingBtns v-if="false" :id="item.id" type="feed"></SettingBtns>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.user_info{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width:100%;

    .profile_lnk{

        display: flex;
        align-items: center;
        img{  
            height: 50px;
            width:50px;
            border-radius: 50%;;
            background: var(--c-lnk-light);
        }

        .name{
            padding-left:10px;
            font-size:var(--f-theme-small)
        }

        .stance{
            display: block;
            margin-top:7px;
            font-size:var(--f-theme-tiny);
            color:var(--c-lnk-basic);
        }
    }

    .btns{
        float: right;
        position: relative;
        display: flex;
        align-items: center;

        .follow_button{
            color:var(--c-theme-blue);
            margin-right:10px;
            font-size:var(--f-theme-tiny);
        }

        .profile_btn{
            color:var(--c-lnk-dark);
            font-size:var(--f-theme-tiny);
            border:1px solid var(--c-lnk-light);
            padding: 5px 6px;
            border-radius: 20px;
            text-align: center;
            margin-right:10px;
        }
    }
} 
</style>