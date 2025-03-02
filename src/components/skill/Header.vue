<script setup lang="ts">
    import Title from "@/components/common/Title.vue";
    import Cate     from '@/components/common/Cate.vue';
    import { ObjectNav } from '@/types/nav';
    const cate:ObjectNav[] = [
        new ObjectNav('기본기', '', '/skill/basic'),
        new ObjectNav('풋트릭', '', '/skill/foot'),
        new ObjectNav('댄싱', '', '/skill/dancing'),
        //new ObjectNav('핸드트릭', '', '/skill/hand'),
    ];
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
        
    }

    .cate_wrap{
        border-bottom: 1px solid var(--c-lnk-light);
    }
</style>