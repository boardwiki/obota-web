<script setup lang="ts">
    import Title from "@/components/common/Title.vue";
    import Cate from "@/components/common/Cate.vue";
    import router from '@/router';

    import { ObjectNav } from '@/types/nav';
    import { ref,onMounted } from 'vue'; 
    import { useAuthStore } from "@/stores/auth";
    const stoAuth = useAuthStore();
    onMounted(()=>{
        setTimeout(() => {
            if(stoAuth.info.role == 'ADMIN'){
                cate.value.push(
                    new ObjectNav('챌린지',    '', '/community/challenge')
                )
            }
        }, 100);
    })

    const cate = ref<ObjectNav[]>([
        new ObjectNav('오늘의 기술',    '', '/community/feed')
    ]);
 
    /*
        <router-link :to="'/calendar/month'" class="right_btn" v-if="router.currentRoute.value.name == 'challenge'">
            <font-awesome-icon :icon="['far', 'calendar']" />
        </router-link>
    */
</script>

<template>
    <header class="cmt_hd_wrap">
        <Title title="obota" :align="'center'"></Title> 

        <div class="cate_wrap">
            <Cate :array="cate"></Cate>
        </div>



    </header>

 
</template>

<style scoped lang="scss">
    .cmt_hd_wrap{
        .btn_search{
            position: absolute;
            right:20px;
            top:20px;
        }

        .cate_wrap{
            border-bottom: 1px solid var(--c-lnk-light);
        }

            
        .right_btn{
            display: flex;
            align-items: center;
            position:absolute;
            right:20px;
            top:0px;
            height:64px;
            font-size:var(--f-theme-large);
        }
        
    }
</style>