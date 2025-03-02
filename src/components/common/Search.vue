<script lang="ts" setup>
import { ref } from 'vue';

const showSearch = ref<boolean>(false);
const keyward    = ref<string>(''); 

function PostSearch(){
    showSearch.value = true
}
</script>

<template>
    <div class="search">
        <button @click="PostSearch">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="awesome-icons icon-normal" />
        </button>
        
        <input type="text" v-model="keyward" class="keyword">

        <ul class="list">
            <li v-for="id in 5" :key="id">
                <button type="button">검색기록A</button>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.icon1{
    position: absolute;
    top:0;
    bottom:0;
    margin: auto 0 ;
    left:20px;
}

.search{
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    background: var(--c-lnk-base);
    border-radius: 10px;
    padding: 0 10px;
    position: relative;
    flex-direction: row-reverse;
    input{
        border:0;
        height:100%;
        width:calc(100% - 24px);
        background: inherit;
    }

    input:hover,
    input:focus{
      outline: none;
    }

    i{
        font-size:18px;
    }

    .list{
        background: var(--c-lnk-white);
        position: absolute;
        top:  100%;
        border:1px solid var(--c-lnk-black);
        left:0;
        border-radius: 5px;
        width:100%;
        display: none;
        li button{
            width:100%;
            text-align: left;
            padding:10px;
        }
    }

    .keyword:hover + .list,
    .keyword:focus + .list{
        display: block;
    }
}

</style> 