<script setup lang="ts" >
    import Head from '@/components/skill/Header.vue';
    import List from '@/components/skill/List.vue';
    import { onMounted } from 'vue';
    import { useBasicStore } from '@/stores/basic';
    import { ObjectSkillInfo } from '@/types/skill';
    import { ObejctBasicInfo } from '@/types/basic';

    const stoBasic = useBasicStore();

    onMounted(async() => {
        await stoBasic.getSaveCategory();
    });

    
    function filterSkills(skills: ObejctBasicInfo[]): ObjectSkillInfo[] {
        return skills.map(skill => new ObjectSkillInfo({
            id: skill.id,
            originalEngName: skill.engName,
            originalKorName: skill.korName,
            aliasName: skill.aliasName,
            difficulty: 'basic'
        }));
    }
    /*

    const changeCategory = (id:null|string) =>{
        stoDancing.filter.aliasName = id;   
    }

    const handleFavorite = (id:boolean)=>{
        useFavorite.value = id;
    }
    */

/*

        <Search type="foot"></Search>
        <Cate 
            :pick="stoDancing.filter.aliasName ? stoDancing.filter.aliasName : null"
            :arr="['Step','Pirouette','V-spin','Mango','PeterPan']"
            :useFavorite="useFavorite"
            @updateFilterAliasName="changeCategory"
            @handleFavorite='handleFavorite'
        ></Cate>
   
*/

</script>

<template>
    <main class="foot_list">
        <Head></Head>
        
        <List 
        :useFavorite="false"
        :total="stoBasic.list.length" 
        :array="filterSkills(stoBasic.list)" 
        :favorites="[]"
        @leftClick="()=>{}"
        @rightClick="()=>{}"
        link="basicinfo"></List>
        
    </main>
</template>

<style lang="scss" scoped>
    .foot_list{
        overflow-x: hidden;
    }
</style>