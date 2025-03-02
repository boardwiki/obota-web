<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import {ObjectUserProfile} from '@/types/user'
import { useProfileStore } from '@/stores/profile';
const props = defineProps<{
    my   ?: boolean,
    info ?: ObjectUserProfile | null
    Following ? : boolean
}>()

const profileImg = ref<string>('');
const no_img = new URL('@/assets/no_img.png', import.meta.url).href;
const pin_img = new URL('@/assets/pin.png', import.meta.url).href;
const checkFollowing = ref<boolean>(false);
const checkMyCnt = ref<number>(0);

const stoProfile = useProfileStore();

const handleFollow = () =>{
    let id = 0;    
    if(props.info)
        id = props.info.id ? props.info.id : 0;
    
    if(checkFollowing.value){
        stoProfile.unFollow(id)
        checkFollowing.value = false;
        checkMyCnt.value --;
    }else{
        stoProfile.setFollow(id)
        checkFollowing.value = true;
        checkMyCnt.value ++;
    }
}

watch(() => props.Following, (newValue, oldValue) => {
    checkFollowing.value = newValue !== undefined ? newValue : false;
});

</script>

<template>
    <div class="my_card">
        <div class="info">
            <div class="img">
                <img :src="profileImg !== '' ? profileImg : no_img" alt="">
            </div>
            <div class="txt">

                <span class="name" v-if="info">{{info.nickName}}</span>
 
                <div class="level">
                    <img :src="pin_img" alt="" height="20x"> 
                    롱켓 체험단
                </div>

                <div class="follow">
                    <span><router-link :to="`/profile/follower/${info ? info.id : 0}`">팔로워 {{stoProfile.followerTotal + checkMyCnt}}</router-link></span>
                    <span><router-link :to="`/profile/following/${info ? info.id : 0}`">팔로잉 {{stoProfile.followingTotal}}</router-link></span>
                </div>
            </div>
        </div>

        <div class="btns" v-if="my && false">
            <button type="button">
                <font-awesome-icon :icon="['fas', 'camera']" />
                &nbsp;
                프로필 사진 변경
            </button>
        </div>

        <ul class="btns" v-if="!my">
            <li><span>회원등급</span>
            </li>

            <li>
                <button type="button" @click="handleFollow" :class="checkFollowing? 'on' : 'off'">
                    <span>{{checkFollowing ? '팔로잉' : '팔로우'}}</span>
                </button>
            </li>
        </ul>
    </div>
</template>


<style lang="scss" scoped>
.my_card{
    width:calc(100% - 50px);
    margin: 30px auto 40px; 
    padding:20px;
    padding-top:40px;
    border-radius: 20px;
    box-shadow: 1px 1px 10px var(--c-lnk-dark);

    .info{
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        padding-bottom:20px;
    }


    .img{
        width  : 100px;
        height : 100px;
        position: relative;
        border:1px solid  var(--c-lnk-light);
        border-radius: 50%;
        overflow: hidden;
        img{
            width:100%;
            height: auto;
        }
    }

    .txt{
        width:calc(100% - 120px);
        .name{
            font-size:var(--f-theme-regular);
            color:var(--c-lnk-black);
            font-weight: 500;
            display: block;
            margin-bottom:15px;
        }

        .follow span{
            font-size:var(--f-theme-small);
            color:var(--c-lnk-basic);
            display:inline-block;
            margin-right:5px;
        }

        .follow span:first-child{
            padding-right:5px;
            border-right:1px solid var(--c-lnk-dark);
        }
        .level{
            font-size:var(--f-theme-small);
            color:var(--c-lnk-basic);
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }

    }
    

    .btns{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        
        .off{
            border-color: var(--c-theme-blue);
        }
        
        .off span{
            color:var(--c-theme-blue);
        }
        
        li{
            width: 47%;
            border-radius: 20px;;
        }

        li > * {
            width:100%;
            padding: 8px 15px;
            display: flex;
            border-radius: 30px;
            border: 1px solid var(--c-lnk-light);
            align-items: center;
            justify-content: flex-start;
        }

        span {
            font-size:var(--f-theme-small);
            color:var(--c-lnk-basic);
            margin-left:5px;
        }

        i {
            color: var(--c-lnk-dark);
            font-size:19px;
        }
    }

}
</style>