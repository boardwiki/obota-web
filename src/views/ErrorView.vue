<script setup lang="ts">
    import Empty from '@/components/common/Empty.vue';
</script>

<template>
    <div class="error_view">
        <div>
            <Empty msg="존재하지않는 페이지 입니다!"></Empty>
            <router-link :to="'/'">홈으로 돌아가기</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .error_view{
        position: absolute;
        top:0;
        left:0;
        display: flex;
        height: 100%;
        width:100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        flex-wrap: nowrap;
        padding:20px;

        a{
            margin-top:40px;
            border:1px solid var(--c-lnk-light);
            font-size:var(--f-theme-regular);
            width:100%;
            display: block;
            text-align: center;
            padding:20px;
            border-radius: 50px;
        }
    }
</style>