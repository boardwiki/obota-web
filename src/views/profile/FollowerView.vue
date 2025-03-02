<script setup lang="ts">
    import Title from "@/components/common/Title.vue";
    import Cate from "@/components/common/Cate.vue";
    import {useProfileStore} from '@/stores/profile';
    import { onMounted,ref,onBeforeUnmount } from "vue";
    import { ObjectNav } from '@/types/nav';
    import Empty from '@/components/common/Empty.vue'
    import { useAuthStore } from "@/stores/auth";
    const stoProfile = useProfileStore();
    const stoAuth = useAuthStore();
    const follower = ref<any>([]);
    const user_search = ref<string>('');
    const props = defineProps<{
        id:number|string
    }>();

    const cate = ref<ObjectNav[]>([
        new ObjectNav('팔로워',    '', '/profile/follower/'+props.id),
        new ObjectNav('팔로잉',    '', '/profile/following/'+props.id),
    ]);


    function toggleFollow(id:number,amIFollowing:boolean){
        const userId = follower.value[id].id;
        follower.value[id].amIFollowing = !amIFollowing
        if(amIFollowing){
            stoProfile.unFollow(userId)
        }else{
            stoProfile.setFollow(userId)
        }
    }

    const find = async() =>{
        await stoProfile.getFollower(Number(props.id),user_search.value);
        await fetchFollowerProfiles();
    }

    onMounted(async()=>{
        if(props.id){
            const id = Number(props.id);
            await stoProfile.keywordReset();
            await stoProfile.getProfileDetail(id);
            await stoProfile.getFollowing(id);
            await stoProfile.getFollower(id,user_search.value);
            await fetchFollowerProfiles();
            await window.addEventListener('scroll', handleScroll);
        }else{
            console.log('error')
        }

        cate.value = [
            new ObjectNav('팔로워 '+stoProfile.followerTotal, '', '/profile/follower/'+props.id),
            new ObjectNav('팔로잉 '+stoProfile.followingTotal, '', '/profile/following/'+props.id),
        ]
    })

    async function fetchFollowerProfiles() {
        // stoProfile.following 배열의 각 사용자에 대해 프로필 정보를 가져와서 following 배열에 추가
        follower.value = [];
        await Promise.all(stoProfile.follower.map(async (user: any) => {
            const userInfo = await stoProfile.getProfile(user.userId);
            userInfo.amIFollowing = user.amIFollowing;
            follower.value.push(userInfo);
        }));
    }

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll);
    })

    const handleScroll = () => {
        window.removeEventListener('scroll', handleScroll);
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadNextPage().then(() => {
                window.addEventListener('scroll', handleScroll);
            });
        } else {
            window.addEventListener('scroll', handleScroll);
        }
    };

    const loadNextPage = async () => {
        await stoProfile.getFollower(Number(props.id),user_search.value);
        await fetchFollowerProfiles();
    }


</script>

<template>
    <main class="follow_view">
        <header>
            <Title :title="stoProfile.detail?.nickName" :align="'center'" :useCancel="true"></Title> 
        </header>
        <div class="cate_wrap">
            <Cate :array="cate"></Cate>
        </div>

        <div class="follow_user_list">
            <div class="follow_user_search">
                <input type="text" v-model="user_search">
                <button type="button" @click="find">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="awesome-icons" />
                    <span class="sound_only">검색</span>
                </button>
            </div>


            <ul>
                <li v-for="(user,id) in follower" :key="id">
                    <router-link :to="`/profile/user/${user.id}`">
                        <span class="name">
                            {{user.nickName}}
                        </span>
                    </router-link>

                    <button type="button" 
                        v-if="user.id !== stoAuth.info.id"
                        :class="user.amIFollowing ? 'off' : ''"
                        @click="toggleFollow(id,user.amIFollowing)">
                        {{user.amIFollowing ? '팔로잉' : '팔로우'}}
                    </button>
                </li>
            </ul>

            <Empty v-if="!stoProfile.follower" msg="유저가 없습니다."></Empty>
        </div>

    </main>
</template>

<style scoped lang="scss">
.follow_view{
    padding-top:64px;
    header{
        position: fixed;
        position: absolute;
        top:0;
        left:0;
        width:100%;
        margin:0 auto;
        right:0;
        border-bottom: 1px solid var(--c-lnk-light);

        .btn_back{
            position: absolute;
            left:20px;
            font-size:var(--f-theme-large);
            top:calc(40px / 2);
        }
    }    

    .cate_wrap{
        border-bottom: 1px solid var(--c-lnk-light);
    }

    .follow_user_list{
        padding:20px;

        ul > li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:15px;
        }

        li button{
            background: var(--c-lnk-black);
            padding: 10px 20px;
            color:var(--c-lnk-white);
            border-radius: 30px;
        }

        li .name{
            font-size:var(--f-theme-regular)
        }

        
        button.off{
            background:var(--c-lnk-light);
            color:var(--c-lnk-basic)
        }
    }


    .follow_user_search{
        margin-bottom: 10px;
        color:var(--c-lnk-basic);
        border:1px solid var(--c-lnk-light);
        padding: 10px 15px;
        font-size: var(--f-theme-large);
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        input {
            border:0;
            height: 30px;
            width:calc(100% - 30px);
            text-align: left;
        }
        button{
            font-size:20px;
            width: 30px;
        }
    }

}
</style>