<script setup lang="ts" >
    import Head from '@/components/skill/Header.vue';
    import List from '@/components/skill/List.vue';
    import Cate from '@/components/skill/Cate.vue';
    import Search from '@/components/skill/FootSearch.vue';
    
    import { onMounted,ref } from 'vue';
    import { useFootTrcikStore } from '@/stores/foot';
    import { ObjectFootInfo } from '@/types/foot';
    import { ObjectSkillInfo } from '@/types/skill';
    const stoFoot = useFootTrcikStore();
    const useFavorite = ref<boolean>(false);

    onMounted(async() => {
        await stoFoot.getSaveCategory();
        /*
        stoFoot.filter.difficulty = null;
        stoFoot.filter.footPlant = null;
        stoFoot.filter.flip = null;
        stoFoot.filter.keyword = null;
        stoFoot.filter.boardDegree = [];
        stoFoot.filter.bodyDegree = [];
        */
    });

    function filterTricks(tricks: ObjectFootInfo[], filterOptions: any): any[] {
        const filteredOptions: any = {};
        for (const key in filterOptions) {
            if (Object.prototype.hasOwnProperty.call(filterOptions, key) && filterOptions[key] !== null) {
                filteredOptions[key] = filterOptions[key];
            }
        }

        // 필터링된 옵션을 기반으로 트릭을 필터링합니다.
        const filteredTricks = tricks.filter(trick => {
            if (filteredOptions.keyword && 
                !trick.originalEngName.toLowerCase().includes(filteredOptions.keyword.toLowerCase()) &&
                !trick.originalKorName.toLowerCase().includes(filteredOptions.keyword.toLowerCase())) {
                return false;
            }
            if (filteredOptions.aliasName && trick.aliasName !== filteredOptions.aliasName) {
                return false;
            }
            if (filteredOptions.footPlant !== undefined && trick.footPlant !== filteredOptions.footPlant) {
                return false;
            }
            if (filteredOptions.flip && trick.flip !== filteredOptions.flip) {
                return false;
            }
            if (filteredOptions.difficulty && trick.difficulty !== filteredOptions.difficulty) {
                return false;
            }
            /*
            if (filteredOptions.bodyDegree !== undefined && trick.bodyDegree !== filteredOptions.bodyDegree) {
                return false;
            }
            if (filteredOptions.boardDegree !== undefined && trick.boardDegree !== filteredOptions.boardDegree) {
                return false;
            }
            */

            if (useFavorite.value && stoFoot.favorites) {
                return stoFoot.favorites.includes(trick.originalEngName);
            }


            return true;
        });

        const startIndex = (filterOptions.page - 1) * filterOptions.pageSize;
        const endIndex = startIndex + filterOptions.pageSize;
        return filteredTricks.slice(startIndex, endIndex).map(trick =>new ObjectSkillInfo({
            id:trick.id,
            originalEngName:trick.originalEngName,
            originalKorName:trick.originalKorName,
            aliasName:trick.aliasName,
            difficulty:trick.difficulty,
            count : trick.trickCount
        }))
    }

    const changeCategory = (id:null|string) =>{
        stoFoot.filter.aliasName = id;   
    }

    const handleFavorite = (id:boolean)=>{
        useFavorite.value = id;
    }


</script>

<template>
    <main class="foot_list">
        <Head></Head>

        <Search type="foot"></Search>
        <Cate 
            :pick="stoFoot.filter.aliasName ? stoFoot.filter.aliasName : null"
            :arr="stoFoot.categoryKeyword"
            :useFavorite="useFavorite"
            @updateFilterAliasName="changeCategory"
            @handleFavorite='handleFavorite'
        ></Cate>

        <List 
            :useFavorite="true"
            :total="filterTricks(stoFoot.list,stoFoot.filter).length" 
            :array="filterTricks(stoFoot.list,stoFoot.filter)" 
            :favorites="stoFoot.favorites ? stoFoot.favorites : []"
            @leftClick="()=>stoFoot.prev()"
            @rightClick="()=>stoFoot.next()"
            link="footinfo"></List>
    </main>
</template>

<style lang="scss" scoped>
    .foot_list{
        overflow-x: hidden;
    }
</style>