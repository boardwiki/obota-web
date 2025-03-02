<script setup lang="ts" >
    import Head from '@/components/skill/Header.vue';
    import List from '@/components/skill/List.vue';
    import Cate from '@/components/skill/Cate.vue';
    import Search from '@/components/skill/DancingSearch.vue';
    
    import { onMounted,ref } from 'vue';
    import { useDancingStore } from '@/stores/dancing';
    import { ObjectDancingInfo } from '@/types/dancing';
    import { ObjectSkillInfo } from '@/types/skill';
   const stoDancing = useDancingStore();
    const useFavorite = ref<boolean>(false);

    onMounted(async() => {
        await stoDancing.getSaveCategory();
        /*
        stoDancing.filter.aliasName = null;
        stoDancing.filter.keyword = null;
        stoDancing.filter.bodyDegree = null;
        */
    });

    function filterDancing(dancing: ObjectDancingInfo[], filterOptions: any): any[] {
        const filteredOptions: any = {};

        for (const key in filterOptions) {
            if (Object.prototype.hasOwnProperty.call(filterOptions, key) && filterOptions[key] !== null) {
                filteredOptions[key] = filterOptions[key];
            }
        }

        // 필터링된 옵션을 기반으로 트릭을 필터링합니다.
        const filteredTricks = dancing.filter(cate => {

            if (filteredOptions.keyword && 
                !cate.originalEngName.toLowerCase().includes(filteredOptions.keyword.toLowerCase()) &&
                !cate.originalKorName.toLowerCase().includes(filteredOptions.keyword.toLowerCase())) {
                return false;
            }
            if (filteredOptions.aliasName && cate.aliasName !== filteredOptions.aliasName) {
                return false;
            }
            if (filteredOptions.difficulty && cate.difficulty !== filteredOptions.difficulty) {
                return false;
            }
            if (filteredOptions.bodyDegree !== undefined && cate.bodyDegree !== filteredOptions.bodyDegree) {
                return false;
            }

            if (useFavorite.value && stoDancing.favorites) {
                return stoDancing.favorites.includes(cate.originalEngName);
            }

            return true;
        });

        const startIndex = (filterOptions.page - 1) * filterOptions.pageSize;
        const endIndex = startIndex + filterOptions.pageSize;
        return filteredTricks.slice(startIndex, endIndex).map(cate =>new ObjectSkillInfo({
            id:cate.id,
            originalEngName:cate.originalEngName,
            originalKorName:cate.originalKorName,
            aliasName:cate.aliasName,
            difficulty:cate.difficulty,
            count : cate.trickCount
        }))
    }

    const changeCategory = (id:null|string) =>{
        stoDancing.filter.aliasName = id;   
    }

    const handleFavorite = (id:boolean)=>{
        useFavorite.value = id;
    }


</script>

<template>
    <main class="foot_list">
        <Head></Head>

        <Search type="dancing"></Search>
        
        <Cate 
            :pick="stoDancing.filter.aliasName ? stoDancing.filter.aliasName : null"
            :arr="stoDancing.categoryKeyword"
            :useFavorite="useFavorite"
            @updateFilterAliasName="changeCategory"
            @handleFavorite='handleFavorite'
        ></Cate>

        <List 
            :useFavorite="true"
            :total="filterDancing(stoDancing.list,stoDancing.filter).length" 
            :array="filterDancing(stoDancing.list,stoDancing.filter)" 
            :favorites="stoDancing.favorites ? stoDancing.favorites : []"
            @leftClick="()=>stoDancing.prev()"
            @rightClick="()=>stoDancing.next()"
            link="dancinginfo"></List>

    </main>
</template>

<style lang="scss" scoped>
    .foot_list{
        overflow-x: hidden;
    }
</style>