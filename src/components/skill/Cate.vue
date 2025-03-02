<script setup lang="ts">
import { useFootTrcikStore } from '@/stores/foot';

const props = defineProps<{
    arr         : string[],
    pick        : string|null,
    useFavorite : boolean
}>()
const emits = defineEmits(['updateFilterAliasName','handleFavorite']);

const set = (id:string) => {
    if(props.pick == id)
        emits('updateFilterAliasName', null);
    else
        emits('updateFilterAliasName', id);
}


</script>


<template>
    <div class="skill_cate">
        <ul>
            <li>
                <button 
                    type="button" 
                    :class="useFavorite?'on':''"
                    @click="emits('handleFavorite',!useFavorite)"
                >즐겨찾기</button></li>
            <li v-for="id in arr" :key="id" :class="pick == id ? 'on' : ''"><button type="button" @click="set(id)">{{id}}</button></li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .skill_cate{

        overflow: auto;
        padding:10px;
        ul {
            display:flex;
            white-space: nowrap; 
        }

        li {
            margin-right:10px;
        }

        button.on{
            color:var(--c-theme-blue);
            border-color:var(--c-theme-blue);
            font-weight: 700;
        }

        button{
            padding: 10px;
            border:1px solid var(--c-lnk-light);
            border-radius: 6px;
            color:var(--c-lnk-basic);
        }
    }
</style>