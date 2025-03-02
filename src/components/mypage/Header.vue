<script setup lang="ts">
import Title    from '@/components/common/Title.vue'
import Cate     from '@/components/common/Cate.vue';
import Card     from '@/components/profile/Card.vue';
import {ObjectUserProfile} from '@/types/user'
import { useProfileStore } from '@/stores/profile';

const stoProfile = useProfileStore();
const props = defineProps<{
    info ?: ObjectUserProfile | null
}>()


onMounted(async()=>{
    if(props.info){
        const id = props.info.id ? props.info.id : -1;
        await stoProfile.getFollowing(id)
        await stoProfile.getFollower(id)
    }
})

import { ObjectNav } from '@/types/nav';
import { onMounted } from 'vue';
const cate:ObjectNav[] = [
  new ObjectNav('정보', '', '/mypage/skill'),
  new ObjectNav('설정', '', '/mypage/setting'),
];


</script>


<template>
    <main>
        <header class="header">
            <h2 class="sound_only">마이페이지</h2>
            <Title title="obota" :align="'left'" ></Title>
            <!--
            <router-link to="/calendar" class="btn_calendar icon-normal">
                <span class="sound_only">일정확인</span>
                <font-awesome-icon :icon="['far', 'calendar']"  class="awesome-icons" />
            </router-link>
            -->
        </header>

        <Card :my="true" :info="info"></Card>



        <div class="cate_wrap">
            <Cate :array="cate"></Cate>
        </div>

    </main>
</template>

<style lang="scss" scoped>
.btns{
    display: flex;
    clear: both;
     
}


.btn_calendar{
    position: absolute;
    right:20px;
    top:20px;
}

.cate_wrap{
    padding:0 20px;
    border-bottom: 1px solid var(--c-lnk-light);
}
</style>