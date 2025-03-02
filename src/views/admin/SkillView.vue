<script setup lang="ts">
import Title from '@/components/common/Title.vue';
import {ref,onMounted} from 'vue'
import { useAuthStore } from '@/stores/auth';
import { requestApi } from '@/axios';
import { useProfileStore } from '@/stores/profile';
import { useShowsStore } from '@/stores/show'; 

const shows = useShowsStore();
const stoAuth = useAuthStore();
const stoProfile = useProfileStore();
const page = ref<number>(1);
const pageTotal = ref<number>(-1);
const list = ref<any[]>([]);
const profile = ref<any[]>([]);
const skillInfo = ref<any[]>([]);
const videoUrls = ref<string[]>([]);
const activeVideo = ref<number | null>(null);

onMounted(async()=>{
    await stoAuth.authCheck().then(()=>{
        if(stoAuth.info.role !== 'ADMIN'){
            alert('님관리자 아님')
        }
    })

    await getProgress();

})


const getProgress = async() =>{
    await shows.on()
    if((page.value == 1 && pageTotal.value == -1) || page.value <= pageTotal.value){
        try{
            const res = await requestApi({
                url: 'v1/admin/userProgress/list',
                params: {
                    page : 1,
                    pageSize : 10,
                }
            })
            if(res.data.status == "SUCCESS"){
                list.value = list.value.concat(res.data.list);
                pageTotal.value = res.data.totalPage;
                page.value ++;
                await fetchFollowerProfiles();
                await stoProfile.fetchSkills(list.value).then((res)=>{
                    res.map((itemInfo)=>{
                        skillInfo.value.push(itemInfo);
                    })
                });
            }
        } catch (error){
            console.error(error)
        }
    }
    await shows.off()
}

async function fetchFollowerProfiles() {
    // stoProfile.following 배열의 각 사용자에 대해 프로필 정보를 가져와서 following 배열에 추가
    await Promise.all(list.value.map(async (item: any) => {
        const userInfo = await stoProfile.getProfile(item.userId);
        profile.value.push(userInfo)
    }));
}

async function getVideoUrl(id: number) {
    const res = await requestApi({
        url: `/v1/files/${id}/url`,
    });
    return res.data.data;
}

async function showVideo(id: number, videoId: number) {
    activeVideo.value = id;
    // 이미 해당 비디오의 URL을 가져왔는지 확인
    if (!videoUrls.value[id]) {
        const videoUrl = await getVideoUrl(videoId);
        videoUrls.value[id] = videoUrl;
    }
}

async function pass(status:boolean,id:number,index:number){

    try{
        const res = await requestApi({
            url: `v1/admin/userProgress/${id}`,
            method: 'PATCH',
            params: {
                approved : status,
            }
        })
        console.log(res);
    }catch(error){
        console.log('상태변경에러',error)
    }

    if(status)
        list.value[index].status = 'APPROVED'
    else
        list.value[index].status = 'REJECTED'
    activeVideo.value = null

}

</script>
<template>
    <main class="admin_skill">
        <Title :title="'스킬 인증관리'" :align="'center'" :useCancel="true"></Title>
        <ul class="list" v-if="pageTotal !== -1">
            <li v-for="(item,id) in list" :key="item.id">
                <div class="item">
                    <div class="result" v-if="item.status !== 'WAIT'">
                        {{
                            item.status == 'REJECTED' ? '반려' : 
                            item.status == 'APPROVED' ? '승인' : ''
                        }}
                    </div>
                    <div class="skill_title">
                        <span class="type1 frame_cate_btn02" v-if="item.categoryType=='hand_trick'">핸드트릭</span>
                        <span class="type2 frame_cate_btn02" v-if="item.categoryType=='dancing'">댄싱 </span>
                        <span class="type3 frame_cate_btn02" v-if="item.categoryType=='foot_trick'">풋트릭</span>
                        <strong v-if="skillInfo[id]">
                            {{skillInfo[id].name}}
                            <span>
                                {{skillInfo[id].subName}}
                            </span>
                        </strong>
                    </div>
                    <div class="info">
                        <div class="user" v-if="profile[id]">
                            <font-awesome-icon :icon="['fas', 'circle-user']" />
                            {{profile[id].stance == 'Goofy' ? '구피' : '레귤러'}}
                            {{profile[id].nickName}}
                        </div>
                    </div>
                </div>

                <button type="button" class="pass_btn" @click="(()=>{item.status == 'WAIT' ? showVideo(id, item.videoId) : ''})">
                    검토
                </button>
                <div class="videoBox" v-if="activeVideo === id">
                    <div>
                        <video :src="videoUrls[id]" autoplay loop ></video>
                        <div class='btns'>
                            <button type="button" @click="pass(true,item.id,id)">승인</button>
                            <button type="button" @click="pass(false,item.id,id)">반려</button>
                            <button type='button' @click="activeVideo = null" class="btn_close">닫기</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <button v-if="page <= pageTotal" @click="getProgress()" class="btn_more">더보기</button>
    </main>
</template>

<style lang="scss">

    .admin_skill{

        .videoBox{
            position: fixed;
            max-width: 480px;
            width:100%;
            margin: 0 auto;
            height: 100%;
            top:0;
            left: 0;
            right:0;
            background: rgba(0,0,0,0.8);
            z-index: 999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            > div{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                max-width: 100%;
                position: relative;
                z-index:70;
            }

            video{
                height: 75%;
                width:auto
            }
        }

        .btn_close{
        }

        .btns{
            background: var(--c-lnk-white);
            > button{
                width:50%;
                padding:15px 0;
            }
        }


        .list{
            border-top: 1px solid var(--c-lnk-light);
        }
        .list li{
            padding-right:0;
            border-bottom: 1px solid var(--c-lnk-light);
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: var(--c-lnk-base);
            position: relative;

            .item{
                padding: 10px 0 10px 10px;
                background: var(--c-lnk-white);
                width:calc(100% - 50px);
            }
            
            .result{
                top:0;
                left:0;
                color:var(--c-lnk-white);
                text-align: center;
                align-items: center;
                justify-content: center;
                display: flex;
                position: absolute;
                width:100%;
                height:100%;
                background: rgba(0,0,0,0.8);
            }


            .skill_title {
                font-size:var(--f-theme-small);
                display: block;
                display: flex;
                align-items: center;
                
                strong span{
                    font-size: var(--f-theme-tiny);
                    color:var(--c-lnk-basic);
                    font-weight: 400;
                    display: block;
                    margin-top: 7px;
                }

                > span{
                    font-size:var(--f-theme-tiny);
                    color:var(--c-lnk-basic);
                    font-weight:500;
                    padding: 5px 12px;
                    margin-right: 5px;
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

            }

            .info{
                margin-top: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .user{
                    color:var(--c-lnk-basic);
                    font-size: var(--f-theme-tiny);
                }
            }
        }

        .pass_btn{
            padding:0 10px;
            letter-spacing: 2px;
            line-height: 1.4;
            font-size: var(--f-theme-small);
            width:50px;
        }
        
        .btn_more{
            text-align: center;
            width: 100%;
            padding:20px;
            background: var(--c-lnk-base);
            border-bottom: 1px solid var(--c-lnk-light);
        }

    }

</style>