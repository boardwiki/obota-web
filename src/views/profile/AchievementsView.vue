<script setup lang="ts">
    import Title from "@/components/common/Title.vue";
    import Styled from '@/components/profile/Style.vue';
    import Select from "@/components/frame/Select.vue";

    import { ref } from "vue";

    const sort = ref<string>('');
</script>

<template>
    <main class="avm_list">
        <Title title="업적" :align="'center'" :useCancel="true"></Title>
        
        <div class="top">
            <span>뱃지 n개</span>
            <Select 
                :labels="['최신순','업적달성순']" 
                :values="['1','2']"
                v-model="sort" 
                width="100px"
                height="30px"
            ></Select>
        </div>

        <ul>
            <li v-for="id in 8" :key="id"><Styled></Styled></li>
        </ul>

    </main>
</template>

<style lang="scss" scoped>
.avm_list{
    ul{
        padding:0 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    li{
        width:32%;
        margin-right: 2%;
        margin-bottom: 15px;
    }

    li:nth-child(3n){
        margin-right:0
    }

    .top{
        margin-bottom: 20px;
        padding:0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > span{
            color: var(--c-lnk-basic);
            font-size:var(--f-theme-small);
        }
    }
}
</style> 